import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface TestData {
  id: number;
  name: string;
}

const columns: ColumnDef<TestData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

const testData: TestData[] = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
];

describe("DataTable - Simple Tests", () => {
  it("should render without crashing", () => {
    const { container } = render(<DataTable data={[]} columns={columns} />);

    console.log("Container HTML:", container.innerHTML);
    expect(container).toBeTruthy();
  });

  it("should render table element", () => {
    render(<DataTable data={[]} columns={columns} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("should render headers", () => {
    render(<DataTable data={[]} columns={columns} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("should render empty state", () => {
    render(<DataTable data={[]} columns={columns} />);

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("should render data", () => {
    render(<DataTable data={testData} columns={columns} />);

    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });
});
