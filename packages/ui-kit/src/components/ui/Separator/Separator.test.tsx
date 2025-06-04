import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders correctly", () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Separator className="custom-class" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveClass("custom-class");
  });

  it("renders horizontal orientation by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
    expect(separator).toHaveClass("h-[1px]", "w-full");
  });

  it("renders vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator).toHaveClass("h-full", "w-[1px]");
  });

  it("is decorative by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("role", "none");
  });

  it("can be non-decorative", () => {
    render(<Separator decorative={false} data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("has proper base styling", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("shrink-0", "bg-border");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
