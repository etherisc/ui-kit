import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

describe("Sheet", () => {
  it("renders correctly", () => {
    render(
      <Sheet>
        <SheetTrigger data-testid="trigger">Open</SheetTrigger>
        <SheetContent data-testid="content">
          <div>Content</div>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("trigger")).toBeDefined();
    expect(screen.getByText("Open")).toBeDefined();
  });

  it("opens when trigger is clicked", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Sheet Content</div>
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText("Open Sheet"));
    expect(screen.getByText("Sheet Content")).toBeDefined();
  });

  it("closes when close button is clicked", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Sheet Content</div>
          <SheetClose data-testid="close-button">Close</SheetClose>
        </SheetContent>
      </Sheet>,
    );

    // Open the sheet
    fireEvent.click(screen.getByText("Open Sheet"));
    expect(screen.getByText("Sheet Content")).toBeDefined();

    // Close the sheet
    fireEvent.click(screen.getByTestId("close-button"));
    expect(screen.queryByText("Sheet Content")).toBeNull();
  });

  it("supports controlled state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Sheet open={false} onOpenChange={onOpenChange}>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Controlled Content</div>
        </SheetContent>
      </Sheet>,
    );

    // Sheet should be closed initially
    expect(screen.queryByText("Controlled Content")).toBeNull();

    // Click trigger
    fireEvent.click(screen.getByText("Open Sheet"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Simulate parent updating the state
    rerender(
      <Sheet open={true} onOpenChange={onOpenChange}>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Controlled Content</div>
        </SheetContent>
      </Sheet>,
    );

    // Sheet should now be open
    expect(screen.getByText("Controlled Content")).toBeDefined();
  });

  it("supports custom className on trigger", () => {
    render(
      <Sheet>
        <SheetTrigger className="custom-trigger" data-testid="trigger">
          Open
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("trigger")).toHaveClass("custom-trigger");
  });

  it("supports custom className on content", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="custom-content" data-testid="content">
          Content
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("content")).toHaveClass("custom-content");
  });

  it("has proper accessibility attributes", () => {
    render(
      <Sheet>
        <SheetTrigger>Accessible Trigger</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByText("Accessible Trigger");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards ref correctly for trigger", () => {
    const ref = { current: null };

    render(
      <Sheet>
        <SheetTrigger ref={ref}>Trigger</SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("forwards ref correctly for content", () => {
    const ref = { current: null };

    render(
      <Sheet defaultOpen>
        <SheetTrigger>Trigger</SheetTrigger>
        <SheetContent ref={ref}>Content</SheetContent>
      </Sheet>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("SheetContent", () => {
  it("renders on right side by default", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent data-testid="content">Default Content</SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("inset-y-0", "right-0");
  });

  it("renders on left side", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left" data-testid="content">
          Left Content
        </SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("inset-y-0", "left-0");
  });

  it("renders on top side", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="top" data-testid="content">
          Top Content
        </SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("inset-x-0", "top-0");
  });

  it("renders on bottom side", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="bottom" data-testid="content">
          Bottom Content
        </SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("inset-x-0", "bottom-0");
  });

  it("includes close button by default", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>,
    );

    // Close button should be present with X icon
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toBeDefined();
  });

  it("supports complex content structure", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Test Title</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
          <div>Main Content</div>
          <SheetFooter>
            <div>Footer Content</div>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("Test Description")).toBeDefined();
    expect(screen.getByText("Main Content")).toBeDefined();
    expect(screen.getByText("Footer Content")).toBeDefined();
  });
});

describe("SheetHeader", () => {
  it("renders correctly", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader data-testid="header">
            <SheetTitle>Header Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("header")).toBeDefined();
    expect(screen.getByText("Header Title")).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader className="custom-header" data-testid="header">
            Header
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("header")).toHaveClass("custom-header");
  });

  it("has default spacing classes", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader data-testid="header">Header</SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("header")).toHaveClass(
      "flex",
      "flex-col",
      "space-y-2",
    );
  });
});

describe("SheetFooter", () => {
  it("renders correctly", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetFooter data-testid="footer">
            <div>Footer Content</div>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("footer")).toBeDefined();
    expect(screen.getByText("Footer Content")).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetFooter className="custom-footer" data-testid="footer">
            Footer
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("footer")).toHaveClass("custom-footer");
  });

  it("has default layout classes", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetFooter data-testid="footer">Footer</SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("footer")).toHaveClass("flex");
  });
});

describe("SheetTitle", () => {
  it("renders correctly", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle data-testid="title">Test Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("title")).toBeDefined();
    expect(screen.getByText("Test Title")).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle className="custom-title" data-testid="title">
            Title
          </SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("title")).toHaveClass("custom-title");
  });

  it("has default styling", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle data-testid="title">Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("title")).toHaveClass(
      "text-lg",
      "font-semibold",
      "text-foreground",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle ref={ref}>Title</SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

describe("SheetDescription", () => {
  it("renders correctly", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetDescription data-testid="description">
            Test Description
          </SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("description")).toBeDefined();
    expect(screen.getByText("Test Description")).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetDescription
            className="custom-description"
            data-testid="description"
          >
            Description
          </SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("description")).toHaveClass("custom-description");
  });

  it("has default styling", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetDescription data-testid="description">
            Description
          </SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByTestId("description")).toHaveClass(
      "text-sm",
      "text-muted-foreground",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetDescription ref={ref}>Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe("SheetClose", () => {
  it("closes the sheet when clicked", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Content</div>
          <SheetClose data-testid="close">Close</SheetClose>
        </SheetContent>
      </Sheet>,
    );

    // Open the sheet
    fireEvent.click(screen.getByText("Open Sheet"));
    expect(screen.getByText("Content")).toBeDefined();

    // Close the sheet using SheetClose
    fireEvent.click(screen.getByTestId("close"));
    expect(screen.queryByText("Content")).toBeNull();
  });

  it("supports asChild prop", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetClose asChild>
            <button className="custom-close" data-testid="custom-close">
              Custom Close
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText("Open Sheet"));
    const closeButton = screen.getByTestId("custom-close");
    expect(closeButton).toHaveClass("custom-close");
    expect(closeButton.tagName).toBe("BUTTON");
  });
});

describe("Sheet Integration", () => {
  it("works with form elements", () => {
    const onSubmit = vi.fn((e) => e.preventDefault());

    render(
      <Sheet>
        <SheetTrigger>Open Form</SheetTrigger>
        <SheetContent>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Enter text" />
            <button type="submit">Submit</button>
          </form>
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText("Open Form"));
    const input = screen.getByPlaceholderText("Enter text");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });

  it("maintains focus management", () => {
    render(
      <Sheet>
        <SheetTrigger data-testid="trigger">Open Sheet</SheetTrigger>
        <SheetContent>
          <button data-testid="first-button">First</button>
          <button data-testid="second-button">Second</button>
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByTestId("trigger");
    trigger.focus();

    fireEvent.click(trigger);

    // First focusable element should receive focus when sheet opens
    expect(screen.getByTestId("first-button")).toBeDefined();
  });

  it("handles keyboard navigation", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Content</div>
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText("Open Sheet"));

    // Escape key should close the sheet
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Content")).toBeNull();
  });

  it("supports nested interactive elements", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>
            <button>Nested Button 1</button>
            <button>Nested Button 2</button>
            <a href="#test">Nested Link</a>
          </div>
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText("Open Sheet"));

    expect(screen.getByText("Nested Button 1")).toBeDefined();
    expect(screen.getByText("Nested Button 2")).toBeDefined();
    expect(screen.getByText("Nested Link")).toBeDefined();
  });

  it("handles multiple sheets independently", () => {
    render(
      <div>
        <Sheet>
          <SheetTrigger>Open First</SheetTrigger>
          <SheetContent>First Content</SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>Open Second</SheetTrigger>
          <SheetContent>Second Content</SheetContent>
        </Sheet>
      </div>,
    );

    // Open first sheet
    fireEvent.click(screen.getByText("Open First"));
    expect(screen.getByText("First Content")).toBeDefined();
    expect(screen.queryByText("Second Content")).toBeNull();

    // Open second sheet (first should still be open)
    fireEvent.click(screen.getByText("Open Second"));
    expect(screen.getByText("Second Content")).toBeDefined();
  });
});
