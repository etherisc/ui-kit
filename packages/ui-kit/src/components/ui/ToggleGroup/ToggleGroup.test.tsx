import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

describe("ToggleGroup", () => {
  it("renders correctly", () => {
    render(
      <ToggleGroup type="single" data-testid="toggle-group">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByTestId("toggle-group")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders single selection type correctly", () => {
    render(
      <ToggleGroup type="single" data-testid="toggle-group">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    const toggleGroup = screen.getByTestId("toggle-group");
    expect(toggleGroup).toBeInTheDocument();
  });

  it("renders multiple selection type correctly", () => {
    render(
      <ToggleGroup type="multiple" data-testid="toggle-group">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    const toggleGroup = screen.getByTestId("toggle-group");
    expect(toggleGroup).toBeInTheDocument();
  });

  it("handles single selection correctly", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    fireEvent.click(screen.getByText("Item 1"));
    expect(onValueChange).toHaveBeenCalledWith("item1");
  });

  it("handles multiple selection correctly", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="multiple" onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    fireEvent.click(screen.getByText("Item 1"));
    expect(onValueChange).toHaveBeenCalledWith(["item1"]);

    fireEvent.click(screen.getByText("Item 2"));
    expect(onValueChange).toHaveBeenCalledWith(["item1", "item2"]);
  });

  it("renders with default value for single selection", () => {
    render(
      <ToggleGroup type="single" defaultValue="item2">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    const item2 = screen.getByText("Item 2");
    expect(item2).toHaveAttribute("data-state", "on");
  });

  it("renders with default values for multiple selection", () => {
    render(
      <ToggleGroup type="multiple" defaultValue={["item1", "item2"]}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
        <ToggleGroupItem value="item3">Item 3</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Item 1")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Item 2")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Item 3")).toHaveAttribute("data-state", "off");
  });

  it("renders disabled state correctly", () => {
    render(
      <ToggleGroup type="single" disabled>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Item 1")).toBeDisabled();
    expect(screen.getByText("Item 2")).toBeDisabled();
  });

  it("does not call onValueChange when disabled", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" disabled onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    fireEvent.click(screen.getByText("Item 1"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("supports custom className on group", () => {
    render(
      <ToggleGroup
        type="single"
        className="custom-group"
        data-testid="toggle-group"
      >
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByTestId("toggle-group")).toHaveClass("custom-group");
  });

  it("supports custom className on items", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem
          value="item1"
          className="custom-item"
          data-testid="toggle-item"
        >
          Item 1
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByTestId("toggle-item")).toHaveClass("custom-item");
  });

  it("renders default variant correctly", () => {
    render(
      <ToggleGroup type="single" variant="default" data-testid="toggle-group">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByTestId("toggle-group")).toHaveClass("bg-transparent");
  });

  it("renders outline variant correctly", () => {
    render(
      <ToggleGroup type="single" variant="outline" data-testid="toggle-group">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByTestId("toggle-group")).toHaveClass(
      "border",
      "border-input",
    );
  });

  it("renders item sizes correctly", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="sm" size="sm" data-testid="item-sm">
          Small
        </ToggleGroupItem>
        <ToggleGroupItem
          value="default"
          size="default"
          data-testid="item-default"
        >
          Default
        </ToggleGroupItem>
        <ToggleGroupItem value="lg" size="lg" data-testid="item-lg">
          Large
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByTestId("item-sm")).toHaveClass("h-9", "px-2.5");
    expect(screen.getByTestId("item-default")).toHaveClass("h-10", "px-3");
    expect(screen.getByTestId("item-lg")).toHaveClass("h-11", "px-5");
  });

  it("has proper accessibility attributes", () => {
    render(
      <ToggleGroup type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-label", "Text alignment");

    const leftItem = screen.getByLabelText("Align left");
    expect(leftItem).toBeInTheDocument();
  });

  it("forwards ref correctly for group", () => {
    const ref = { current: null };
    render(
      <ToggleGroup type="single" ref={ref}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref correctly for items", () => {
    const ref = { current: null };
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="item1" ref={ref}>
          Item 1
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("handles controlled single selection", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <ToggleGroup type="single" value="item1" onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Item 1")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Item 2")).toHaveAttribute("data-state", "off");

    fireEvent.click(screen.getByText("Item 2"));
    expect(onValueChange).toHaveBeenCalledWith("item2");

    // Simulate parent updating the value
    rerender(
      <ToggleGroup type="single" value="item2" onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Item 1")).toHaveAttribute("data-state", "off");
    expect(screen.getByText("Item 2")).toHaveAttribute("data-state", "on");
  });

  it("handles controlled multiple selection", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <ToggleGroup
        type="multiple"
        value={["item1"]}
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Item 1")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Item 2")).toHaveAttribute("data-state", "off");

    fireEvent.click(screen.getByText("Item 2"));
    expect(onValueChange).toHaveBeenCalledWith(["item1", "item2"]);

    // Simulate parent updating the values
    rerender(
      <ToggleGroup
        type="multiple"
        value={["item1", "item2"]}
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Item 1")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Item 2")).toHaveAttribute("data-state", "on");
  });

  it("supports children content", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold">
          <span className="font-bold">B</span>
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("B")).toHaveClass("font-bold");
  });
});
