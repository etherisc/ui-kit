import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with status role and label", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("h-4", "w-4");

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("h-10", "w-10");
  });

  it("accepts custom label", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Saving");
  });
});
