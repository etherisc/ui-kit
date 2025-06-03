import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders correctly", () => {
    render(<Switch data-testid="switch" />);

    expect(screen.getByTestId("switch")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with default unchecked state", () => {
    render(<Switch />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "false");
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
  });

  it("renders with checked state when defaultChecked is true", () => {
    render(<Switch defaultChecked />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "true");
    expect(switchElement).toHaveAttribute("data-state", "checked");
  });

  it("renders with controlled checked state", () => {
    render(<Switch checked={true} />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "true");
    expect(switchElement).toHaveAttribute("data-state", "checked");
  });

  it("renders with controlled unchecked state", () => {
    render(<Switch checked={false} />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "false");
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
  });

  it("calls onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);

    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles state when clicked in uncontrolled mode", () => {
    render(<Switch data-testid="switch" />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "false");

    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute("aria-checked", "true");

    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  it("renders disabled state correctly", () => {
    render(<Switch disabled />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveAttribute("data-disabled", "");
  });

  it("does not call onCheckedChange when disabled and clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);

    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("supports custom className", () => {
    render(<Switch className="custom-class" data-testid="switch" />);

    expect(screen.getByTestId("switch")).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<Switch />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("role", "switch");
    expect(switchElement).toHaveAttribute("type", "button");
    expect(switchElement).toHaveAttribute("aria-checked");
  });

  it("can be focused", () => {
    render(<Switch />);

    const switchElement = screen.getByRole("switch");
    switchElement.focus();
    expect(switchElement).toHaveFocus();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Switch ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports additional props", () => {
    render(
      <Switch
        data-testid="switch"
        id="test-switch"
        aria-label="Toggle setting"
        aria-describedby="switch-description"
      />,
    );

    const switchElement = screen.getByTestId("switch");
    expect(switchElement).toHaveAttribute("id", "test-switch");
    expect(switchElement).toHaveAttribute("aria-label", "Toggle setting");
    expect(switchElement).toHaveAttribute(
      "aria-describedby",
      "switch-description",
    );
  });

  it("renders with default styling", () => {
    render(<Switch data-testid="switch" />);

    const switchElement = screen.getByTestId("switch");
    expect(switchElement).toHaveClass(
      "peer",
      "inline-flex",
      "h-6",
      "w-11",
      "shrink-0",
      "cursor-pointer",
      "items-center",
      "rounded-full",
    );
  });

  it("handles controlled mode correctly", () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={onCheckedChange} />,
    );

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "false");

    fireEvent.click(switchElement);
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    // Simulate parent component updating the checked prop
    rerender(<Switch checked={true} onCheckedChange={onCheckedChange} />);
    expect(switchElement).toHaveAttribute("aria-checked", "true");
  });

  it("works with form submission", () => {
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Switch name="notifications" defaultChecked />
        <button type="submit">Submit</button>
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
