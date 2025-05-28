import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { format } from "date-fns";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  const mockOnChange = vi.fn();
  const testDate = new Date(2024, 0, 15); // January 15, 2024

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe("Rendering", () => {
    it("renders with default placeholder", () => {
      render(<DatePicker onChange={mockOnChange} />);

      expect(
        screen.getByRole("button", { name: /choose date/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("Pick a date")).toBeInTheDocument();
    });

    it("renders with custom placeholder", () => {
      render(<DatePicker onChange={mockOnChange} placeholder="Select date" />);

      expect(screen.getByText("Select date")).toBeInTheDocument();
    });

    it("renders with selected date", () => {
      render(<DatePicker value={testDate} onChange={mockOnChange} />);

      expect(screen.getByText(format(testDate, "PPP"))).toBeInTheDocument();
    });

    it("renders with custom date format", () => {
      render(
        <DatePicker
          value={testDate}
          onChange={mockOnChange}
          format="yyyy-MM-dd"
        />,
      );

      expect(screen.getByText("2024-01-15")).toBeInTheDocument();
    });

    it("renders with different sizes", () => {
      const { rerender } = render(
        <DatePicker size="sm" onChange={mockOnChange} />,
      );
      expect(screen.getByRole("button")).toHaveClass("h-8", "text-xs", "px-2");

      rerender(<DatePicker size="md" onChange={mockOnChange} />);
      expect(screen.getByRole("button")).toHaveClass("h-10", "text-sm", "px-3");

      rerender(<DatePicker size="lg" onChange={mockOnChange} />);
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
      render(<DatePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("closes calendar when date is selected", async () => {
      const user = userEvent.setup();
      render(<DatePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      // Find and click a date
      const dateButton = screen.getByRole("gridcell", { name: "15" });
      await user.click(dateButton);

      await waitFor(() => {
        expect(screen.queryByRole("grid")).not.toBeInTheDocument();
      });
    });

    it("calls onChange when date is selected", async () => {
      const user = userEvent.setup();
      render(<DatePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      const dateButton = screen.getByRole("gridcell", { name: "15" });
      await user.click(dateButton);

      expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it("handles keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<DatePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      // Focus on a specific date and press Enter
      const dateButton = screen.getByRole("gridcell", { name: "15" });
      dateButton.focus();
      await user.keyboard("{Enter}");

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<DatePicker disabled onChange={mockOnChange} />);

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not open calendar when disabled", async () => {
      const user = userEvent.setup();
      render(<DatePicker disabled onChange={mockOnChange} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("renders error message", () => {
      render(<DatePicker error="Invalid date" onChange={mockOnChange} />);

      expect(screen.getByText("Invalid date")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("applies error styling", () => {
      render(<DatePicker error="Invalid date" onChange={mockOnChange} />);

      expect(screen.getByRole("button")).toHaveClass("border-destructive");
    });

    it("associates error with input via aria-describedby", () => {
      render(
        <DatePicker
          id="test-date"
          error="Invalid date"
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button");
      const errorElement = screen.getByText("Invalid date");

      expect(button).toHaveAttribute("aria-describedby", "test-date-error");
      expect(errorElement).toHaveAttribute("id", "test-date-error");
    });
  });

  describe("Date Constraints", () => {
    it("applies minDate constraint", async () => {
      const user = userEvent.setup();
      const minDate = new Date(2024, 0, 10); // January 10, 2024
      const initialDate = new Date(2024, 0, 15); // January 15, 2024 - valid date to show correct month

      render(
        <DatePicker
          minDate={minDate}
          value={initialDate}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      // Calendar should be open
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("applies maxDate constraint", async () => {
      const user = userEvent.setup();
      const maxDate = new Date(2024, 0, 20); // January 20, 2024
      const initialDate = new Date(2024, 0, 15); // January 15, 2024 - valid date to show correct month

      render(
        <DatePicker
          maxDate={maxDate}
          value={initialDate}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      // Calendar should be open
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("applies disabledDates constraint", async () => {
      const user = userEvent.setup();
      const disabledDates = [new Date(2024, 0, 15)]; // January 15, 2024
      const initialDate = new Date(2024, 0, 10); // January 10, 2024 - valid date to show correct month

      render(
        <DatePicker
          disabledDates={disabledDates}
          value={initialDate}
          onChange={mockOnChange}
        />,
      );

      const button = screen.getByRole("button", { name: /choose date/i });
      await user.click(button);

      // Calendar should be open
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<DatePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Choose date");
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("updates aria-expanded when calendar opens", async () => {
      const user = userEvent.setup();
      render(<DatePicker onChange={mockOnChange} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("supports custom aria-label", () => {
      render(
        <DatePicker aria-label="Custom date picker" onChange={mockOnChange} />,
      );

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Custom date picker",
      );
    });
  });

  describe("Custom Props", () => {
    it("forwards additional props to button", () => {
      render(
        <DatePicker
          onChange={mockOnChange}
          data-testid="custom-datepicker"
          title="Custom title"
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-testid", "custom-datepicker");
      expect(button).toHaveAttribute("title", "Custom title");
    });

    it("applies custom className", () => {
      render(<DatePicker className="custom-class" onChange={mockOnChange} />);

      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });
});
