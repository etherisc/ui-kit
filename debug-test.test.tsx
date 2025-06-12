import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTable } from "./src/components/data-display/DataTable/DataTable";

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

describe("DataTable Debug", () => {
  it("should render something", () => {
    const { container } = render(<DataTable data={[]} columns={columns} />);
    console.log("HTML:", container.innerHTML);
    expect(container.firstChild).toBeTruthy();
  });
});
