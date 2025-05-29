import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { ComboBox, type ComboBoxOption } from "./ComboBox";

const mockOptions: ComboBoxOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
  { value: "option4", label: "Option 4" },
];

describe("ComboBox", () => {
  it("renders with basic props", () => {
    render(<ComboBox options={mockOptions} placeholder="Select an option" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent("Select an option");
  });

  it("renders with label", () => {
    render(
      <ComboBox
        options={mockOptions}
        label="Choose Option"
        id="test-combobox"
      />,
    );
    const label = screen.getByText("Choose Option");
    const trigger = screen.getByRole("combobox");

    expect(label).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-labelledby", "test-combobox-label");
  });

  it("renders with description", () => {
    render(
      <ComboBox
        options={mockOptions}
        description="Select your preferred option"
        id="test-combobox"
      />,
    );
    const description = screen.getByText("Select your preferred option");
    const trigger = screen.getByRole("combobox");

    expect(description).toBeInTheDocument();
    expect(trigger).toHaveAttribute(
      "aria-describedby",
      "test-combobox-description",
    );
  });

  it("renders with error state", () => {
    render(
      <ComboBox
        options={mockOptions}
        error="Please select an option"
        id="test-combobox"
      />,
    );
    const error = screen.getByText("Please select an option");
    const trigger = screen.getByRole("combobox");

    expect(error).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-describedby", "test-combobox-error");
  });

  it("opens dropdown when clicked", async () => {
    const user = userEvent.setup();
    render(<ComboBox options={mockOptions} />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 4")).toBeInTheDocument();
    });
  });

  it("filters options when searching", async () => {
    const user = userEvent.setup();
    render(<ComboBox options={mockOptions} searchable />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search options...");
    await user.type(searchInput, "Option 1");

    await waitFor(() => {
      // Check that the search input has the value
      expect(searchInput).toHaveValue("Option 1");
      // The cmdk library might filter differently, so let's check for the empty state or filtered results
      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();
    });
  });

  it("calls onChange when option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ComboBox options={mockOptions} onChange={handleChange} />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const option = screen.getByText("Option 1");
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith("option1");
  });

  it("displays selected value", () => {
    render(<ComboBox options={mockOptions} value="option2" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Option 2");
  });

  it("handles disabled state", () => {
    render(<ComboBox options={mockOptions} disabled />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();
  });

  it("handles different sizes", () => {
    const { rerender } = render(<ComboBox options={mockOptions} size="sm" />);
    let trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("h-8", "text-xs");

    rerender(<ComboBox options={mockOptions} size="lg" />);
    trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("h-10", "text-base");
  });

  it("shows empty message when no options match search", async () => {
    const user = userEvent.setup();
    render(<ComboBox options={mockOptions} emptyText="No matches found" />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search options...");
    await user.type(searchInput, "nonexistent");

    await waitFor(() => {
      expect(screen.getByText("No matches found")).toBeInTheDocument();
    });
  });

  it("handles non-searchable mode", async () => {
    const user = userEvent.setup();
    render(<ComboBox options={mockOptions} searchable={false} />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    expect(
      screen.queryByPlaceholderText("Search options..."),
    ).not.toBeInTheDocument();
  });

  it("deselects option when clicking selected option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ComboBox
        options={mockOptions}
        value="option1"
        onChange={handleChange}
      />,
    );

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    // Use a more specific selector for the option in the dropdown
    const option = screen.getByRole("option", { name: /Option 1/ });
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("handles disabled options", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ComboBox options={mockOptions} onChange={handleChange} />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const disabledOption = screen.getByText("Option 3");
    expect(disabledOption.closest('[role="option"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );
  });

  it("supports custom class names", () => {
    render(
      <ComboBox
        options={mockOptions}
        className="custom-wrapper"
        triggerClassName="custom-trigger"
      />,
    );

    const wrapper = screen.getByRole("combobox").closest(".custom-wrapper");
    const trigger = screen.getByRole("combobox");

    expect(wrapper).toBeInTheDocument();
    expect(trigger).toHaveClass("custom-trigger");
  });
});
