import React from "react";
import { render } from "@testing-library/react";
import { DataTable } from "./src/components/data-display/DataTable/DataTable";

// Simple test data
const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

const data = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
];

// Test rendering
console.log("Testing DataTable rendering...");

try {
  const { container } = render(
    <DataTable data={data} columns={columns} showPagination={false} />,
  );

  console.log("Rendered HTML:", container.innerHTML);
  console.log("SUCCESS: DataTable rendered without errors");
} catch (error) {
  console.error("ERROR rendering DataTable:", error);
}
