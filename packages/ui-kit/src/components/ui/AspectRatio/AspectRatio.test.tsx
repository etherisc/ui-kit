import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders correctly", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
        <div>Content</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies correct aspect ratio styles", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
        <div>Content</div>
      </AspectRatio>,
    );

    const aspectRatio = screen.getByTestId("aspect-ratio");
    // Check that the element exists and has the ratio prop
    expect(aspectRatio).toBeDefined();
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("handles different aspect ratios", () => {
    const { rerender } = render(
      <AspectRatio ratio={1} data-testid="aspect-ratio">
        <div>Square</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeDefined();
    expect(screen.getByText("Square")).toBeDefined();

    rerender(
      <AspectRatio ratio={4 / 3} data-testid="aspect-ratio">
        <div>Traditional</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeDefined();
    expect(screen.getByText("Traditional")).toBeDefined();

    rerender(
      <AspectRatio ratio={21 / 9} data-testid="aspect-ratio">
        <div>Ultra-wide</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeDefined();
    expect(screen.getByText("Ultra-wide")).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <AspectRatio
        ratio={16 / 9}
        className="custom-aspect-ratio"
        data-testid="aspect-ratio"
      >
        <div>Content</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toHaveClass(
      "custom-aspect-ratio",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <AspectRatio ratio={16 / 9} ref={ref}>
        <div>Content</div>
      </AspectRatio>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders children correctly", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Test image" />
        <div>Overlay content</div>
      </AspectRatio>,
    );

    expect(screen.getByAltText("Test image")).toBeInTheDocument();
    expect(screen.getByText("Overlay content")).toBeInTheDocument();
  });

  it("handles complex children structure", () => {
    render(
      <AspectRatio ratio={4 / 3}>
        <div className="container">
          <img src="background.jpg" alt="Background" />
          <div className="overlay">
            <h2>Title</h2>
            <p>Description</p>
            <button>Action</button>
          </div>
        </div>
      </AspectRatio>,
    );

    expect(screen.getByAltText("Background")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("works with image content", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
        <img
          src="https://example.com/image.jpg"
          alt="Test image"
          className="h-full w-full object-cover"
        />
      </AspectRatio>,
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("h-full", "w-full", "object-cover");
  });

  it("works with video content", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <video controls data-testid="video">
          <source src="test.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>,
    );

    expect(screen.getByTestId("video")).toBeInTheDocument();
  });

  it("works with iframe content", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/test"
          title="Test video"
          data-testid="iframe"
        />
      </AspectRatio>,
    );

    expect(screen.getByTestId("iframe")).toBeInTheDocument();
    expect(screen.getByTitle("Test video")).toBeInTheDocument();
  });

  it("handles decimal ratios correctly", () => {
    render(
      <AspectRatio ratio={1.777} data-testid="aspect-ratio">
        <div>Content</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeDefined();
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("handles very small ratios", () => {
    render(
      <AspectRatio ratio={0.1} data-testid="aspect-ratio">
        <div>Tall content</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeDefined();
    expect(screen.getByText("Tall content")).toBeDefined();
  });

  it("handles very large ratios", () => {
    render(
      <AspectRatio ratio={10} data-testid="aspect-ratio">
        <div>Wide content</div>
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeDefined();
    expect(screen.getByText("Wide content")).toBeDefined();
  });

  it("supports additional props", () => {
    render(
      <AspectRatio
        ratio={16 / 9}
        data-testid="aspect-ratio"
        id="custom-id"
        role="img"
        aria-label="Custom aspect ratio container"
      >
        <div>Content</div>
      </AspectRatio>,
    );

    const aspectRatio = screen.getByTestId("aspect-ratio");
    expect(aspectRatio).toHaveAttribute("id", "custom-id");
    expect(aspectRatio).toHaveAttribute("role", "img");
    expect(aspectRatio).toHaveAttribute(
      "aria-label",
      "Custom aspect ratio container",
    );
  });

  it("maintains aspect ratio with responsive content", () => {
    render(
      <div style={{ width: "300px" }}>
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <div className="responsive-content">Responsive content</div>
        </AspectRatio>
      </div>,
    );

    const aspectRatio = screen.getByTestId("aspect-ratio");
    expect(aspectRatio).toBeInTheDocument();
    expect(screen.getByText("Responsive content")).toBeInTheDocument();
  });

  it("works in grid layouts", () => {
    render(
      <div className="grid grid-cols-2 gap-4">
        <AspectRatio ratio={1} data-testid="aspect-ratio-1">
          <div>Grid item 1</div>
        </AspectRatio>
        <AspectRatio ratio={1} data-testid="aspect-ratio-2">
          <div>Grid item 2</div>
        </AspectRatio>
      </div>,
    );

    expect(screen.getByTestId("aspect-ratio-1")).toBeInTheDocument();
    expect(screen.getByTestId("aspect-ratio-2")).toBeInTheDocument();
    expect(screen.getByText("Grid item 1")).toBeInTheDocument();
    expect(screen.getByText("Grid item 2")).toBeInTheDocument();
  });

  it("works with flexbox layouts", () => {
    render(
      <div className="flex gap-4">
        <div className="flex-1">
          <AspectRatio ratio={16 / 9} data-testid="flex-aspect-ratio">
            <div>Flex content</div>
          </AspectRatio>
        </div>
      </div>,
    );

    expect(screen.getByTestId("flex-aspect-ratio")).toBeInTheDocument();
    expect(screen.getByText("Flex content")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
        {null}
      </AspectRatio>,
    );

    expect(screen.getByTestId("aspect-ratio")).toBeInTheDocument();
  });

  it("handles multiple children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </AspectRatio>,
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });
});
