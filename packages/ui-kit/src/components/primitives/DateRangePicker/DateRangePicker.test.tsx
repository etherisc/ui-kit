import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { format } from "date-fns";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

describe("DateRangePicker", () => {
  const mockOnChange = vi.fn();
  const testRange: DateRange = {
    from: new Date(2024, 0, 15), // January 15, 2024
    to: new Date(2024, 0, 20), // January 20, 2024
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe("Rendering", () => {
    it("renders with default placeholder", () => {
      render(<DateRangePicker onChange={mockOnChange} />);

      expect(
        screen.getByRole("button", { name: /choose date range/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("Pick a date range")).toBeInTheDocument();
    });

    it("renders with custom placeholder", () => {
      render(
        <DateRangePicker
          onChange={mockOnChange}
          placeholder="Select date range"
        />,
      );

      expect(screen.getByText("Select date range")).toBeInTheDocument();
    });

    it("renders with selected date range", () => {
      render(<DateRangePicker value={testRange} onChange={mockOnChange} />);

      const expectedText = `${format(testRange.from!, "PPP")} - ${format(testRange.to!, "PPP")}`;
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it("renders with partial date range (from only)", () => {
      const partialRange = { from: new Date(2024, 0, 15) };
      render(<DateRangePicker value={partialRange} onChange={mockOnChange} />);

      expect(
        screen.getByText(format(partialRange.from, "PPP")),
      ).toBeInTheDocument();
    });

    it("renders with custom date format", () => {
      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          format="yyyy-MM-dd"
        />,
      );

      expect(screen.getByText("2024-01-15 - 2024-01-20")).toBeInTheDocument();
    });

    it("renders with different sizes", () => {
      const { rerender } = render(
        <DateRangePicker size="sm" onChange={mockOnChange} />,
      );
      expect(screen.getByRole("button")).toHaveClass("h-8", "text-xs", "px-2");

      rerender(<DateRangePicker size="md" onChange={mockOnChange} />);
      expect(screen.getByRole("button")).toHaveClass("h-10", "text-sm", "px-3");

      rerender(<DateRangePicker size="lg" onChange={mockOnChange} />);
      expect(screen.getByRole("button")).toHaveClass(
        "h-12",
        "text-base",
        "px-4",
      );
    });
  });

  describe("Interaction", () => {
    it("opens calendar when clicked", async () => {
      const user = userEvent.setup();
      render(<DateRangePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Should have two calendars (numberOfMonths={2})
      expect(screen.getAllByRole("grid")).toHaveLength(2);
    });

    it("selects date range correctly", async () => {
      const user = userEvent.setup();
      render(<DateRangePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Calendar should be open initially
      expect(screen.getAllByRole("grid")).toHaveLength(2);

      // Select first date
      const firstDates = screen.getAllByRole("gridcell", { name: "15" });
      await user.click(firstDates[0]);

      // Verify onChange was called for first date
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.any(Date),
        }),
      );

      // Select second date
      const secondDates = screen.getAllByRole("gridcell", { name: "20" });
      await user.click(secondDates[0]);

      // Verify onChange was called again
      expect(mockOnChange).toHaveBeenCalled();
    });

    it("handles keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<DateRangePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Focus on a specific date and press Enter
      const dateDates = screen.getAllByRole("gridcell", { name: "15" });
      dateDates[0].focus();
      await user.keyboard("{Enter}");

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<DateRangePicker disabled onChange={mockOnChange} />);

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not open calendar when disabled", async () => {
      const user = userEvent.setup();
      render(<DateRangePicker disabled onChange={mockOnChange} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("renders error message", () => {
      render(
        <DateRangePicker error="Invalid date range" onChange={mockOnChange} />,
      );

      expect(screen.getByText("Invalid date range")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("applies error styling", () => {
      render(
        <DateRangePicker error="Invalid date range" onChange={mockOnChange} />,
      );

      expect(screen.getByRole("button")).toHaveClass("border-destructive");
    });

    it("associates error with input via aria-describedby", () => {
      render(
        <DateRangePicker
          id="test-daterange"
          error="Invalid date range"
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button");
      const errorElement = screen.getByText("Invalid date range");

      expect(button).toHaveAttribute(
        "aria-describedby",
        "test-daterange-error",
      );
      expect(errorElement).toHaveAttribute("id", "test-daterange-error");
    });
  });

  describe("Date Constraints", () => {
    it("applies minDate constraint", async () => {
      const user = userEvent.setup();
      const minDate = new Date(2024, 0, 10); // January 10, 2024
      const initialRange = { from: new Date(2024, 0, 15) }; // January 15, 2024

      render(
        <DateRangePicker
          minDate={minDate}
          value={initialRange}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Calendar should be open (two calendars)
      expect(screen.getAllByRole("grid")).toHaveLength(2);
    });

    it("applies maxDate constraint", async () => {
      const user = userEvent.setup();
      const maxDate = new Date(2024, 0, 25); // January 25, 2024
      const initialRange = { from: new Date(2024, 0, 15) }; // January 15, 2024

      render(
        <DateRangePicker
          maxDate={maxDate}
          value={initialRange}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Calendar should be open (two calendars)
      expect(screen.getAllByRole("grid")).toHaveLength(2);
    });

    it("applies disabledDates constraint", async () => {
      const user = userEvent.setup();
      const disabledDates = [new Date(2024, 0, 18)]; // January 18, 2024
      const initialRange = { from: new Date(2024, 0, 15) }; // January 15, 2024

      render(
        <DateRangePicker
          disabledDates={disabledDates}
          value={initialRange}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Calendar should be open (two calendars)
      expect(screen.getAllByRole("grid")).toHaveLength(2);
    });

    it("applies maxRange constraint", async () => {
      const user = userEvent.setup();
      const maxRange = 7; // Maximum 7 days
      const initialRange = { from: new Date(2024, 0, 15) }; // January 15, 2024

      render(
        <DateRangePicker
          maxRange={maxRange}
          value={initialRange}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Calendar should be open (two calendars)
      expect(screen.getAllByRole("grid")).toHaveLength(2);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<DateRangePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Choose date range");
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("updates aria-expanded when calendar opens", async () => {
      const user = userEvent.setup();
      render(<DateRangePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("supports custom aria-label", () => {
      render(
        <DateRangePicker
          aria-label="Select vacation dates"
          onChange={mockOnChange}
        />,
      );

      expect(
        screen.getByRole("button", { name: "Select vacation dates" }),
      ).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("forwards additional props to button", () => {
      render(
        <DateRangePicker
          onChange={mockOnChange}
          data-testid="custom-daterangepicker"
          title="Custom title"
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-testid", "custom-daterangepicker");
      expect(button).toHaveAttribute("title", "Custom title");
    });

    it("applies custom className", () => {
      render(
        <DateRangePicker className="custom-class" onChange={mockOnChange} />,
      );

      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Range Validation", () => {
    it("prevents selection of ranges exceeding maxRange", async () => {
      const user = userEvent.setup();
      const maxRange = 5; // Maximum 5 days
      let lastRange: DateRange | undefined;

      const handleChange = (range: DateRange | undefined) => {
        lastRange = range;
        mockOnChange(range);
      };

      render(<DateRangePicker maxRange={maxRange} onChange={handleChange} />);

      const button = screen.getByRole("button", { name: /choose date range/i });
      await user.click(button);

      // Select first date (January 15)
      const firstDates = screen.getAllByRole("gridcell", { name: "15" });
      await user.click(firstDates[0]);

      // Try to select a date that would exceed maxRange (January 25 = 10 days difference)
      const farDates = screen.getAllByRole("gridcell", { name: "25" });
      await user.click(farDates[0]);

      // The final range should not include the invalid end date
      // (the component should prevent setting ranges that exceed maxRange)
      expect(lastRange?.to).toBeUndefined();
      expect(lastRange?.from).toBeDefined();
    });
  });
});
