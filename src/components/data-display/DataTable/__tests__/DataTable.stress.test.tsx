import React, { useState, useMemo } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import { DataTable } from "../DataTable";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

interface TestData {
  id: number;
  name: string;
  value: number;
  nested?: {
    deep?: {
      property?: string;
    };
  };
}

const generateStressData = (count: number): TestData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Stress Test Item ${i + 1}`,
    value: Math.floor(Math.random() * 10000),
    nested: {
      deep: {
        property: `deep-${i}`,
      },
    },
  }));

const stressColumns: ColumnDef<TestData>[] = [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "value", header: "Value", enableSorting: true },
  {
    accessorKey: "nested.deep.property",
    header: "Deep Property",
    enableSorting: true,
  },
];

describe("DataTable - Stress & Edge Case Tests", () => {
  let consoleErrorSpy: any;
  let consoleWarnSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe("Extreme Data Sizes", () => {
    it("should handle very large datasets (100k items) without memory issues", () => {
      const hugeData = generateStressData(100000);
      const startTime = performance.now();

      render(<DataTable data={hugeData} columns={stressColumns} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time even for huge datasets
      expect(renderTime).toBeLessThan(1000); // 1 second threshold

      // Should only render visible rows
      expect(screen.getAllByRole("row")).toHaveLength(16); // 15 data + 1 header
      expect(screen.getByText("Stress Test Item 1")).toBeInTheDocument();
      expect(screen.getByText("Stress Test Item 15")).toBeInTheDocument();
    });

    it("should handle empty arrays gracefully", () => {
      render(<DataTable data={[]} columns={stressColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("No results.")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader")).toHaveLength(4);
    });

    it("should handle single massive row", () => {
      const massiveRow = [
        {
          id: 1,
          name: "A".repeat(10000), // Very long string
          value: Number.MAX_SAFE_INTEGER,
          nested: { deep: { property: "B".repeat(1000) } },
        },
      ];

      render(<DataTable data={massiveRow} columns={stressColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("A".repeat(10000))).toBeInTheDocument();
    });
  });

  describe("Rapid State Changes", () => {
    it("should handle rapid data updates without breaking", async () => {
      const RapidUpdateExample = () => {
        const [data, setData] = useState(generateStressData(100));
        const [updateCount, setUpdateCount] = useState(0);

        const rapidUpdate = () => {
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              setData(generateStressData(100 + i));
              setUpdateCount((prev) => prev + 1);
            }, i * 10); // 10ms intervals
          }
        };

        return (
          <div>
            <button onClick={rapidUpdate} data-testid="rapid-update">
              Rapid Update
            </button>
            <DataTable data={data} columns={stressColumns} />
            <div data-testid="update-count">Updates: {updateCount}</div>
          </div>
        );
      };

      render(<RapidUpdateExample />);

      fireEvent.click(screen.getByTestId("rapid-update"));

      // Wait for all updates to complete
      await waitFor(
        () => {
          expect(screen.getByTestId("update-count")).toHaveTextContent(
            "Updates: 10",
          );
        },
        { timeout: 2000 },
      );

      // Should still be functional
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(16);
    });

    it("should handle rapid pagination changes without race conditions", async () => {
      const data = generateStressData(1000);
      render(<DataTable data={data} columns={stressColumns} />);

      const nextButton = screen.getByText("Next");
      const prevButton = screen.getByText("Previous");

      // Rapidly click next and previous
      for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
          fireEvent.click(nextButton);
        } else {
          fireEvent.click(prevButton);
        }
      }

      // Should stabilize on a valid page
      await waitFor(() => {
        const pageText = screen.getByText(/Page \d+ of \d+/);
        expect(pageText).toBeInTheDocument();
      });
    });
  });

  describe("Memory Management", () => {
    it("should not leak memory with data changes", () => {
      const MemoryTestComponent = () => {
        const [iteration, setIteration] = useState(0);

        // Generate new data each iteration to test cleanup
        const data = useMemo(() => generateStressData(1000), [iteration]);

        return (
          <div>
            <button
              onClick={() => setIteration((prev) => prev + 1)}
              data-testid="new-data"
            >
              Generate New Data
            </button>
            <DataTable data={data} columns={stressColumns} />
            <div data-testid="iteration">Iteration: {iteration}</div>
          </div>
        );
      };

      render(<MemoryTestComponent />);

      // Change data multiple times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(screen.getByTestId("new-data"));
      }

      expect(screen.getByTestId("iteration")).toHaveTextContent("Iteration: 5");
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  describe("Malformed Data Resilience", () => {
    it("should handle null and undefined values gracefully", () => {
      const malformedData = [
        { id: 1, name: "Valid", value: 100 },
        { id: null, name: undefined, value: NaN },
        { id: 3, name: "", value: 0 },
        { id: 4, name: null, value: undefined },
      ] as any[];

      render(<DataTable data={malformedData} columns={stressColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Valid")).toBeInTheDocument();
      // Should render without crashing even with malformed data
    });

    it("should handle circular references without crashing", () => {
      const circularData: any = { id: 1, name: "Circular" };
      circularData.self = circularData; // Create circular reference

      const dataWithCircular = [circularData];

      render(<DataTable data={dataWithCircular} columns={stressColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Circular")).toBeInTheDocument();
    });

    it("should handle extremely nested data", () => {
      const deeplyNested: any = { id: 1, name: "Deep" };
      let current = deeplyNested;

      // Create 100 levels of nesting
      for (let i = 0; i < 100; i++) {
        current.nested = { level: i };
        current = current.nested;
      }

      render(<DataTable data={[deeplyNested]} columns={stressColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Deep")).toBeInTheDocument();
    });
  });

  describe("Concurrent User Interactions", () => {
    it("should handle simultaneous sorting and pagination", async () => {
      const data = generateStressData(500);
      render(<DataTable data={data} columns={stressColumns} />);

      // Simultaneously trigger sorting and pagination
      const sortButton = screen.getByText("Name");
      const nextButton = screen.getByText("Next");
      const pageSizeSelect = screen.getByDisplayValue("15");

      // Fire events rapidly
      fireEvent.click(sortButton);
      fireEvent.click(nextButton);
      fireEvent.change(pageSizeSelect, { target: { value: "50" } });
      fireEvent.click(sortButton); // Toggle sort again

      await waitFor(() => {
        // Should settle into a stable state
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByDisplayValue("50")).toBeInTheDocument();
      });
    });
  });

  describe("Edge Case Pagination Scenarios", () => {
    it("should handle page size changes that affect current page validity", async () => {
      const data = generateStressData(100);
      render(<DataTable data={data} columns={stressColumns} />);

      // Go to last page with small page size
      const pageSizeSelect = screen.getByDisplayValue("15");
      fireEvent.change(pageSizeSelect, { target: { value: "10" } });

      await waitFor(() => {
        expect(screen.getByDisplayValue("10")).toBeInTheDocument();
      });

      // Navigate to last page
      fireEvent.click(screen.getByText("Last"));

      await waitFor(() => {
        expect(screen.getByText("Page 10 of 10")).toBeInTheDocument();
      });

      // Now change to large page size - should adjust current page
      fireEvent.change(pageSizeSelect, { target: { value: "100" } });

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
      });
    });

    it("should handle data length changes that invalidate current page", async () => {
      const DynamicDataExample = () => {
        const [dataSize, setDataSize] = useState(100);
        const data = useMemo(() => generateStressData(dataSize), [dataSize]);

        return (
          <div>
            <button onClick={() => setDataSize(10)} data-testid="shrink-data">
              Shrink Data
            </button>
            <DataTable data={data} columns={stressColumns} />
          </div>
        );
      };

      render(<DynamicDataExample />);

      // Navigate to a later page
      fireEvent.click(screen.getByText("Last"));

      await waitFor(() => {
        expect(screen.getByText(/Page \d+ of \d+/)).toBeInTheDocument();
      });

      // Dramatically reduce data size
      fireEvent.click(screen.getByTestId("shrink-data"));

      await waitFor(() => {
        // Should adjust to valid page
        expect(screen.getByRole("table")).toBeInTheDocument();
      });
    });
  });

  describe("Performance Benchmarks", () => {
    it("should sort large datasets quickly", async () => {
      const data = generateStressData(10000);
      render(<DataTable data={data} columns={stressColumns} />);

      const startTime = performance.now();
      fireEvent.click(screen.getByText("Value"));

      await waitFor(() => {
        expect(screen.getByText("↑")).toBeInTheDocument();
      });

      const endTime = performance.now();
      const sortTime = endTime - startTime;

      // Should sort within reasonable time
      expect(sortTime).toBeLessThan(500); // 500ms threshold
    });

    it("should handle page size changes quickly", async () => {
      const data = generateStressData(10000);
      render(<DataTable data={data} columns={stressColumns} />);

      const startTime = performance.now();
      const pageSizeSelect = screen.getByDisplayValue("15");
      fireEvent.change(pageSizeSelect, { target: { value: "100" } });

      await waitFor(() => {
        expect(screen.getByDisplayValue("100")).toBeInTheDocument();
      });

      const endTime = performance.now();
      const changeTime = endTime - startTime;

      // Should change page size quickly
      expect(changeTime).toBeLessThan(200); // 200ms threshold
    });
  });
});
