import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("should render children content", () => {
    render(<StatusBadge>Active</StatusBadge>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("should apply neutral variant styling by default", () => {
    render(<StatusBadge>Default</StatusBadge>);

    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-secondary");
    expect(badge).toHaveClass("text-secondary-foreground");
  });

  it("should apply correct variant styling for success", () => {
    render(<StatusBadge variant="success">Success</StatusBadge>);

    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-success");
    expect(badge).toHaveClass("text-success-foreground");
  });

  it("should apply correct variant styling for error", () => {
    render(<StatusBadge variant="error">Error</StatusBadge>);

    const badge = screen.getByText("Error");
    expect(badge).toHaveClass("bg-error");
    expect(badge).toHaveClass("text-error-foreground");
  });

  it("should apply correct variant styling for warning", () => {
    render(<StatusBadge variant="warning">Warning</StatusBadge>);

    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-warning");
    expect(badge).toHaveClass("text-warning-foreground");
  });

  it("should apply correct variant styling for info", () => {
    render(<StatusBadge variant="info">Info</StatusBadge>);

    const badge = screen.getByText("Info");
    expect(badge).toHaveClass("bg-info");
    expect(badge).toHaveClass("text-info-foreground");
  });

  it("should apply correct variant styling for pending", () => {
    render(<StatusBadge variant="pending">Pending</StatusBadge>);

    const badge = screen.getByText("Pending");
    expect(badge).toHaveClass("bg-muted");
    expect(badge).toHaveClass("text-muted-foreground");
  });

  it("should apply base styling classes", () => {
    render(<StatusBadge>Test</StatusBadge>);

    const badge = screen.getByText("Test");
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("items-center");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("px-2.5");
    expect(badge).toHaveClass("py-0.5");
    expect(badge).toHaveClass("text-xs");
    expect(badge).toHaveClass("font-medium");
  });

  it("should accept custom className", () => {
    render(<StatusBadge className="custom-class">Custom</StatusBadge>);

    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-class");
  });

  it("should pass through additional props", () => {
    render(<StatusBadge data-testid="custom-badge">Test</StatusBadge>);

    const badge = screen.getByTestId("custom-badge");
    expect(badge).toBeInTheDocument();
  });

  it("should render as a span element", () => {
    render(<StatusBadge>Test</StatusBadge>);

    const badge = screen.getByText("Test");
    expect(badge.tagName).toBe("SPAN");
  });

  it("should support complex children content", () => {
    render(
      <StatusBadge>
        <span>Status:</span> Active
      </StatusBadge>,
    );

    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
