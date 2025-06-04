import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders correctly", () => {
    render(<Progress value={50} data-testid="progress" />);

    expect(screen.getByTestId("progress")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays correct progress value", () => {
    render(<Progress value={75} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "75");
  });

  it("handles zero progress", () => {
    render(<Progress value={0} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "0");
  });

  it("handles complete progress", () => {
    render(<Progress value={100} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  });

  it("handles indeterminate state", () => {
    render(<Progress value={null} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).not.toHaveAttribute("aria-valuenow");
  });

  it("handles undefined value", () => {
    render(<Progress />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).not.toHaveAttribute("aria-valuenow");
  });

  it("supports custom className", () => {
    render(
      <Progress
        value={50}
        className="custom-progress"
        data-testid="progress"
      />,
    );

    expect(screen.getByTestId("progress")).toHaveClass("custom-progress");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Progress ref={ref} value={50} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has proper accessibility attributes", () => {
    render(<Progress value={60} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("role", "progressbar");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-valuenow", "60");
  });

  it("renders with default styling", () => {
    render(<Progress value={50} data-testid="progress" />);

    const progress = screen.getByTestId("progress");
    expect(progress).toHaveClass(
      "relative",
      "h-4",
      "w-full",
      "overflow-hidden",
      "rounded-full",
      "bg-secondary",
    );
  });

  it("supports additional props", () => {
    render(
      <Progress
        value={50}
        data-testid="progress"
        aria-label="Upload progress"
        id="upload-progress"
      />,
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-label", "Upload progress");
    expect(progressbar).toHaveAttribute("id", "upload-progress");
  });

  it("renders indicator with correct transform", () => {
    const { container } = render(<Progress value={75} />);

    // Check that the indicator exists (it's a child of the progress root)
    const indicator = container.querySelector('[style*="transform"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveStyle("transform: translateX(-25%)");
  });

  it("handles edge cases for value", () => {
    const { rerender } = render(<Progress value={-10} />);

    // Radix Progress validates values and defaults invalid ones to null (indeterminate)
    let progressbar = screen.getByRole("progressbar");
    expect(progressbar).not.toHaveAttribute("aria-valuenow");

    rerender(<Progress value={150} />);
    progressbar = screen.getByRole("progressbar");
    // Values above 100 should also be invalid and default to null
    expect(progressbar).not.toHaveAttribute("aria-valuenow");
  });
});
