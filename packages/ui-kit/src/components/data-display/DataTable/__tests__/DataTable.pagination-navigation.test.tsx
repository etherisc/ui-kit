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

describe("DataTable Pagination Navigation", () => {
  const testData = generateTestData(75); // Enough data for multiple pages

  describe("Rows per page selector", () => {
    it("should display the correct page size options", () => {
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

      // Check that all options are present
      const options = screen.getAllByRole("option");
      const values = options.map((option) => option.getAttribute("value"));
      expect(values).toEqual(["10", "25", "50", "100"]);
    });

    it("should show current page size as selected value", () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={25}
          pagination={{
            pageSizeOptions: [10, 25, 50, 100],
            showSizeSelector: true,
          }}
        />,
      );

      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      expect(selector).toHaveValue("25");
    });

    it("should include current pageSize in options even if not in pageSizeOptions", () => {
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
      const options = screen.getAllByRole("option");
      const values = options.map((option) => option.getAttribute("value"));

      expect(values).toContain("15");
      expect(selector).toHaveValue("15");
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
          }}
        />,
      );

      // Initially should show 10 rows
      expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data rows + 1 header

      // Change to 25 rows per page
      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(26); // 25 data rows + 1 header
      });

      expect(selector).toHaveValue("25");
    });

    it("should update page count when page size changes", async () => {
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

      // Initially should show page 1 of 8 (75 items / 10 per page = 8 pages)
      expect(
        screen.getByText(/showing 1-10 of 75 entries/i),
      ).toBeInTheDocument();

      // Change to 25 rows per page
      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        // Should now show page 1 of 3 (75 items / 25 per page = 3 pages)
        expect(
          screen.getByText(/showing 1-25 of 75 entries/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Navigation buttons", () => {
    beforeEach(() => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
            showPageInfo: true,
          }}
        />,
      );
    });

    describe("First button", () => {
      it("should be disabled on first page", () => {
        const firstButton = screen.getByRole("button", { name: /first page/i });
        expect(firstButton).toBeInTheDocument();
        expect(firstButton).toHaveClass("pointer-events-none", "opacity-50");
      });

      it("should navigate to first page from any other page", async () => {
        // Navigate to page 3 first
        const page3Button = screen.getByRole("button", { name: "3" });
        fireEvent.click(page3Button);

        await waitFor(() => {
          expect(
            screen.getByText(/showing 21-30 of 75 entries/i),
          ).toBeInTheDocument();
        });

        // Click First button
        const firstButton = screen.getByRole("button", { name: /first page/i });
        fireEvent.click(firstButton);

        await waitFor(() => {
          expect(
            screen.getByText(/showing 1-10 of 75 entries/i),
          ).toBeInTheDocument();
        });
      });

      it("should be enabled when not on first page", async () => {
        // Navigate to page 2
        const nextButton = screen.getByRole("button", { name: /next page/i });
        fireEvent.click(nextButton);

        await waitFor(() => {
          const firstButton = screen.getByRole("button", {
            name: /first page/i,
          });
          expect(firstButton).not.toHaveClass(
            "pointer-events-none",
            "opacity-50",
          );
        });
      });
    });

    describe("Previous button", () => {
      it("should be disabled on first page", () => {
        const prevButton = screen.getByRole("button", {
          name: /previous page/i,
        });
        expect(prevButton).toBeInTheDocument();
        expect(prevButton).toHaveClass("pointer-events-none", "opacity-50");
      });

      it("should navigate to previous page", async () => {
        // Navigate to page 2 first
        const nextButton = screen.getByRole("button", { name: /next page/i });
        fireEvent.click(nextButton);

        await waitFor(() => {
          expect(
            screen.getByText(/showing 11-20 of 75 entries/i),
          ).toBeInTheDocument();
        });

        // Click Previous button
        const prevButton = screen.getByRole("button", {
          name: /previous page/i,
        });
        fireEvent.click(prevButton);

        await waitFor(() => {
          expect(
            screen.getByText(/showing 1-10 of 75 entries/i),
          ).toBeInTheDocument();
        });
      });
    });

    describe("Next button", () => {
      it("should navigate to next page", async () => {
        const nextButton = screen.getByRole("button", { name: /next page/i });
        fireEvent.click(nextButton);

        await waitFor(() => {
          expect(
            screen.getByText(/showing 11-20 of 75 entries/i),
          ).toBeInTheDocument();
        });
      });

      it("should be disabled on last page", async () => {
        // Navigate to last page
        const lastButton = screen.getByRole("button", { name: /last page/i });
        fireEvent.click(lastButton);

        await waitFor(() => {
          const nextButton = screen.getByRole("button", { name: /next page/i });
          expect(nextButton).toHaveClass("pointer-events-none", "opacity-50");
        });
      });
    });

    describe("Last button", () => {
      it("should navigate to last page", async () => {
        const lastButton = screen.getByRole("button", { name: /last page/i });
        fireEvent.click(lastButton);

        await waitFor(() => {
          // Last page should show entries 71-75
          expect(
            screen.getByText(/showing 71-75 of 75 entries/i),
          ).toBeInTheDocument();
        });
      });

      it("should be disabled on last page", async () => {
        // Navigate to last page
        const lastButton = screen.getByRole("button", { name: /last page/i });
        fireEvent.click(lastButton);

        await waitFor(() => {
          expect(lastButton).toHaveClass("pointer-events-none", "opacity-50");
        });
      });

      it("should be enabled when not on last page", () => {
        const lastButton = screen.getByRole("button", { name: /last page/i });
        expect(lastButton).not.toHaveClass("pointer-events-none", "opacity-50");
      });
    });
  });

  describe("Page indicator and individual page buttons", () => {
    beforeEach(() => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
            showPageInfo: true,
          }}
        />,
      );
    });

    it("should show correct page numbers", () => {
      // Should show page numbers 1, 2, 3, 4, 5, ..., 8
      expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument(); // Last page
    });

    it("should highlight current page", () => {
      const page1Button = screen.getByRole("button", { name: "1" });
      expect(page1Button).toHaveAttribute("aria-current", "page");
    });

    it("should navigate to clicked page number", async () => {
      const page3Button = screen.getByRole("button", { name: "3" });
      fireEvent.click(page3Button);

      await waitFor(() => {
        expect(
          screen.getByText(/showing 21-30 of 75 entries/i),
        ).toBeInTheDocument();
        expect(page3Button).toHaveAttribute("aria-current", "page");
      });
    });

    it("should update active page indicator when using navigation buttons", async () => {
      // Navigate to page 2 using Next button
      const nextButton = screen.getByRole("button", { name: /next page/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        const page2Button = screen.getByRole("button", { name: "2" });
        expect(page2Button).toHaveAttribute("aria-current", "page");

        const page1Button = screen.getByRole("button", { name: "1" });
        expect(page1Button).not.toHaveAttribute("aria-current", "page");
      });
    });

    it("should show ellipsis for large page counts", () => {
      const manyItemsData = generateTestData(500); // 50 pages
      render(
        <DataTable
          data={manyItemsData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
          }}
        />,
      );

      // Should show ellipsis
      expect(screen.getByText("…")).toBeInTheDocument();
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

    it("should update entry count when navigating pages", async () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
            showPageInfo: true,
          }}
        />,
      );

      // Navigate to page 2
      const nextButton = screen.getByRole("button", { name: /next page/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText(/showing 11-20 of 75 entries/i),
        ).toBeInTheDocument();
      });
    });

    it("should show correct count on last page", async () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
            showPageInfo: true,
          }}
        />,
      );

      // Navigate to last page
      const lastButton = screen.getByRole("button", { name: /last page/i });
      fireEvent.click(lastButton);

      await waitFor(() => {
        expect(
          screen.getByText(/showing 71-75 of 75 entries/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Edge cases and error states", () => {
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

    it("should handle small datasets where pagination is auto-disabled", () => {
      const smallData = generateTestData(10); // Small dataset
      render(<DataTable data={smallData} columns={columns} pageSize={10} />);

      // Should show all data without pagination controls
      expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data rows + 1 header
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("should update page display when page size changes", async () => {
      render(
        <DataTable
          data={testData}
          columns={columns}
          pageSize={10}
          pagination={{
            showNavigation: true,
            showPageInfo: true,
            showSizeSelector: true,
            pageSizeOptions: [10, 25, 50],
          }}
        />,
      );

      // Initially should show 10 rows
      expect(screen.getAllByRole("row")).toHaveLength(11); // 10 data rows + 1 header
      expect(
        screen.getByText(/showing 1-10 of 75 entries/i),
      ).toBeInTheDocument();

      // Change page size to 25
      const selector = screen.getByRole("combobox", { name: /rows per page/i });
      fireEvent.change(selector, { target: { value: "25" } });

      await waitFor(() => {
        // Should now show 25 rows
        expect(screen.getAllByRole("row")).toHaveLength(26); // 25 data rows + 1 header
        expect(
          screen.getByText(/showing 1-25 of 75 entries/i),
        ).toBeInTheDocument();
      });
    });
  });
});
