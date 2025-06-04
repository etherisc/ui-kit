import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

describe("Accordion", () => {
  it("renders correctly", () => {
    render(
      <Accordion type="single" collapsible data-testid="accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion")).toBeInTheDocument();
    expect(screen.getByText("Trigger 1")).toBeInTheDocument();
  });

  it("renders single selection type correctly", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Click first trigger
    fireEvent.click(screen.getByText("Trigger 1"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    // Click second trigger - should close first and open second
    fireEvent.click(screen.getByText("Trigger 2"));
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("renders multiple selection type correctly", () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Click first trigger
    fireEvent.click(screen.getByText("Trigger 1"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    // Click second trigger - both should be open
    fireEvent.click(screen.getByText("Trigger 2"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("handles default value for single selection", () => {
    render(
      <Accordion type="single" defaultValue="item-2" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Second item should be open by default
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("handles default values for multiple selection", () => {
    render(
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Both items should be open by default
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("renders disabled items correctly", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Available Trigger</AccordionTrigger>
          <AccordionContent>Available Content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Disabled Trigger</AccordionTrigger>
          <AccordionContent>Disabled Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const disabledTrigger = screen.getByText("Disabled Trigger");
    expect(disabledTrigger).toBeDisabled();

    // Should not open when clicked
    fireEvent.click(disabledTrigger);
    expect(screen.queryByText("Disabled Content")).not.toBeInTheDocument();
  });

  it("supports custom className on accordion", () => {
    render(
      <Accordion
        type="single"
        className="custom-accordion"
        data-testid="accordion"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion")).toHaveClass("custom-accordion");
  });

  it("supports custom className on items", () => {
    render(
      <Accordion type="single">
        <AccordionItem
          value="item-1"
          className="custom-item"
          data-testid="accordion-item"
        >
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-item")).toHaveClass("custom-item");
  });

  it("supports custom className on triggers", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="custom-trigger"
            data-testid="accordion-trigger"
          >
            Trigger
          </AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-trigger")).toHaveClass(
      "custom-trigger",
    );
  });

  it("supports custom className on content", () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent
            className="custom-content"
            data-testid="accordion-content"
          >
            Content
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const content = screen.getByTestId("accordion-content");
    // The custom class is applied to the wrapper div inside the content
    const contentWrapper = content.firstChild as HTMLElement;
    expect(contentWrapper).toHaveClass("custom-content");
  });

  it("has proper accessibility attributes", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Accessible Trigger</AccordionTrigger>
          <AccordionContent>Accessible Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText("Accessible Trigger");
    // Radix UI accordion triggers don't have explicit role="button" but should have aria-expanded
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("forwards ref correctly for accordion", () => {
    const ref = { current: null };

    render(
      <Accordion type="single" ref={ref}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref correctly for items", () => {
    const ref = { current: null };

    render(
      <Accordion type="single">
        <AccordionItem value="item-1" ref={ref}>
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref correctly for triggers", () => {
    const ref = { current: null };

    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger ref={ref}>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("forwards ref correctly for content", () => {
    const ref = { current: null };

    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent ref={ref}>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("handles controlled single selection", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Accordion
        type="single"
        value="item-1"
        onValueChange={onValueChange}
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Trigger 2"));
    expect(onValueChange).toHaveBeenCalledWith("item-2");

    // Simulate parent updating the value
    rerender(
      <Accordion
        type="single"
        value="item-2"
        onValueChange={onValueChange}
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("handles controlled multiple selection", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Accordion
        type="multiple"
        value={["item-1"]}
        onValueChange={onValueChange}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Trigger 2"));
    expect(onValueChange).toHaveBeenCalledWith(["item-1", "item-2"]);

    // Simulate parent updating the values
    rerender(
      <Accordion
        type="multiple"
        value={["item-1", "item-2"]}
        onValueChange={onValueChange}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("renders ChevronDown icon in triggers", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger with Icon</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Check that the SVG icon is present
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("h-4", "w-4", "shrink-0");
  });

  it("supports complex content", () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Complex Content</AccordionTrigger>
          <AccordionContent>
            <div>
              <h3>Title</h3>
              <p>Paragraph</p>
              <button>Button</button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });

  it("handles collapsible behavior in single mode", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText("Trigger");

    // Open the item
    fireEvent.click(trigger);
    expect(screen.getByText("Content")).toBeInTheDocument();

    // Close the item (collapsible)
    fireEvent.click(trigger);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
});

describe("AccordionItem", () => {
  it("renders correctly", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="test" data-testid="accordion-item">
          <AccordionTrigger>Test</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-item")).toBeInTheDocument();
  });

  it("has default border styling", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="test" data-testid="accordion-item">
          <AccordionTrigger>Test</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-item")).toHaveClass("border-b");
  });
});

describe("AccordionTrigger", () => {
  it("renders correctly", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="test">
          <AccordionTrigger data-testid="accordion-trigger">
            Test Trigger
          </AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-trigger")).toBeInTheDocument();
    expect(screen.getByText("Test Trigger")).toBeInTheDocument();
  });

  it("has correct default styling", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="test">
          <AccordionTrigger data-testid="accordion-trigger">
            Test
          </AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByTestId("accordion-trigger");
    expect(trigger).toHaveClass(
      "flex",
      "flex-1",
      "items-center",
      "justify-between",
      "py-4",
      "font-medium",
    );
  });
});

describe("AccordionContent", () => {
  it("renders correctly when open", () => {
    render(
      <Accordion type="single" defaultValue="test">
        <AccordionItem value="test">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent data-testid="accordion-content">
            Test Content
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId("accordion-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct default styling", () => {
    render(
      <Accordion type="single" defaultValue="test">
        <AccordionItem value="test">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent data-testid="accordion-content">
            Content
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const content = screen.getByTestId("accordion-content");
    expect(content).toHaveClass("overflow-hidden", "text-sm");
  });
});
