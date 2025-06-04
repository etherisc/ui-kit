import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders correctly", () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>);

    expect(screen.getByTestId("toggle")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("renders with default unpressed state", () => {
    render(<Toggle>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("aria-pressed", "false");
    expect(toggleElement).toHaveAttribute("data-state", "off");
  });

  it("renders with pressed state when defaultPressed is true", () => {
    render(<Toggle defaultPressed>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("aria-pressed", "true");
    expect(toggleElement).toHaveAttribute("data-state", "on");
  });

  it("renders with controlled pressed state", () => {
    render(<Toggle pressed={true}>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("aria-pressed", "true");
    expect(toggleElement).toHaveAttribute("data-state", "on");
  });

  it("renders with controlled unpressed state", () => {
    render(<Toggle pressed={false}>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("aria-pressed", "false");
    expect(toggleElement).toHaveAttribute("data-state", "off");
  });

  it("calls onPressedChange when clicked", () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    fireEvent.click(toggleElement);

    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("toggles state when clicked in uncontrolled mode", () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute("aria-pressed", "false");
  });

  it("renders disabled state correctly", () => {
    render(<Toggle disabled>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toBeDisabled();
    expect(toggleElement).toHaveAttribute("data-disabled", "");
  });

  it("does not call onPressedChange when disabled and clicked", () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Toggle
      </Toggle>,
    );

    const toggleElement = screen.getByRole("button");
    fireEvent.click(toggleElement);

    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("supports custom className", () => {
    render(
      <Toggle className="custom-class" data-testid="toggle">
        Toggle
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toHaveClass("custom-class");
  });

  it("renders default variant correctly", () => {
    render(
      <Toggle variant="default" data-testid="toggle">
        Toggle
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toHaveClass("bg-transparent");
  });

  it("renders outline variant correctly", () => {
    render(
      <Toggle variant="outline" data-testid="toggle">
        Toggle
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toHaveClass("border", "border-input");
  });

  it("renders small size correctly", () => {
    render(
      <Toggle size="sm" data-testid="toggle">
        Toggle
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toHaveClass("h-9", "px-2.5");
  });

  it("renders default size correctly", () => {
    render(
      <Toggle size="default" data-testid="toggle">
        Toggle
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toHaveClass("h-10", "px-3");
  });

  it("renders large size correctly", () => {
    render(
      <Toggle size="lg" data-testid="toggle">
        Toggle
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toHaveClass("h-11", "px-5");
  });

  it("has proper accessibility attributes", () => {
    render(<Toggle aria-label="Toggle setting">Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("type", "button");
    expect(toggleElement).toHaveAttribute("aria-pressed");
    expect(toggleElement).toHaveAttribute("aria-label", "Toggle setting");
  });

  it("can be focused", () => {
    render(<Toggle>Toggle</Toggle>);

    const toggleElement = screen.getByRole("button");
    toggleElement.focus();
    expect(toggleElement).toHaveFocus();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Toggle ref={ref}>Toggle</Toggle>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports additional props", () => {
    render(
      <Toggle
        data-testid="toggle"
        id="test-toggle"
        aria-describedby="toggle-description"
      >
        Toggle
      </Toggle>,
    );

    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement).toHaveAttribute("id", "test-toggle");
    expect(toggleElement).toHaveAttribute(
      "aria-describedby",
      "toggle-description",
    );
  });

  it("renders with default styling", () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>);

    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-md",
      "text-sm",
      "font-medium",
    );
  });

  it("handles controlled mode correctly", () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Toggle
      </Toggle>,
    );

    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggleElement);
    expect(onPressedChange).toHaveBeenCalledWith(true);

    // Simulate parent component updating the pressed prop
    rerender(
      <Toggle pressed={true} onPressedChange={onPressedChange}>
        Toggle
      </Toggle>,
    );
    expect(toggleElement).toHaveAttribute("aria-pressed", "true");
  });

  it("works with form submission", () => {
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Toggle name="bold" defaultPressed>
          Bold
        </Toggle>
        <button type="submit">Submit</button>
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("supports children content", () => {
    render(
      <Toggle>
        <span className="font-bold">B</span>
      </Toggle>,
    );

    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("B")).toHaveClass("font-bold");
  });
});
