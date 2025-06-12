import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

// Test data interfaces
interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

interface SimpleData {
  id: number;
  name: string;
}

// Test data generators
const generatePersonData = (count: number): Person[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    age: 20 + (i % 50),
    email: `user${i + 1}@example.com`,
  }));

const generateSimpleData = (count: number): SimpleData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

// Test columns
const personColumns: ColumnDef<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "email", header: "Email" },
];

const simpleColumns: ColumnDef<SimpleData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

describe("DataTable", () => {
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
      const data = generateSimpleData(3);
      render(
        <DataTable
          data={data}
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

      // Pagination buttons should be accessible
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
});
