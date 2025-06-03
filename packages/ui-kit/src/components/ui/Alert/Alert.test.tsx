import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Terminal, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

describe("Alert", () => {
  it("renders correctly", () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>,
    );

    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Default Alert</AlertTitle>
      </Alert>,
    );

    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("bg-background", "text-foreground");
  });

  it("renders with destructive variant", () => {
    render(
      <Alert variant="destructive" data-testid="alert">
        <AlertTitle>Error Alert</AlertTitle>
      </Alert>,
    );

    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("border-destructive/50", "text-destructive");
  });

  it("renders with icon", () => {
    render(
      <Alert data-testid="alert">
        <Terminal className="h-4 w-4" data-testid="icon" />
        <AlertTitle>Alert with Icon</AlertTitle>
      </Alert>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Alert with Icon")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <Alert data-testid="alert">
        <AlertDescription>Description only</AlertDescription>
      </Alert>,
    );

    expect(screen.getByText("Description only")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders without description", () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Title only</AlertTitle>
      </Alert>,
    );

    expect(screen.getByText("Title only")).toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(
      <Alert className="custom-alert" data-testid="alert">
        <AlertTitle className="custom-title" data-testid="title">
          Title
        </AlertTitle>
        <AlertDescription
          className="custom-description"
          data-testid="description"
        >
          Description
        </AlertDescription>
      </Alert>,
    );

    expect(screen.getByTestId("alert")).toHaveClass("custom-alert");
    expect(screen.getByTestId("title")).toHaveClass("custom-title");
    expect(screen.getByTestId("description")).toHaveClass("custom-description");
  });

  it("forwards refs correctly", () => {
    const alertRef = { current: null };
    const titleRef = { current: null };
    const descriptionRef = { current: null };

    render(
      <Alert ref={alertRef}>
        <AlertTitle ref={titleRef}>Title</AlertTitle>
        <AlertDescription ref={descriptionRef}>Description</AlertDescription>
      </Alert>,
    );

    expect(alertRef.current).toBeInstanceOf(HTMLDivElement);
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(descriptionRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has proper accessibility attributes", () => {
    render(
      <Alert data-testid="alert">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Alert</AlertTitle>
        <AlertDescription>This is important information.</AlertDescription>
      </Alert>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("role", "alert");
  });

  it("renders complex content correctly", () => {
    render(
      <Alert>
        <AlertTitle>Complex Alert</AlertTitle>
        <AlertDescription>
          This alert contains <strong>bold text</strong> and{" "}
          <em>italic text</em>.
        </AlertDescription>
      </Alert>,
    );

    expect(screen.getByText("Complex Alert")).toBeInTheDocument();
    expect(screen.getByText("bold text")).toBeInTheDocument();
    expect(screen.getByText("italic text")).toBeInTheDocument();
  });
});
