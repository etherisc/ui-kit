import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { SpinnerInput } from "./SpinnerInput";

describe("SpinnerInput", () => {
  it("renders with basic props", () => {
    render(<SpinnerInput value={10} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("10");
  });

  it("renders with label", () => {
    render(<SpinnerInput label="Quantity" id="quantity-input" value={5} />);
    const label = screen.getByText("Quantity");
    const input = screen.getByRole("textbox");

    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-labelledby", "quantity-input-label");
  });

  it("renders with description", () => {
    render(
      <SpinnerInput
        description="Enter the quantity"
        id="quantity-input"
        value={5}
      />,
    );
    const description = screen.getByText("Enter the quantity");
    const input = screen.getByRole("textbox");

    expect(description).toBeInTheDocument();
    expect(input).toHaveAttribute(
      "aria-describedby",
      "quantity-input-description",
    );
  });

  it("renders with error state", () => {
    render(
      <SpinnerInput error="Value is required" id="quantity-input" value={5} />,
    );
    const error = screen.getByText("Value is required");
    const input = screen.getByRole("textbox");

    expect(error).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "quantity-input-error");
  });

  it("shows increment and decrement buttons by default", () => {
    render(<SpinnerInput value={10} />);
    const incrementButton = screen.getByLabelText("Increment value");
    const decrementButton = screen.getByLabelText("Decrement value");

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
  });

  it("hides buttons when showButtons is false", () => {
    render(<SpinnerInput value={10} showButtons={false} />);
    const incrementButton = screen.queryByLabelText("Increment value");
    const decrementButton = screen.queryByLabelText("Decrement value");

    expect(incrementButton).not.toBeInTheDocument();
    expect(decrementButton).not.toBeInTheDocument();
  });

  it("calls onChange when increment button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10} onChange={handleChange} />);

    const incrementButton = screen.getByLabelText("Increment value");
    await user.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(11);
  });

  it("calls onChange when decrement button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10} onChange={handleChange} />);

    const decrementButton = screen.getByLabelText("Decrement value");
    await user.click(decrementButton);

    expect(handleChange).toHaveBeenCalledWith(9);
  });

  it("respects step value for increment/decrement", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10} step={5} onChange={handleChange} />);

    const incrementButton = screen.getByLabelText("Increment value");
    await user.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(15);
  });

  it("respects min value constraint", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={5} min={5} onChange={handleChange} />);

    const decrementButton = screen.getByLabelText("Decrement value");
    expect(decrementButton).toBeDisabled();

    await user.click(decrementButton);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("respects max value constraint", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10} max={10} onChange={handleChange} />);

    const incrementButton = screen.getByLabelText("Increment value");
    expect(incrementButton).toBeDisabled();

    await user.click(incrementButton);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("handles manual input changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "25");

    expect(handleChange).toHaveBeenCalledWith(25);
  });

  it("formats value with precision on blur", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10.5} precision={2} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("10.50");

    await user.clear(input);
    await user.type(input, "15.1");
    await user.tab(); // Trigger blur

    expect(input).toHaveValue("15.10");
  });

  it("handles disabled state", () => {
    render(<SpinnerInput value={10} disabled />);
    const input = screen.getByRole("textbox");
    const incrementButton = screen.getByLabelText("Increment value");
    const decrementButton = screen.getByLabelText("Decrement value");

    expect(input).toBeDisabled();
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it("handles different sizes", () => {
    const { rerender } = render(<SpinnerInput value={10} size="sm" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-8", "text-xs");

    rerender(<SpinnerInput value={10} size="lg" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-10", "text-base");
  });

  it("supports custom class names", () => {
    render(
      <SpinnerInput
        value={10}
        className="custom-wrapper"
        inputClassName="custom-input"
      />,
    );

    const wrapper = screen.getByRole("textbox").closest(".custom-wrapper");
    const input = screen.getByRole("textbox");

    expect(wrapper).toBeInTheDocument();
    expect(input).toHaveClass("custom-input");
  });

  it("handles empty input gracefully", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={10} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.clear(input);

    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it("clamps values to min/max range on blur", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SpinnerInput value={10} min={5} max={15} onChange={handleChange} />,
    );

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "20");
    await user.tab(); // Trigger blur

    expect(input).toHaveValue("15");
    expect(handleChange).toHaveBeenCalledWith(15);
  });

  it("shows description but not error when both are provided", () => {
    render(
      <SpinnerInput
        value={10}
        description="This is a description"
        error="This is an error"
      />,
    );

    expect(screen.getByText("This is an error")).toBeInTheDocument();
    expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
  });

  it("handles negative values correctly", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SpinnerInput value={0} onChange={handleChange} />);

    const decrementButton = screen.getByLabelText("Decrement value");
    await user.click(decrementButton);

    expect(handleChange).toHaveBeenCalledWith(-1);
  });

  it("handles decimal step values", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SpinnerInput
        value={1.0}
        step={0.1}
        precision={1}
        onChange={handleChange}
      />,
    );

    const incrementButton = screen.getByLabelText("Increment value");
    await user.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(1.1);
  });
});
