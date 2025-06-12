import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTable } from "./src/components/data-display/DataTable/DataTable";

// Simple test
const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

const data = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
];

describe("Debug DataTable", () => {
  it("should render without crashing", () => {
    console.log("Starting test...");

    try {
      const { container } = render(
        <DataTable data={data} columns={columns} showPagination={false} />,
      );

      console.log("Container HTML:", container.innerHTML);
      console.log("Document body:", document.body.innerHTML);

      // Try to find any element
      const table = container.querySelector("table");
      console.log("Table found:", !!table);

      if (table) {
        console.log("Table HTML:", table.outerHTML);
      }
    } catch (error) {
      console.error("Render error:", error);
      throw error;
    }
  });
});
