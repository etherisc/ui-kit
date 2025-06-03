import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders correctly", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Badge className="custom-class" data-testid="badge">
        Test
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("custom-class");
  });

  it("renders default variant", () => {
    render(
      <Badge data-testid="badge" variant="default">
        Default
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-primary");
  });

  it("renders secondary variant", () => {
    render(
      <Badge data-testid="badge" variant="secondary">
        Secondary
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-secondary");
  });

  it("renders destructive variant", () => {
    render(
      <Badge data-testid="badge" variant="destructive">
        Destructive
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-destructive");
  });

  it("renders outline variant", () => {
    render(
      <Badge data-testid="badge" variant="outline">
        Outline
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-foreground");
  });

  it("supports custom content", () => {
    render(
      <Badge>
        <span>🎉</span>
        Custom Content
      </Badge>,
    );
    expect(screen.getByText("🎉")).toBeInTheDocument();
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(
      <Badge data-testid="badge" role="status">
        Status Badge
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("role", "status");
  });
});
