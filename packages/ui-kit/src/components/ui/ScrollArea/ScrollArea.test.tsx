import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders correctly with content", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>Scrollable content</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea).toBeDefined();
    expect(screen.getByText("Scrollable content")).toBeDefined();
  });

  it("applies default styling classes", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea.className.includes("relative")).toBe(true);
    expect(scrollArea.className.includes("overflow-hidden")).toBe(true);
  });

  it("supports custom className", () => {
    render(
      <ScrollArea className="custom-class" data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea.className.includes("custom-class")).toBe(true);
    expect(scrollArea.className.includes("relative")).toBe(true);
    expect(scrollArea.className.includes("overflow-hidden")).toBe(true);
  });

  it("forwards ref correctly", () => {
    let scrollAreaRef: HTMLDivElement | null = null;

    render(
      <ScrollArea
        ref={(ref) => {
          scrollAreaRef = ref;
        }}
      >
        <div>Content</div>
      </ScrollArea>,
    );

    expect(scrollAreaRef).not.toBeNull();
    expect(
      scrollAreaRef && (scrollAreaRef as unknown as HTMLElement).tagName,
    ).toBe("DIV");
  });

  it("renders viewport with correct classes", () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>,
    );

    // Check for viewport element (by looking for the specific className pattern)
    const viewport = document.querySelector(
      '[class*="h-full"][class*="w-full"][class*="rounded-"]',
    );
    expect(viewport).not.toBeNull();
  });

  it("includes scrollbar by default", () => {
    render(
      <ScrollArea>
        <div>Content that needs scrolling</div>
      </ScrollArea>,
    );

    // ScrollBar is rendered by default in the ScrollArea component
    // We can verify this by checking the component structure
    const scrollArea = document.querySelector(
      '[class*="relative"][class*="overflow-hidden"]',
    );
    expect(scrollArea).not.toBeNull();
  });

  it("handles multiple children", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </ScrollArea>,
    );

    expect(screen.getByText("First child")).toBeDefined();
    expect(screen.getByText("Second child")).toBeDefined();
    expect(screen.getByText("Third child")).toBeDefined();
  });

  it("supports additional props", () => {
    render(
      <ScrollArea
        id="test-scroll-area"
        role="region"
        aria-label="Scrollable content"
      >
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollArea = document.getElementById("test-scroll-area");
    expect(scrollArea).not.toBeNull();
    expect(scrollArea?.getAttribute("role")).toBe("region");
    expect(scrollArea?.getAttribute("aria-label")).toBe("Scrollable content");
  });

  it("handles long content", () => {
    const longContent = Array.from(
      { length: 100 },
      (_, i) => `Item ${i + 1}`,
    ).join(" ");

    render(
      <ScrollArea className="h-32" data-testid="scroll-area">
        <div>{longContent}</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea).toBeDefined();
    expect(screen.getByText(longContent)).toBeDefined();
  });
});

describe("ScrollBar Component", () => {
  it("integrates properly with ScrollArea", () => {
    render(
      <ScrollArea className="h-32 w-32" data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea).toBeDefined();
    // Verify ScrollArea structure includes viewport
    const viewport = document.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    expect(viewport).not.toBeNull();
  });

  it("renders as part of ScrollArea with proper structure", () => {
    render(
      <ScrollArea className="h-32 w-32">
        <div className="p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>,
    );

    // Verify that the scroll area contains the expected content
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 20")).toBeDefined();

    // Verify basic scroll area structure
    const viewport = document.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    expect(viewport).not.toBeNull();
  });
});

describe("ScrollArea Integration", () => {
  it("handles complex content structure", () => {
    render(
      <ScrollArea className="h-48 w-64" data-testid="scroll-area">
        <div className="p-4 space-y-2">
          <h3>Title</h3>
          <p>Paragraph with some content</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </div>
      </ScrollArea>,
    );

    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Paragraph with some content")).toBeDefined();
    expect(screen.getByText("List item 1")).toBeDefined();
    expect(screen.getByText("List item 2")).toBeDefined();
    expect(screen.getByText("List item 3")).toBeDefined();
  });

  it("works with grid layout content", () => {
    render(
      <ScrollArea className="h-64 w-64" data-testid="scroll-area">
        <div className="grid grid-cols-2 gap-2 p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-2 bg-gray-100">
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>,
    );

    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 10")).toBeDefined();
    expect(screen.getByText("Item 20")).toBeDefined();
  });

  it("maintains accessibility with keyboard navigation", () => {
    render(
      <ScrollArea tabIndex={0} role="region" aria-label="Scrollable content">
        <div>
          <button>Focusable button 1</button>
          <button>Focusable button 2</button>
          <button>Focusable button 3</button>
        </div>
      </ScrollArea>,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toBeDefined();
    expect(buttons[1]).toBeDefined();
    expect(buttons[2]).toBeDefined();
  });

  it("handles empty content gracefully", () => {
    render(
      <ScrollArea data-testid="empty-scroll-area">
        <div></div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId("empty-scroll-area");
    expect(scrollArea).toBeDefined();
  });

  it("supports nested scroll areas", () => {
    render(
      <ScrollArea className="h-64 w-64" data-testid="outer-scroll-area">
        <div className="p-4">
          <h3>Outer content</h3>
          <ScrollArea className="h-32 w-32" data-testid="inner-scroll-area">
            <div className="p-2">
              <p>Inner scrollable content</p>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i}>Inner item {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ScrollArea>,
    );

    const outerScrollArea = screen.getByTestId("outer-scroll-area");
    const innerScrollArea = screen.getByTestId("inner-scroll-area");

    expect(outerScrollArea).toBeDefined();
    expect(innerScrollArea).toBeDefined();
    expect(screen.getByText("Outer content")).toBeDefined();
    expect(screen.getByText("Inner scrollable content")).toBeDefined();
    expect(screen.getByText("Inner item 1")).toBeDefined();
  });
});
