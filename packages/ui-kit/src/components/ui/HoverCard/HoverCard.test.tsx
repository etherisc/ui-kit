import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "./HoverCard";

describe("HoverCard", () => {
  it("renders correctly with trigger and content", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard>
        <HoverCardTrigger>
          <button>Hover me</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Hover content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    expect(trigger).toBeDefined();

    // Content should not be visible initially
    expect(screen.queryByText("Hover content")).toBeNull();

    // Hover over the trigger
    await user.hover(trigger);

    // Content should appear
    await waitFor(() => {
      expect(screen.getByText("Hover content")).toBeDefined();
    });
  });

  it("shows and hides content on hover", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <button>Hover trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Content to show</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", { name: "Hover trigger" });

    // Initially not visible
    expect(screen.queryByText("Content to show")).toBeNull();

    // Hover to show
    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.getByText("Content to show")).toBeDefined();
    });

    // Unhover to hide
    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByText("Content to show")).toBeNull();
    });
  });

  it("supports controlled open state", () => {
    const { rerender } = render(
      <HoverCard open={false}>
        <HoverCardTrigger>
          <button>Controlled trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Controlled content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    // Content should not be visible when open=false
    expect(screen.queryByText("Controlled content")).toBeNull();

    // Re-render with open=true
    rerender(
      <HoverCard open={true}>
        <HoverCardTrigger>
          <button>Controlled trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Controlled content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    // Content should be visible when open=true
    expect(screen.getByText("Controlled content")).toBeDefined();
  });

  it("supports custom timing delays", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger>
          <button>Delayed trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Delayed content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", { name: "Delayed trigger" });

    await user.hover(trigger);

    // Content should not appear immediately
    expect(screen.queryByText("Delayed content")).toBeNull();

    // Wait for the delay
    await waitFor(
      () => {
        expect(screen.getByText("Delayed content")).toBeDefined();
      },
      { timeout: 200 },
    );
  });

  it("supports asChild prop on trigger", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <div role="button" tabIndex={0}>
            Custom trigger element
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>AsChild content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", {
      name: "Custom trigger element",
    });
    expect(trigger.tagName).toBe("DIV");

    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.getByText("AsChild content")).toBeDefined();
    });
  });
});

describe("HoverCardContent", () => {
  it("renders with default styling classes", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent data-testid="hover-content">
          <div>Content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      const content = screen.getByTestId("hover-content");
      expect(content.className.includes("z-50")).toBe(true);
      expect(content.className.includes("w-64")).toBe(true);
      expect(content.className.includes("rounded-md")).toBe(true);
      expect(content.className.includes("border")).toBe(true);
      expect(content.className.includes("bg-popover")).toBe(true);
      expect(content.className.includes("p-4")).toBe(true);
      expect(content.className.includes("text-popover-foreground")).toBe(true);
      expect(content.className.includes("shadow-md")).toBe(true);
    });
  });

  it("supports custom className", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent className="custom-class" data-testid="hover-content">
          <div>Content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      const content = screen.getByTestId("hover-content");
      expect(content.className.includes("custom-class")).toBe(true);
    });
  });

  it("supports different side positions", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent side="top" data-testid="hover-content">
          <div>Top content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Top content")).toBeDefined();
    });

    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByText("Top content")).toBeNull();
    });

    // Test different sides
    const sides = ["right", "bottom", "left"] as const;

    for (const side of sides) {
      rerender(
        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <button>Trigger</button>
          </HoverCardTrigger>
          <HoverCardContent side={side} data-testid="hover-content">
            <div>{side} content</div>
          </HoverCardContent>
        </HoverCard>,
      );

      await user.hover(trigger);
      await waitFor(() => {
        expect(screen.getByText(`${side} content`)).toBeDefined();
      });
      await user.unhover(trigger);
      await waitFor(() => {
        expect(screen.queryByText(`${side} content`)).toBeNull();
      });
    }
  });

  it("supports align prop", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent align="start" data-testid="hover-content">
          <div>Aligned content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Aligned content")).toBeDefined();
    });
  });

  it("supports sideOffset prop", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={10} data-testid="hover-content">
          <div>Offset content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Offset content")).toBeDefined();
    });
  });

  it("forwards ref correctly", async () => {
    const user = userEvent.setup();
    let contentRef: HTMLDivElement | null = null;

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent
          ref={(ref) => {
            contentRef = ref;
          }}
        >
          <div>Ref content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(contentRef).not.toBeNull();
      expect(contentRef?.tagName).toBe("DIV");
    });
  });
});

describe("HoverCardArrow", () => {
  it("renders arrow component", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow data-testid="hover-arrow" />
          <div>Content with arrow</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      const arrow = screen.getByTestId("hover-arrow");
      expect(arrow).toBeDefined();
      expect(arrow.tagName).toBe("svg");
    });
  });

  it("applies default styling to arrow", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow data-testid="hover-arrow" />
          <div>Content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      const arrow = screen.getByTestId("hover-arrow");
      expect(arrow.getAttribute("class")).toContain("fill-popover");
    });
  });

  it("supports custom className on arrow", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow className="custom-arrow" data-testid="hover-arrow" />
          <div>Content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      const arrow = screen.getByTestId("hover-arrow");
      expect(arrow.getAttribute("class")).toContain("custom-arrow");
      expect(arrow.getAttribute("class")).toContain("fill-popover");
    });
  });

  it("forwards ref correctly for arrow", async () => {
    const user = userEvent.setup();
    let arrowRef: SVGSVGElement | null = null;

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow
            ref={(ref) => {
              arrowRef = ref;
            }}
          />
          <div>Content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(arrowRef).not.toBeNull();
      expect(arrowRef?.tagName).toBe("svg");
    });
  });
});

describe("HoverCard Integration", () => {
  it("handles complex content structure", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <button>
            <span>Complex trigger</span>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">User Profile</h4>
            <p className="text-sm text-muted-foreground">
              This is a complex hover card with multiple elements.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs">Status:</span>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", { name: "Complex trigger" });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("User Profile")).toBeDefined();
      expect(
        screen.getByText(
          "This is a complex hover card with multiple elements.",
        ),
      ).toBeDefined();
      expect(screen.getByText("Status:")).toBeDefined();
      expect(screen.getByText("Online")).toBeDefined();
    });
  });

  it("supports keyboard navigation", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>Keyboard trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Keyboard accessible content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", { name: "Keyboard trigger" });

    // Should be focusable
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
  });

  it("handles multiple hover cards", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <button>First trigger</button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div>First content</div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <button>Second trigger</button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div>Second content</div>
          </HoverCardContent>
        </HoverCard>
      </div>,
    );

    const firstTrigger = screen.getByRole("button", { name: "First trigger" });
    const secondTrigger = screen.getByRole("button", {
      name: "Second trigger",
    });

    // Hover first
    await user.hover(firstTrigger);
    await waitFor(() => {
      expect(screen.getByText("First content")).toBeDefined();
    });

    // Hover second
    await user.hover(secondTrigger);
    await waitFor(() => {
      expect(screen.getByText("Second content")).toBeDefined();
    });

    // Both should be able to be visible (depending on implementation)
    expect(screen.getByText("First content")).toBeDefined();
    expect(screen.getByText("Second content")).toBeDefined();
  });

  it("handles event callbacks", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <HoverCard openDelay={0} closeDelay={0} onOpenChange={onOpenChange}>
        <HoverCardTrigger>
          <button>Callback trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>Callback content</div>
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("button", { name: "Callback trigger" });

    await user.hover(trigger);
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    await user.unhover(trigger);
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
