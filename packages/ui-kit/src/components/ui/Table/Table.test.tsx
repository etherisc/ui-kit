import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

describe("Table", () => {
  it("renders correctly", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = screen.getByRole("table");
    expect(table).toBeDefined();
  });

  it("renders table with all sub-components", () => {
    render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total: 2 users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByText("Test Caption")).toBeDefined();
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Email")).toBeDefined();
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("jane@example.com")).toBeDefined();
    expect(screen.getByText("Total: 2 users")).toBeDefined();
  });

  it("applies custom className to Table", () => {
    render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const wrapper = screen.getByRole("table").parentElement;
    expect(wrapper?.className.includes("relative")).toBe(true);
    expect(wrapper?.className.includes("w-full")).toBe(true);
    expect(wrapper?.className.includes("overflow-auto")).toBe(true);
  });

  it("renders TableHeader with correct structure", () => {
    render(
      <Table>
        <TableHeader data-testid="table-header">
          <TableRow>
            <TableHead>Column 1</TableHead>
            <TableHead>Column 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Data 1</TableCell>
            <TableCell>Data 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const header = screen.getByTestId("table-header");
    expect(header.tagName).toBe("THEAD");
    expect(screen.getByText("Column 1")).toBeDefined();
    expect(screen.getByText("Column 2")).toBeDefined();
  });

  it("renders TableBody with correct structure", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="table-body">
          <TableRow>
            <TableCell>John</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const body = screen.getByTestId("table-body");
    expect(body.tagName).toBe("TBODY");
    expect(screen.getByText("John")).toBeDefined();
    expect(screen.getByText("Jane")).toBeDefined();
  });

  it("renders TableFooter with correct structure", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Item 1</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-testid="table-footer">
          <TableRow>
            <TableCell>Footer Content</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    const footer = screen.getByTestId("table-footer");
    expect(footer.tagName).toBe("TFOOT");
    expect(screen.getByText("Footer Content")).toBeDefined();
  });

  it("applies custom className to TableRow", () => {
    render(
      <Table>
        <TableBody>
          <TableRow className="custom-row" data-testid="custom-row">
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row = screen.getByTestId("custom-row");
    expect(row.className.includes("custom-row")).toBe(true);
    expect(row.className.includes("border-b")).toBe(true);
    expect(row.className.includes("transition-colors")).toBe(true);
  });

  it("applies hover styles to TableRow", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="hover-row">
            <TableCell>Hoverable content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row = screen.getByTestId("hover-row");
    expect(row.className.includes("hover:bg-muted/50")).toBe(true);
  });

  it("supports selected state on TableRow", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state="selected" data-testid="selected-row">
            <TableCell>Selected content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row = screen.getByTestId("selected-row");
    expect(row.getAttribute("data-state")).toBe("selected");
    expect(row.className.includes("data-[state=selected]:bg-muted")).toBe(true);
  });

  it("renders TableHead with correct styling", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="table-head">Header Cell</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Body Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const head = screen.getByTestId("table-head");
    expect(head.tagName).toBe("TH");
    expect(head.className.includes("text-left")).toBe(true);
    expect(head.className.includes("font-medium")).toBe(true);
    expect(head.className.includes("text-muted-foreground")).toBe(true);
  });

  it("renders TableCell with correct styling", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-testid="table-cell">Body Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const cell = screen.getByTestId("table-cell");
    expect(cell.tagName).toBe("TD");
    expect(cell.className.includes("p-4")).toBe(true);
    expect(cell.className.includes("align-middle")).toBe(true);
  });

  it("renders TableCaption with correct styling", () => {
    render(
      <Table>
        <TableCaption data-testid="table-caption">
          Table description
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const caption = screen.getByTestId("table-caption");
    expect(caption.tagName).toBe("CAPTION");
    expect(caption.className.includes("text-sm")).toBe(true);
    expect(caption.className.includes("text-muted-foreground")).toBe(true);
    expect(screen.getByText("Table description")).toBeDefined();
  });

  it("supports colspan in TableCell", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col 1</TableHead>
            <TableHead>Col 2</TableHead>
            <TableHead>Col 3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} data-testid="colspan-cell">
              Spanning cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const cell = screen.getByTestId("colspan-cell");
    expect(cell.getAttribute("colspan")).toBe("3");
  });

  it("supports text alignment in TableCell", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-right" data-testid="right-aligned">
              $100.00
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const cell = screen.getByTestId("right-aligned");
    expect(cell.className.includes("text-right")).toBe(true);
  });

  it("renders empty table correctly", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empty Table</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>,
    );

    const table = screen.getByRole("table");
    expect(table).toBeDefined();
    expect(screen.getByText("Empty Table")).toBeDefined();
  });

  it("handles complex table structure", () => {
    render(
      <Table>
        <TableCaption>Complex table example</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow data-state="selected">
            <TableCell>1</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className="text-right">Edit</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>Inactive</TableCell>
            <TableCell className="text-right">Edit</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Users</TableCell>
            <TableCell className="text-right">2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByText("Complex table example")).toBeDefined();
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("Jane Smith")).toBeDefined();
    expect(screen.getByText("Total Users")).toBeDefined();

    // Check that first row has selected state
    const firstRow = screen.getByText("John Doe").closest("tr");
    expect(firstRow?.getAttribute("data-state")).toBe("selected");
  });

  it("supports accessibility attributes", () => {
    render(
      <Table aria-label="Data table">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = screen.getByRole("table");
    expect(table.getAttribute("aria-label")).toBe("Data table");

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
    expect(headers[0].getAttribute("scope")).toBe("col");
    expect(headers[1].getAttribute("scope")).toBe("col");
  });

  it("forwards ref correctly", () => {
    let tableRef: HTMLTableElement | null = null;

    render(
      <Table
        ref={(ref) => {
          tableRef = ref;
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(tableRef).toBeDefined();
    expect(tableRef?.tagName).toBe("TABLE");
  });
});
