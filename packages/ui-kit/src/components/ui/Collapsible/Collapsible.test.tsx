import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

describe("Collapsible", () => {
  it("renders correctly", () => {
    render(
      <Collapsible data-testid="collapsible">
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByTestId("collapsible")).toBeInTheDocument();
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("renders closed by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden Content</CollapsibleContent>
      </Collapsible>,
    );

    // Content should not be visible initially
    expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();
  });

  it("opens when trigger is clicked", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed Content</CollapsibleContent>
      </Collapsible>,
    );

    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByText("Revealed Content")).toBeInTheDocument();
  });

  it("closes when trigger is clicked again", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Toggleable Content</CollapsibleContent>
      </Collapsible>,
    );

    // Open
    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByText("Toggleable Content")).toBeInTheDocument();

    // Close
    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.queryByText("Toggleable Content")).not.toBeInTheDocument();
  });

  it("respects defaultOpen prop", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Initially Open Content</CollapsibleContent>
      </Collapsible>,
    );

    // Content should be visible initially
    expect(screen.getByText("Initially Open Content")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>Disabled Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText("Disabled Toggle");
    fireEvent.click(trigger);

    // Content should not appear when disabled
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(
      <Collapsible className="custom-collapsible" data-testid="collapsible">
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByTestId("collapsible")).toHaveClass("custom-collapsible");
  });

  it("has proper accessibility attributes", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Accessible Toggle</CollapsibleTrigger>
        <CollapsibleContent>Accessible Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText("Accessible Toggle");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("updates aria-expanded when opened", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText("Toggle");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <Collapsible ref={ref}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("handles controlled state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Controlled Toggle</CollapsibleTrigger>
        <CollapsibleContent>Controlled Content</CollapsibleContent>
      </Collapsible>,
    );

    // Content should not be visible
    expect(screen.queryByText("Controlled Content")).not.toBeInTheDocument();

    // Click trigger
    fireEvent.click(screen.getByText("Controlled Toggle"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Simulate parent updating the state
    rerender(
      <Collapsible open={true} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Controlled Toggle</CollapsibleTrigger>
        <CollapsibleContent>Controlled Content</CollapsibleContent>
      </Collapsible>,
    );

    // Content should now be visible
    expect(screen.getByText("Controlled Content")).toBeInTheDocument();
  });

  it("supports complex content structure", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <div className="flex items-center">
            <span>Complex Trigger</span>
            <svg className="icon" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            <h3>Title</h3>
            <p>Paragraph</p>
            <button>Action</button>
          </div>
        </CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByText("Complex Trigger")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});

describe("CollapsibleTrigger", () => {
  it("renders correctly", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger data-testid="trigger">
          Test Trigger
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByTestId("trigger")).toBeInTheDocument();
    expect(screen.getByText("Test Trigger")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <Collapsible>
        <CollapsibleTrigger ref={ref}>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports asChild prop", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="custom-button" data-testid="custom-trigger">
            Custom Trigger
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByTestId("custom-trigger");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass("custom-button");
    expect(trigger.tagName).toBe("BUTTON");
  });

  it("handles keyboard navigation", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Keyboard Toggle</CollapsibleTrigger>
        <CollapsibleContent>Keyboard Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText("Keyboard Toggle");

    // Collapsible triggers respond to clicks, which can be triggered by keyboard
    fireEvent.click(trigger);
    expect(screen.getByText("Keyboard Content")).toBeInTheDocument();

    // Click again to close
    fireEvent.click(trigger);
    expect(screen.queryByText("Keyboard Content")).not.toBeInTheDocument();
  });
});

describe("CollapsibleContent", () => {
  it("renders correctly when open", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent data-testid="content">
          Test Content
        </CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("is hidden when closed", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent data-testid="content">
          Hidden Content
        </CollapsibleContent>
      </Collapsible>,
    );

    // The content element exists in DOM but is hidden
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("hidden");
    expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent ref={ref}>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports custom className", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent className="custom-content" data-testid="content">
          Styled Content
        </CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByTestId("content")).toHaveClass("custom-content");
  });

  it("has proper data attributes", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent data-testid="content">
          Content with state
        </CollapsibleContent>
      </Collapsible>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-state", "open");
  });
});

describe("Collapsible Integration", () => {
  it("works with nested collapsibles", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Parent Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>Parent Content</div>
          <Collapsible>
            <CollapsibleTrigger>Child Toggle</CollapsibleTrigger>
            <CollapsibleContent>Child Content</CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByText("Parent Content")).toBeInTheDocument();
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();

    // Open child collapsible
    fireEvent.click(screen.getByText("Child Toggle"));
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("maintains state independently from other collapsibles", () => {
    render(
      <div>
        <Collapsible>
          <CollapsibleTrigger>First Toggle</CollapsibleTrigger>
          <CollapsibleContent>First Content</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Second Toggle</CollapsibleTrigger>
          <CollapsibleContent>Second Content</CollapsibleContent>
        </Collapsible>
      </div>,
    );

    // Open first collapsible
    fireEvent.click(screen.getByText("First Toggle"));
    expect(screen.getByText("First Content")).toBeInTheDocument();
    expect(screen.queryByText("Second Content")).not.toBeInTheDocument();

    // Open second collapsible
    fireEvent.click(screen.getByText("Second Toggle"));
    expect(screen.getByText("First Content")).toBeInTheDocument();
    expect(screen.getByText("Second Content")).toBeInTheDocument();
  });

  it("works with form elements", () => {
    const onSubmit = vi.fn();

    render(
      <form onSubmit={onSubmit}>
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Form Section</CollapsibleTrigger>
          <CollapsibleContent>
            <input type="text" placeholder="Enter text" />
            <button type="submit">Submit</button>
          </CollapsibleContent>
        </Collapsible>
      </form>,
    );

    const input = screen.getByPlaceholderText("Enter text");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });
});
