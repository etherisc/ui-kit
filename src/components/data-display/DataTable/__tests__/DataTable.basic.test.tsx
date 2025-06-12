import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

// Simple test data
interface SimpleData {
  id: number;
  name: string;
}

const simpleColumns: ColumnDef<SimpleData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

const simpleData: SimpleData[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

describe("DataTable - Basic Functionality", () => {
  it("should render empty table", () => {
    const { container } = render(
      <DataTable data={[]} columns={simpleColumns} showPagination={false} />,
    );

    // Debug output
    console.log("Container HTML:", container.innerHTML);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("No results.")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("should render table with data", () => {
    const { container } = render(
      <DataTable
        data={simpleData}
        columns={simpleColumns}
        showPagination={false}
      />,
    );

    // Debug output
    console.log("Container HTML with data:", container.innerHTML);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("should show pagination for larger datasets", () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
    }));

    const { container } = render(
      <DataTable data={largeData} columns={simpleColumns} />,
    );

    // Debug output
    console.log("Container HTML with pagination:", container.innerHTML);

    // Should show table
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Should show pagination controls
    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
