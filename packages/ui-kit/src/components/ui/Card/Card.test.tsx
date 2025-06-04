import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

describe("Card", () => {
  it("renders correctly", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test description</CardDescription>
        </CardHeader>
        <CardContent>Test content</CardContent>
        <CardFooter>Test footer</CardFooter>
      </Card>,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(screen.getByText("Test footer")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Card className="custom-class" data-testid="card" />);

    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });

  it("renders card header with title and description", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description goes here")).toBeInTheDocument();
  });

  it("renders card content", () => {
    render(
      <Card>
        <CardContent>This is the card content</CardContent>
      </Card>,
    );

    expect(screen.getByText("This is the card content")).toBeInTheDocument();
  });

  it("renders card footer", () => {
    render(
      <Card>
        <CardFooter>This is the card footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("This is the card footer")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Card ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has proper ARIA semantics", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Accessible Card</CardTitle>
        </CardHeader>
      </Card>,
    );

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    // Card should be a div that can be navigated to
    expect(card.tagName).toBe("DIV");
  });
});
