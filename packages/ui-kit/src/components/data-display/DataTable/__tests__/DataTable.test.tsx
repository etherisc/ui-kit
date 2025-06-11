import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

describe("DataTable", () => {
  type TestData = {
    id: number;
    name: string;
    age: number;
  };

  const generateTestData = (count: number): TestData[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Name ${i + 1}`,
      age: 20 + i,
    }));

  const testData = generateTestData(25);

  const columns: ColumnDef<TestData, unknown>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "age",
      header: "Age",
      size: 80,
    },
  ];

  describe("Basic Rendering", () => {
    it("renders the table with data", () => {
      const { container } = render(
        <DataTable data={testData} columns={columns} />,
      );

      // Check headers
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();

      // Find the first row and check its cells
      const rows = container.querySelectorAll("tbody tr");
      expect(rows.length).toBeGreaterThan(0);

      const firstRow = rows[0] as HTMLElement;
      const cells = within(firstRow).getAllByRole("cell");

      expect(cells[0].textContent).toBe("1");
      expect(cells[1].textContent).toBe("Name 1");
      expect(cells[2].textContent).toBe("20");
    });

    it("shows empty state when no data", () => {
      render(<DataTable data={[]} columns={columns} />);

      expect(screen.getByText("No results.")).toBeInTheDocument();
    });
  });

  describe("Smart Pagination Defaults", () => {
    it("disables pagination for small datasets (≤15 items)", () => {
      const smallData = generateTestData(10);
      render(<DataTable data={smallData} columns={columns} />);

      // Should not show pagination controls
      expect(screen.queryByText("First")).not.toBeInTheDocument();
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();
      expect(screen.queryByText("Next")).not.toBeInTheDocument();

      // All rows should be visible
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(11); // 10 data rows + 1 header row
    });

    it("enables pagination for larger datasets (>15 items)", () => {
      render(<DataTable data={testData} columns={columns} />);

      // Should show pagination controls
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();

      // Should show limited rows (default page size)
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBeLessThan(testData.length + 1); // Less than total + header
    });
  });

  describe("Pagination Configuration", () => {
    it("disables pagination when explicitly set to false", () => {
      render(
        <DataTable data={testData} columns={columns} pagination={false} />,
      );

      // Should not show pagination controls
      expect(screen.queryByText("First")).not.toBeInTheDocument();
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();

      // All rows should be visible
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(testData.length + 1); // All data rows + header
    });

    it("respects explicit pagination config", () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pagination={{
            pageSize: 5,
            showSizeSelector: true,
            showPageInfo: true,
          }}
        />,
      );

      // Should show 5 rows
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(6); // 5 data rows + 1 header row

      // Should show configured features
      expect(screen.getByText("Rows per page:")).toBeInTheDocument();
      expect(screen.getByText(/Showing 1-5 of/)).toBeInTheDocument();
    });
  });
});
