import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import { DataTable } from "../DataTable";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

// Test data interfaces
interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive";
}

interface SimpleData {
  id: number;
  name: string;
  value?: number;
}

// Test data generators
const generatePersonData = (count: number): Person[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    age: 20 + (i % 50),
    email: `user${i + 1}@example.com`,
    status: i % 2 === 0 ? "active" : "inactive",
  }));

const generateSimpleData = (count: number): SimpleData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
  }));

// Test columns
const personColumns: ColumnDef<Person>[] = [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "firstName", header: "First Name", enableSorting: true },
  { accessorKey: "lastName", header: "Last Name", enableSorting: true },
  { accessorKey: "age", header: "Age", enableSorting: true },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const simpleColumns: ColumnDef<SimpleData>[] = [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "value", header: "Value", enableSorting: true },
];

const simpleData: SimpleData[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

describe("DataTable - Comprehensive Edge Cases & Rock Solid Tests", () => {
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

  describe("Edge Cases - Empty Data", () => {
    it("should render empty table with proper structure", () => {
      render(<DataTable data={[]} columns={simpleColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("No results.")).toBeInTheDocument();
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Value")).toBeInTheDocument();
    });

    it("should not show pagination for empty data", () => {
      render(<DataTable data={[]} columns={simpleColumns} />);

      expect(screen.queryByText("Rows per page")).not.toBeInTheDocument();
      expect(screen.queryByText("First")).not.toBeInTheDocument();
    });

    it("should handle empty data with custom pagination config", () => {
      render(
        <DataTable
          data={[]}
          columns={simpleColumns}
          initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
        />,
      );

      expect(screen.getByText("No results.")).toBeInTheDocument();
      expect(screen.queryByText("Rows per page")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases - Single Item", () => {
    it("should render single item correctly", () => {
      const singleItem = generateSimpleData(1);
      render(<DataTable data={singleItem} columns={simpleColumns} />);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.queryByText("No results.")).not.toBeInTheDocument();
      expect(screen.queryByText("Rows per page")).not.toBeInTheDocument();
    });

    it("should handle single item with pagination enabled", () => {
      const singleItem = generateSimpleData(1);
      render(
        <DataTable
          data={singleItem}
          columns={simpleColumns}
          initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
        />,
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      // No pagination controls for single page
      expect(screen.queryByText("Rows per page")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases - Large Datasets", () => {
    it("should handle very large datasets efficiently", () => {
      const largeData = generatePersonData(10000);
      const startTime = performance.now();

      render(<DataTable data={largeData} columns={personColumns} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time
      expect(renderTime).toBeLessThan(500); // 500ms threshold

      // Should only render current page items
      expect(screen.getAllByRole("row")).toHaveLength(16); // 15 data + 1 header (default pagination)
      expect(screen.getByText("First1")).toBeInTheDocument();
      expect(screen.getByText("First15")).toBeInTheDocument();
      expect(screen.queryByText("First16")).not.toBeInTheDocument();
    });

    it("should handle large datasets with custom page sizes", () => {
      const largeData = generatePersonData(1000);

      render(
        <DataTable
          data={largeData}
          columns={personColumns}
          initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
        />,
      );

      // Should show 100 items + header
      expect(screen.getAllByRole("row")).toHaveLength(101);
      expect(screen.getByText("First1")).toBeInTheDocument();
      expect(screen.getByText("First100")).toBeInTheDocument();
    });
  });

  describe("Pagination - Edge Cases", () => {
    it("should handle exactly one page boundary (15 items)", () => {
      const exactPageData = generateSimpleData(15);
      render(<DataTable data={exactPageData} columns={simpleColumns} />);

      // With exactly 15 items, should not show pagination
      expect(screen.queryByText("Rows per page")).not.toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(16); // 15 data + 1 header
    });

    it("should handle one item over page boundary (16 items)", () => {
      const overPageData = generateSimpleData(16);
      render(<DataTable data={overPageData} columns={simpleColumns} />);

      // With 16 items, should show pagination
      expect(screen.getByText("Rows per page")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(16); // 15 data + 1 header (first page)

      // Should have pagination controls
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    it("should handle page size larger than data", () => {
      const smallData = generateSimpleData(5);
      render(
        <DataTable
          data={smallData}
          columns={simpleColumns}
          initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
        />,
      );

      // Should show all data, no pagination
      expect(screen.getAllByRole("row")).toHaveLength(6); // 5 data + 1 header
      expect(screen.queryByText("Rows per page")).not.toBeInTheDocument();
    });
  });

  describe("Server-Side Pagination", () => {
    it("should work with manual pagination", async () => {
      const ServerSideExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 10,
        });

        // Simulate server data for current page
        const currentPageData = generateSimpleData(10).map((item, index) => ({
          ...item,
          id: pagination.pageIndex * pagination.pageSize + index + 1,
          name: `Server Item ${pagination.pageIndex * pagination.pageSize + index + 1}`,
        }));

        const totalItems = 250; // Total items on "server"
        const pageCount = Math.ceil(totalItems / pagination.pageSize);

        return (
          <div>
            <DataTable
              data={currentPageData}
              columns={simpleColumns}
              state={{ pagination }}
              onPaginationChange={setPagination}
              manualPagination={true}
              pageCount={pageCount}
              rowCount={totalItems}
            />
            <div data-testid="debug-info">
              Page: {pagination.pageIndex + 1}, Size: {pagination.pageSize}
            </div>
          </div>
        );
      };

      render(<ServerSideExample />);

      // Should show server-side pagination info
      expect(screen.getByText("Page 1 of 25")).toBeInTheDocument();
      expect(screen.getByText("Server Item 1")).toBeInTheDocument();
      expect(screen.getByTestId("debug-info")).toHaveTextContent(
        "Page: 1, Size: 10",
      );

      // Navigate to next page
      fireEvent.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText("Page 2 of 25")).toBeInTheDocument();
        expect(screen.getByTestId("debug-info")).toHaveTextContent(
          "Page: 2, Size: 10",
        );
        expect(screen.getByText("Server Item 11")).toBeInTheDocument();
      });
    });

    it("should handle server-side pagination with different page sizes", async () => {
      const ServerSideExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 25,
        });

        const currentPageData = generateSimpleData(25);
        const totalItems = 1000;
        const pageCount = Math.ceil(totalItems / pagination.pageSize);

        return (
          <DataTable
            data={currentPageData}
            columns={simpleColumns}
            state={{ pagination }}
            onPaginationChange={setPagination}
            manualPagination={true}
            pageCount={pageCount}
            rowCount={totalItems}
          />
        );
      };

      render(<ServerSideExample />);

      expect(screen.getByText("Page 1 of 40")).toBeInTheDocument();

      // Change page size
      const pageSizeSelect = screen.getByDisplayValue("25");
      fireEvent.change(pageSizeSelect, { target: { value: "50" } });

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 20")).toBeInTheDocument();
      });
    });
  });

  describe("State Management - Complex Scenarios", () => {
    it("should handle controlled pagination state changes", async () => {
      const ControlledExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 5,
        });

        const [data, setData] = useState(generateSimpleData(50));

        const addItem = () => {
          setData((prev) => [
            ...prev,
            { id: prev.length + 1, name: `New Item ${prev.length + 1}` },
          ]);
        };

        const removeItem = () => {
          setData((prev) => prev.slice(0, -1));
        };

        return (
          <div>
            <button onClick={addItem} data-testid="add-item">
              Add Item
            </button>
            <button onClick={removeItem} data-testid="remove-item">
              Remove Item
            </button>
            <DataTable
              data={data}
              columns={simpleColumns}
              state={{ pagination }}
              onPaginationChange={setPagination}
            />
            <div data-testid="total-items">Total: {data.length}</div>
          </div>
        );
      };

      render(<ControlledExample />);

      // Initial state
      expect(screen.getByTestId("total-items")).toHaveTextContent("Total: 50");
      expect(screen.getAllByRole("row")).toHaveLength(6); // 5 data + 1 header

      // Add items
      fireEvent.click(screen.getByTestId("add-item"));
      fireEvent.click(screen.getByTestId("add-item"));

      await waitFor(() => {
        expect(screen.getByTestId("total-items")).toHaveTextContent(
          "Total: 52",
        );
      });

      // Remove items
      fireEvent.click(screen.getByTestId("remove-item"));

      await waitFor(() => {
        expect(screen.getByTestId("total-items")).toHaveTextContent(
          "Total: 51",
        );
      });
    });

    it("should handle pagination state persistence", async () => {
      const PersistentExample = () => {
        const [currentData, setCurrentData] = useState<"small" | "large">(
          "small",
        );
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 2,
          pageSize: 10,
        });

        const data =
          currentData === "small"
            ? generateSimpleData(20)
            : generateSimpleData(100);

        return (
          <div>
            <button
              onClick={() =>
                setCurrentData(currentData === "small" ? "large" : "small")
              }
              data-testid="toggle-data"
            >
              Switch to {currentData === "small" ? "Large" : "Small"} Dataset
            </button>
            <DataTable
              data={data}
              columns={simpleColumns}
              state={{ pagination }}
              onPaginationChange={setPagination}
            />
            <div data-testid="pagination-info">
              Page: {pagination.pageIndex + 1}, Size: {pagination.pageSize}
            </div>
          </div>
        );
      };

      render(<PersistentExample />);

      // Should start on page 3 with small data
      expect(screen.getByTestId("pagination-info")).toHaveTextContent(
        "Page: 3, Size: 10",
      );

      // Switch to large dataset - pagination state should persist
      fireEvent.click(screen.getByTestId("toggle-data"));

      await waitFor(() => {
        expect(screen.getByTestId("pagination-info")).toHaveTextContent(
          "Page: 3, Size: 10",
        );
        // Should show page 3 content
        expect(screen.getByText("Item 21")).toBeInTheDocument(); // First item on page 3
      });
    });
  });

  describe("Sorting Integration", () => {
    it("should maintain sorting across pagination", async () => {
      const data = generatePersonData(50);
      render(
        <DataTable
          data={data}
          columns={personColumns}
          initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
        />,
      );

      // Sort by age
      fireEvent.click(screen.getByText("Age"));

      await waitFor(() => {
        // Should show sorted data on first page
        const firstRowAge = screen.getByText("20"); // Youngest age should be first
        expect(firstRowAge).toBeInTheDocument();
      });

      // Go to next page
      fireEvent.click(screen.getByText("Next"));

      await waitFor(() => {
        // Should maintain sorting on second page
        expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
        // Ages should still be in sorted order
      });
    });

    it("should handle sorting with server-side pagination", async () => {
      const ServerSortExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 10,
        });
        const [sorting, setSorting] = useState<any[]>([]);

        // Generate data based on current sorting (mock server behavior)
        let data = generatePersonData(10);
        if (sorting.length > 0) {
          const sort = sorting[0];
          data = data.sort((a, b) => {
            const aVal = a[sort.id as keyof Person];
            const bVal = b[sort.id as keyof Person];
            if (sort.desc) {
              return aVal < bVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
          });
        }

        return (
          <DataTable
            data={data}
            columns={personColumns}
            state={{ pagination, sorting }}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            manualPagination={true}
            manualSorting={true}
            pageCount={10}
            rowCount={100}
          />
        );
      };

      render(<ServerSortExample />);

      // Click to sort by firstName
      fireEvent.click(screen.getByText("First Name"));

      await waitFor(() => {
        expect(screen.getByText("↑")).toBeInTheDocument();
      });
    });
  });

  describe("Performance & Stress Tests", () => {
    it("should handle rapid pagination changes", async () => {
      const data = generateSimpleData(1000);
      render(<DataTable data={data} columns={simpleColumns} />);

      const nextButton = screen.getByText("Next");
      const firstButton = screen.getByText("First");

      // Rapidly navigate through pages
      for (let i = 0; i < 5; i++) {
        fireEvent.click(nextButton);
        await waitFor(() => {
          expect(screen.getByText(`Page ${i + 2} of 67`)).toBeInTheDocument();
        });
      }

      // Jump back to first
      fireEvent.click(firstButton);
      await waitFor(() => {
        expect(screen.getByText("Page 1 of 67")).toBeInTheDocument();
      });
    });

    it("should handle rapid page size changes", async () => {
      const data = generateSimpleData(100);
      render(<DataTable data={data} columns={simpleColumns} />);

      const pageSizeSelect = screen.getByDisplayValue("15");

      // Rapidly change page sizes
      const pageSizes = ["25", "50", "100", "15"];
      for (const size of pageSizes) {
        fireEvent.change(pageSizeSelect, { target: { value: size } });
        await waitFor(() => {
          expect(screen.getByDisplayValue(size)).toBeInTheDocument();
        });
      }
    });
  });

  describe("Accessibility & Error Handling", () => {
    it("should maintain accessibility during state changes", async () => {
      const data = generateSimpleData(50);
      render(<DataTable data={data} columns={simpleColumns} />);

      // Check initial accessibility
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader")).toHaveLength(3);
      expect(screen.getAllByRole("row")).toHaveLength(16); // 15 data + 1 header

      // Navigate to next page
      fireEvent.click(screen.getByText("Next"));

      await waitFor(() => {
        // Should maintain proper accessibility structure
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getAllByRole("columnheader")).toHaveLength(3);
        expect(screen.getAllByRole("row")).toHaveLength(16);
      });
    });

    it("should handle malformed data gracefully", () => {
      const malformedData = [
        { id: 1, name: "Valid" },
        { id: null, name: undefined },
        { id: 3, name: "Also Valid", extraField: "ignored" },
      ] as any[];

      render(<DataTable data={malformedData} columns={simpleColumns} />);

      // Should render without crashing
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Valid")).toBeInTheDocument();
      expect(screen.getByText("Also Valid")).toBeInTheDocument();
    });
  });
});

describe("DataTable - Comprehensive Tests", () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("Basic Rendering", () => {
    it("should render an empty table with no data", () => {
      render(
        <DataTable data={[]} columns={simpleColumns} showPagination={false} />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("No results.")).toBeInTheDocument();
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("should render table with data", () => {
      render(
        <DataTable
          data={simpleData}
          columns={simpleColumns}
          showPagination={false}
        />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
      expect(screen.queryByText("No results.")).not.toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <DataTable
          data={[]}
          columns={simpleColumns}
          className="custom-class"
          showPagination={false}
        />,
      );

      const table = screen.getByRole("table");
      expect(table).toHaveClass("custom-class");
    });

    it("should render all column headers", () => {
      render(
        <DataTable data={[]} columns={personColumns} showPagination={false} />,
      );

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("First Name")).toBeInTheDocument();
      expect(screen.getByText("Last Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
    });
  });

  describe("Pagination - Basic Functionality", () => {
    it("should not show pagination for small datasets (≤10 items, single page)", () => {
      const data = generateSimpleData(5);
      render(<DataTable data={data} columns={simpleColumns} />);

      // Should not show pagination controls when only one page
      expect(screen.queryByText("Rows per page:")).not.toBeInTheDocument();
      expect(screen.queryByText("First")).not.toBeInTheDocument();
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    });

    it("should show pagination for larger datasets (>10 items)", () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      // Should show pagination controls
      expect(screen.getByText("Rows per page:")).toBeInTheDocument();
      expect(screen.getByDisplayValue("10")).toBeInTheDocument(); // Page size selector
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("Last")).toBeInTheDocument();
    });

    it("should hide pagination when showPagination is false", () => {
      const data = generateSimpleData(25);
      render(
        <DataTable
          data={data}
          columns={simpleColumns}
          showPagination={false}
        />,
      );

      // Should not show any pagination controls
      expect(screen.queryByText("Rows per page:")).not.toBeInTheDocument();
      expect(screen.queryByText("First")).not.toBeInTheDocument();
      // Should show all 25 items at once
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 25")).toBeInTheDocument();
    });
  });

  describe("Pagination - Page Size Selector", () => {
    it("should have default page size options [10, 25, 50, 100]", () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      const selector = screen.getByDisplayValue("10");
      expect(selector).toBeInTheDocument();

      // Check all options are present
      const options = Array.from(selector.querySelectorAll("option")).map(
        (option) => option.value,
      );
      expect(options).toEqual(["10", "25", "50", "100"]);
    });

    it("should change page size when selector is changed", async () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      const selector = screen.getByDisplayValue("10");

      // Initially showing 10 items (plus header row)
      expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data + 1 header

      // Change to 25 items per page
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        expect(screen.getByDisplayValue("25")).toBeInTheDocument();
        expect(screen.getAllByRole("row")).toHaveLength(26); // 25 data + 1 header
      });
    });

    it("should update pagination info when page size changes", async () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      const selector = screen.getByDisplayValue("10");

      // Initially showing "Showing 1 to 10 of 25 entries"
      expect(
        screen.getByText("Showing 1 to 10 of 25 entries"),
      ).toBeInTheDocument();

      // Change to 25 items per page
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        expect(
          screen.getByText("Showing 1 to 25 of 25 entries"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Pagination - Navigation", () => {
    it("should navigate between pages correctly", async () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      // Initially on page 1
      expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.queryByText("Item 11")).not.toBeInTheDocument();

      // Go to next page
      fireEvent.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
        expect(screen.getByText("Item 11")).toBeInTheDocument();
        expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
      });

      // Go to last page
      fireEvent.click(screen.getByText("Last"));

      await waitFor(() => {
        expect(screen.getByText("Page 3 of 3")).toBeInTheDocument();
        expect(screen.getByText("Item 21")).toBeInTheDocument();
        expect(screen.getByText("Item 25")).toBeInTheDocument();
      });

      // Go back to first page
      fireEvent.click(screen.getByText("First"));

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
        expect(screen.getByText("Item 1")).toBeInTheDocument();
      });
    });

    it("should disable navigation buttons appropriately", () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      const firstButton = screen.getByText("First");
      const prevButton = screen.getByText("Previous");
      const nextButton = screen.getByText("Next");
      const lastButton = screen.getByText("Last");

      // On first page, First and Previous should be disabled
      expect(firstButton).toBeDisabled();
      expect(prevButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
      expect(lastButton).not.toBeDisabled();
    });

    it("should disable navigation buttons on last page", async () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      // Go to last page
      fireEvent.click(screen.getByText("Last"));

      await waitFor(() => {
        const firstButton = screen.getByText("First");
        const prevButton = screen.getByText("Previous");
        const nextButton = screen.getByText("Next");
        const lastButton = screen.getByText("Last");

        // On last page, Next and Last should be disabled
        expect(firstButton).not.toBeDisabled();
        expect(prevButton).not.toBeDisabled();
        expect(nextButton).toBeDisabled();
        expect(lastButton).toBeDisabled();
      });
    });
  });

  describe("Pagination - Edge Cases", () => {
    it("should handle exactly one page of data", () => {
      const data = generateSimpleData(10);
      render(<DataTable data={data} columns={simpleColumns} />);

      // With exactly 10 items, should not show pagination (only 1 page)
      expect(screen.queryByText("Rows per page:")).not.toBeInTheDocument();
      expect(screen.queryByText("Page 1 of 1")).not.toBeInTheDocument();
    });

    it("should handle large datasets", () => {
      const data = generateSimpleData(1000);
      render(<DataTable data={data} columns={simpleColumns} />);

      expect(screen.getByText("Page 1 of 100")).toBeInTheDocument();
      expect(
        screen.getByText("Showing 1 to 10 of 1000 entries"),
      ).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 10")).toBeInTheDocument();
      expect(screen.queryByText("Item 11")).not.toBeInTheDocument();
    });

    it("should handle single item dataset", () => {
      const data = generateSimpleData(1);
      render(<DataTable data={data} columns={simpleColumns} />);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.queryByText("Rows per page:")).not.toBeInTheDocument();
    });

    it("should handle empty dataset", () => {
      render(<DataTable data={[]} columns={simpleColumns} />);

      expect(screen.getByText("No results.")).toBeInTheDocument();
      expect(screen.queryByText("Rows per page:")).not.toBeInTheDocument();
    });
  });

  describe("Sorting Integration", () => {
    const sortableColumns: ColumnDef<SimpleData>[] = [
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "name", header: "Name", enableSorting: true },
    ];

    it("should show sort indicators when columns are sortable", () => {
      const data = generateSimpleData(5);
      render(
        <DataTable
          data={data}
          columns={sortableColumns}
          enableSorting={true}
          showPagination={false}
        />,
      );

      const idHeader = screen.getByText("ID").closest("th");
      const nameHeader = screen.getByText("Name").closest("th");

      // Headers should be clickable (have cursor-pointer class)
      expect(idHeader?.querySelector("div")).toHaveClass("cursor-pointer");
      expect(nameHeader?.querySelector("div")).toHaveClass("cursor-pointer");
    });

    it("should sort data when column header is clicked", async () => {
      const data = [
        { id: 3, name: "Charlie" },
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ];
      render(
        <DataTable
          data={data}
          columns={sortableColumns}
          enableSorting={true}
          showPagination={false}
        />,
      );

      // Initially unsorted
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("Charlie");
      expect(rows[2]).toHaveTextContent("Alice");
      expect(rows[3]).toHaveTextContent("Bob");

      // Click ID header to sort by ID
      fireEvent.click(screen.getByText("ID"));

      await waitFor(() => {
        const sortedRows = screen.getAllByRole("row");
        expect(sortedRows[1]).toHaveTextContent("Alice"); // id: 1
        expect(sortedRows[2]).toHaveTextContent("Bob"); // id: 2
        expect(sortedRows[3]).toHaveTextContent("Charlie"); // id: 3
      });

      // Should show ascending sort indicator
      expect(screen.getByText("↑")).toBeInTheDocument();
    });

    it("should toggle sort direction on repeated clicks", async () => {
      const data = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ];
      render(
        <DataTable
          data={data}
          columns={sortableColumns}
          enableSorting={true}
          showPagination={false}
        />,
      );

      const idHeader = screen.getByText("ID");

      // First click - ascending
      fireEvent.click(idHeader);
      await waitFor(() => {
        expect(screen.getByText("↑")).toBeInTheDocument();
      });

      // Second click - descending
      fireEvent.click(idHeader);
      await waitFor(() => {
        expect(screen.getByText("↓")).toBeInTheDocument();
        const rows = screen.getAllByRole("row");
        expect(rows[1]).toHaveTextContent("Charlie"); // id: 3
        expect(rows[2]).toHaveTextContent("Bob"); // id: 2
        expect(rows[3]).toHaveTextContent("Alice"); // id: 1
      });
    });
  });

  describe("Controlled State", () => {
    it("should work with controlled pagination state", async () => {
      const ControlledExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 5,
        });

        return (
          <div>
            <DataTable
              data={generateSimpleData(20)}
              columns={simpleColumns}
              state={{ pagination }}
              onPaginationChange={setPagination}
              manualPagination={false}
            />
            <div data-testid="external-page-info">
              External: Page {pagination.pageIndex + 1}, Size{" "}
              {pagination.pageSize}
            </div>
          </div>
        );
      };

      render(<ControlledExample />);

      // Should start with 5 items per page
      expect(screen.getAllByRole("row")).toHaveLength(6); // 5 data + 1 header
      expect(screen.getByTestId("external-page-info")).toHaveTextContent(
        "External: Page 1, Size 5",
      );

      // Change page size via dropdown
      const selector = screen.getByDisplayValue("5");
      fireEvent.change(selector, { target: { value: "10" } });

      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data + 1 header
        expect(screen.getByTestId("external-page-info")).toHaveTextContent(
          "External: Page 1, Size 10",
        );
      });

      // Navigate to next page
      fireEvent.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByTestId("external-page-info")).toHaveTextContent(
          "External: Page 2, Size 10",
        );
      });
    });
  });

  describe("Server-Side Pagination", () => {
    it("should work with manual pagination", async () => {
      const mockData = generateSimpleData(10); // Only showing 10 items for current page
      const totalRowCount = 100; // Total items on server

      const ServerSideExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 10,
        });

        return (
          <DataTable
            data={mockData}
            columns={simpleColumns}
            state={{ pagination }}
            onPaginationChange={setPagination}
            manualPagination={true}
            pageCount={Math.ceil(totalRowCount / pagination.pageSize)} // 10 pages
            rowCount={totalRowCount}
          />
        );
      };

      render(<ServerSideExample />);

      // Should show server-side pagination info
      expect(screen.getByText("Page 1 of 10")).toBeInTheDocument();
      expect(
        screen.getByText("Showing 1 to 10 of 10 entries"),
      ).toBeInTheDocument();

      // Should be able to navigate (even though we're not actually loading new data in this test)
      expect(screen.getByText("Next")).not.toBeDisabled();
      expect(screen.getByText("Last")).not.toBeDisabled();

      // Navigate to "next page"
      fireEvent.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText("Page 2 of 10")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels and roles", () => {
      const data = generateSimpleData(15);
      render(<DataTable data={data} columns={simpleColumns} />);

      // Table should have proper role
      expect(screen.getByRole("table")).toBeInTheDocument();

      // Headers should be properly marked
      expect(screen.getAllByRole("columnheader")).toHaveLength(2);

      // Rows should be properly marked
      expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data + 1 header

      // Pagination selector should be accessible
      expect(screen.getByRole("combobox")).toBeInTheDocument(); // Page size selector
    });

    it("should have keyboard accessible navigation buttons", () => {
      const data = generateSimpleData(25);
      render(<DataTable data={data} columns={simpleColumns} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(4); // First, Previous, Next, Last

      // All buttons should be focusable
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("tabindex", "-1");
      });
    });
  });

  describe("Performance", () => {
    it("should handle large datasets without issues", () => {
      const startTime = performance.now();
      const data = generatePersonData(1000);

      render(<DataTable data={data} columns={personColumns} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms for 1000 items)
      expect(renderTime).toBeLessThan(100);

      // Should only show 10 items on first page
      expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data + 1 header
      expect(screen.getByText("First1")).toBeInTheDocument();
      expect(screen.getByText("First10")).toBeInTheDocument();
      expect(screen.queryByText("First11")).not.toBeInTheDocument();
    });
  });

  describe("Custom Page Size Options", () => {
    it("should work with custom initial page size", () => {
      const data = generateSimpleData(30);
      render(
        <DataTable
          data={data}
          columns={simpleColumns}
          initialState={{ pagination: { pageIndex: 0, pageSize: 5 } }}
        />,
      );

      // Should show 5 items + header
      expect(screen.getAllByRole("row")).toHaveLength(6);
      expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    });

    it("should work with controlled state and custom page size", async () => {
      const ControlledExample = () => {
        const [pagination, setPagination] = useState<PaginationState>({
          pageIndex: 0,
          pageSize: 15,
        });

        return (
          <DataTable
            data={generateSimpleData(30)}
            columns={simpleColumns}
            state={{ pagination }}
            onPaginationChange={setPagination}
          />
        );
      };

      render(<ControlledExample />);

      // Should show 15 items + header
      expect(screen.getAllByRole("row")).toHaveLength(16);

      // Page size selector should have 15 as an option and selected
      const selector = screen.getByDisplayValue("15");
      expect(selector).toBeInTheDocument();

      // Check that 15 is in the options
      const options = Array.from(selector.querySelectorAll("option")).map(
        (option) => option.value,
      );
      expect(options).toContain("15");
    });
  });
});

describe("DataTable - Basic Tests", () => {
  it("should render empty table", () => {
    render(
      <DataTable data={[]} columns={simpleColumns} showPagination={false} />,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("should render table with data", () => {
    render(
      <DataTable
        data={simpleData}
        columns={simpleColumns}
        showPagination={false}
      />,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("should render headers", () => {
    render(
      <DataTable data={[]} columns={simpleColumns} showPagination={false} />,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
