import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

// Mock data for testing
interface TestData {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const generateTestData = (count: number): TestData[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 2 === 0 ? "active" : "inactive",
  }));
};

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

describe("DataTable Pagination", () => {
  const testData = generateTestData(75);

  describe("Page size selector", () => {
    it("should display and function correctly", () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            pageSizeOptions: [10, 25, 50, 100],
            showSizeSelector: true,
          }}
        />,
      );

      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      expect(selector).toBeInTheDocument();
      expect(selector).toHaveValue("10");

      const options = screen.getAllByRole("option");
      const values = options.map((option) => option.getAttribute("value"));
      expect(values).toEqual(["10", "25", "50", "100"]);
    });

    it("should include custom page size in options", () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={15}
          pagination={{
            pageSizeOptions: [10, 25, 50, 100],
            showSizeSelector: true,
          }}
        />,
      );

      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      expect(selector).toHaveValue("15");

      const options = screen.getAllByRole("option");
      const values = options.map((option) => option.getAttribute("value"));
      expect(values).toContain("15");
    });

    it("should update table when page size changes", async () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            pageSizeOptions: [10, 25, 50, 100],
            showSizeSelector: true,
            showPageInfo: true,
          }}
        />,
      );

      expect(screen.getAllByRole("row")).toHaveLength(11);
      expect(
        screen.getByText(/showing 1-10 of 75 entries/i),
      ).toBeInTheDocument();

      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(26);
        expect(
          screen.getByText(/showing 1-25 of 75 entries/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Page info display", () => {
    it("should show correct entry count information", () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showPageInfo: true,
          }}
        />,
      );

      expect(
        screen.getByText(/showing 1-10 of 75 entries/i),
      ).toBeInTheDocument();
    });

    it("should update when page size changes", async () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showPageInfo: true,
            showSizeSelector: true,
            pageSizeOptions: [10, 25, 50],
          }}
        />,
      );

      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        expect(
          screen.getByText(/showing 1-25 of 75 entries/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Pagination navigation", () => {
    it("should render navigation element when enabled", () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
          }}
        />,
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty data gracefully", () => {
      render(
        <DataTable
          data={[]}
          columns={columns}
          pagination={{
            showNavigation: true,
            showPageInfo: true,
          }}
        />,
      );

      expect(screen.getByText(/no results/i)).toBeInTheDocument();
      expect(screen.getByText(/showing 0-0 of 0 entries/i)).toBeInTheDocument();
    });

    it("should not show pagination for small datasets", () => {
      const smallData = generateTestData(10);
      render(<DataTable data={smallData} columns={columns} pageSize={10} />);

      expect(screen.getAllByRole("row")).toHaveLength(11);
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("should handle single page datasets correctly", () => {
      const singlePageData = generateTestData(5);
      render(
        <DataTable
          data={singlePageData}
          columns={columns}
          pageSize={10}
          pagination={{
            showPageInfo: true,
          }}
        />,
      );

      expect(screen.getByText(/showing 1-5 of 5 entries/i)).toBeInTheDocument();
    });
  });
});
