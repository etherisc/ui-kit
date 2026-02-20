import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No data found" />);
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState title="Empty" description="Try adjusting your filters" />,
    );
    expect(screen.getByText("Try adjusting your filters")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    render(
      <EmptyState title="Empty" action={<button>Add item</button>} />,
    );
    expect(screen.getByText("Add item")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <EmptyState
        title="Empty"
        icon={<svg data-testid="icon" />}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
