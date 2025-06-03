import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders correctly", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders with default classes", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("supports custom className", () => {
    render(
      <Skeleton className="h-4 w-full custom-class" data-testid="skeleton" />,
    );

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-muted",
      "h-4",
      "w-full",
      "custom-class",
    );
  });

  it("supports additional props", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        id="test-skeleton"
        role="img"
        aria-label="Loading content"
      />,
    );

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveAttribute("id", "test-skeleton");
    expect(skeleton).toHaveAttribute("role", "img");
    expect(skeleton).toHaveAttribute("aria-label", "Loading content");
  });

  it("supports inline styles", () => {
    const style = { width: "200px", height: "50px" };
    render(<Skeleton style={style} data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle("width: 200px");
    expect(skeleton).toHaveStyle("height: 50px");
  });

  it("renders as a div element", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.tagName).toBe("DIV");
  });

  it("handles different size classes", () => {
    const { rerender } = render(
      <Skeleton className="h-4 w-[250px]" data-testid="skeleton" />,
    );

    let skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-4", "w-[250px]");

    rerender(<Skeleton className="h-12 w-12" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-12", "w-12");
  });

  it("handles different shape classes", () => {
    const { rerender } = render(
      <Skeleton className="rounded-full" data-testid="skeleton" />,
    );

    let skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded-full");

    rerender(<Skeleton className="rounded-lg" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded-lg");
  });

  it("supports event handlers", () => {
    const handleClick = vi.fn();
    render(<Skeleton onClick={handleClick} data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    skeleton.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges className correctly", () => {
    render(
      <Skeleton
        className="bg-red-500 h-8 w-32 rounded-none"
        data-testid="skeleton"
      />,
    );

    const skeleton = screen.getByTestId("skeleton");
    // Should have both default and custom classes
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("bg-red-500");
    expect(skeleton).toHaveClass("h-8");
    expect(skeleton).toHaveClass("w-32");
    expect(skeleton).toHaveClass("rounded-none");
  });

  it("supports accessibility attributes", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        aria-hidden="true"
        role="presentation"
      />,
    );

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveAttribute("role", "presentation");
  });
});
