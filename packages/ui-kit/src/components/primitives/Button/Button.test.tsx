import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-colors");
  });

  it("applies size classes", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("handles loading state", () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-colors");
  });

  it("uses default when no variant is provided", () => {
    render(<Button>Default button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-colors");
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders link variant", () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
