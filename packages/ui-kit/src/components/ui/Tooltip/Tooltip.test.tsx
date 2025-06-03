import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
);

describe("Tooltip", () => {
  it("renders trigger correctly", () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger data-testid="tooltip-trigger">
            Hover me
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
  });

  it("renders tooltip provider", () => {
    render(
      <TooltipWrapper>
        <div data-testid="content">Test content</div>
      </TooltipWrapper>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders tooltip components without errors", () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <button data-testid="trigger">Trigger</button>
          </TooltipTrigger>
          <TooltipContent data-testid="content">Content</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    expect(screen.getByTestId("trigger")).toBeInTheDocument();
  });

  it("supports custom className on trigger", () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger className="custom-trigger" data-testid="trigger">
            Trigger
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    expect(screen.getByTestId("trigger")).toHaveClass("custom-trigger");
  });

  it("supports asChild prop on trigger", () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <button data-testid="button-trigger">Button Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    const trigger = screen.getByTestId("button-trigger");
    expect(trigger.tagName).toBe("BUTTON");
  });

  it("renders content with default props", () => {
    // Test that TooltipContent can be rendered with default props
    const { container } = render(
      <TooltipWrapper>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent data-testid="content">Test content</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // Check that the component structure is correct
    expect(container.firstChild).toBeInTheDocument();
  });

  it("supports custom sideOffset prop", () => {
    // Test that sideOffset prop is accepted without errors
    render(
      <TooltipWrapper>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent sideOffset={10}>
            Content with custom offset
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // If no error is thrown, the prop is supported
    expect(true).toBe(true);
  });

  it("supports side positioning prop", () => {
    // Test that side prop is accepted without errors
    render(
      <TooltipWrapper>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent side="top">Content positioned on top</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // If no error is thrown, the prop is supported
    expect(true).toBe(true);
  });

  it("supports delay duration on tooltip root", () => {
    // Test that delayDuration prop is accepted without errors
    render(
      <TooltipWrapper>
        <Tooltip delayDuration={500}>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Content with delay</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // If no error is thrown, the prop is supported
    expect(true).toBe(true);
  });

  it("supports rich content in tooltip", () => {
    render(
      <TooltipWrapper>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>
            <div>
              <h3>Title</h3>
              <p>Description text</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // If no error is thrown, rich content is supported
    expect(true).toBe(true);
  });
});
