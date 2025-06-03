import * as React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import {
  Typography,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from "./Typography";

describe("Typography", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Typography data-testid="typography">Default text</Typography>);

      const element = screen.getByTestId("typography");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("P");
      expect(element).toHaveTextContent("Default text");
    });

    it("renders children correctly", () => {
      render(
        <Typography data-testid="typography">
          <span>Child content</span>
        </Typography>,
      );

      expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Typography className="custom-class" data-testid="typography">
          Text
        </Typography>,
      );

      expect(screen.getByTestId("typography")).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Typography ref={ref}>Text</Typography>);

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe("Variants", () => {
    it("renders h1 variant with correct element and classes", () => {
      render(
        <Typography variant="h1" data-testid="h1">
          Heading 1
        </Typography>,
      );

      const element = screen.getByTestId("h1");
      expect(element.tagName).toBe("H1");
      expect(element).toHaveClass(
        "scroll-m-20",
        "text-4xl",
        "tracking-tight",
        "lg:text-5xl",
      );
    });

    it("renders h2 variant with correct element and classes", () => {
      render(
        <Typography variant="h2" data-testid="h2">
          Heading 2
        </Typography>,
      );

      const element = screen.getByTestId("h2");
      expect(element.tagName).toBe("H2");
      expect(element).toHaveClass(
        "scroll-m-20",
        "border-b",
        "pb-2",
        "text-3xl",
        "tracking-tight",
      );
    });

    it("renders h3 variant with correct element and classes", () => {
      render(
        <Typography variant="h3" data-testid="h3">
          Heading 3
        </Typography>,
      );

      const element = screen.getByTestId("h3");
      expect(element.tagName).toBe("H3");
      expect(element).toHaveClass("scroll-m-20", "text-2xl", "tracking-tight");
    });

    it("renders blockquote variant with correct element", () => {
      render(
        <Typography variant="blockquote" data-testid="blockquote">
          Quote
        </Typography>,
      );

      const element = screen.getByTestId("blockquote");
      expect(element.tagName).toBe("BLOCKQUOTE");
      expect(element).toHaveClass("border-l-2", "italic");
    });

    it("renders list variant with correct element", () => {
      render(
        <Typography variant="list" data-testid="list">
          List content
        </Typography>,
      );

      const element = screen.getByTestId("list");
      expect(element.tagName).toBe("UL");
      expect(element).toHaveClass("list-disc");
    });

    it("renders inlineCode variant with correct element", () => {
      render(
        <Typography variant="inlineCode" data-testid="code">
          Code
        </Typography>,
      );

      const element = screen.getByTestId("code");
      expect(element.tagName).toBe("CODE");
      expect(element).toHaveClass("font-mono", "bg-muted");
    });

    it("renders lead variant with correct classes", () => {
      render(
        <Typography variant="lead" data-testid="lead">
          Lead text
        </Typography>,
      );

      const element = screen.getByTestId("lead");
      expect(element).toHaveClass("text-xl", "text-muted-foreground");
    });

    it("renders large variant with correct classes", () => {
      render(
        <Typography variant="large" data-testid="large">
          Large text
        </Typography>,
      );

      expect(screen.getByTestId("large")).toHaveClass("text-lg");
    });

    it("renders small variant with correct classes", () => {
      render(
        <Typography variant="small" data-testid="small">
          Small text
        </Typography>,
      );

      expect(screen.getByTestId("small")).toHaveClass(
        "text-sm",
        "leading-none",
      );
    });

    it("renders muted variant with correct classes", () => {
      render(
        <Typography variant="muted" data-testid="muted">
          Muted text
        </Typography>,
      );

      expect(screen.getByTestId("muted")).toHaveClass(
        "text-sm",
        "text-muted-foreground",
      );
    });
  });

  describe("Color Variants", () => {
    const colors = [
      "default",
      "primary",
      "secondary",
      "muted",
      "destructive",
      "accent",
      "success",
      "warning",
      "info",
    ] as const;

    colors.forEach((color) => {
      it(`applies ${color} color correctly`, () => {
        render(
          <Typography color={color} data-testid={`color-${color}`}>
            Text
          </Typography>,
        );

        const element = screen.getByTestId(`color-${color}`);
        if (color === "default") {
          // Default color doesn't add a color class, but alignment class is still present
          expect(element).toHaveClass("text-left");
          expect(element).not.toHaveClass(
            "text-primary",
            "text-secondary",
            "text-muted-foreground",
          );
        } else {
          expect(element).toHaveClass(
            `text-${color === "secondary" ? "secondary-foreground" : color === "muted" ? "muted-foreground" : color === "success" ? "success-foreground" : color === "warning" ? "warning-foreground" : color === "info" ? "info-foreground" : color === "accent" ? "accent-foreground" : color}`,
          );
        }
      });
    });
  });

  describe("Text Alignment", () => {
    const alignments = ["left", "center", "right", "justify"] as const;

    alignments.forEach((align) => {
      it(`applies ${align} alignment correctly`, () => {
        render(
          <Typography align={align} data-testid={`align-${align}`}>
            Text
          </Typography>,
        );

        expect(screen.getByTestId(`align-${align}`)).toHaveClass(
          `text-${align}`,
        );
      });
    });
  });

  describe("Font Weights", () => {
    const weights = [
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
    ] as const;

    weights.forEach((weight) => {
      it(`applies ${weight} weight correctly`, () => {
        render(
          <Typography weight={weight} data-testid={`weight-${weight}`}>
            Text
          </Typography>,
        );

        expect(screen.getByTestId(`weight-${weight}`)).toHaveClass(
          `font-${weight}`,
        );
      });
    });
  });

  describe("Truncation", () => {
    it("applies truncate class when truncate is true", () => {
      render(
        <Typography truncate data-testid="truncated">
          Long text
        </Typography>,
      );

      expect(screen.getByTestId("truncated")).toHaveClass("truncate");
    });

    it("does not apply truncate class when truncate is false", () => {
      render(
        <Typography truncate={false} data-testid="not-truncated">
          Text
        </Typography>,
      );

      expect(screen.getByTestId("not-truncated")).not.toHaveClass("truncate");
    });
  });

  describe("Custom Element (as prop)", () => {
    it("renders custom element with as prop", () => {
      render(
        <Typography as="span" data-testid="custom">
          Custom element
        </Typography>,
      );

      const element = screen.getByTestId("custom");
      expect(element.tagName).toBe("SPAN");
    });

    it("overrides default element for variant", () => {
      render(
        <Typography variant="h1" as="div" data-testid="custom-h1">
          Heading as div
        </Typography>,
      );

      const element = screen.getByTestId("custom-h1");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("scroll-m-20", "text-4xl", "tracking-tight");
    });
  });

  describe("AsChild Prop", () => {
    it("renders child element when asChild is true", () => {
      render(
        <Typography asChild data-testid="as-child">
          <button type="button">Button with typography styles</button>
        </Typography>,
      );

      const element = screen.getByTestId("as-child");
      expect(element.tagName).toBe("BUTTON");
      expect(element).toHaveAttribute("type", "button");
    });

    it("applies typography classes to child element", () => {
      render(
        <Typography variant="h2" color="primary" asChild>
          <a href="#test" data-testid="styled-link">
            Styled link
          </a>
        </Typography>,
      );

      const element = screen.getByTestId("styled-link");
      expect(element.tagName).toBe("A");
      expect(element).toHaveClass(
        "scroll-m-20",
        "border-b",
        "pb-2",
        "text-3xl",
        "tracking-tight",
        "text-primary",
      );
      expect(element).toHaveAttribute("href", "#test");
    });
  });

  describe("Specific Typography Components", () => {
    const specificComponents = [
      { Component: TypographyH1, expectedTag: "H1", testId: "h1-specific" },
      { Component: TypographyH2, expectedTag: "H2", testId: "h2-specific" },
      { Component: TypographyH3, expectedTag: "H3", testId: "h3-specific" },
      { Component: TypographyH4, expectedTag: "H4", testId: "h4-specific" },
      { Component: TypographyH5, expectedTag: "H5", testId: "h5-specific" },
      { Component: TypographyH6, expectedTag: "H6", testId: "h6-specific" },
      { Component: TypographyP, expectedTag: "P", testId: "p-specific" },
      {
        Component: TypographyBlockquote,
        expectedTag: "BLOCKQUOTE",
        testId: "blockquote-specific",
      },
      {
        Component: TypographyInlineCode,
        expectedTag: "CODE",
        testId: "code-specific",
      },
      { Component: TypographyLead, expectedTag: "P", testId: "lead-specific" },
      {
        Component: TypographyLarge,
        expectedTag: "P",
        testId: "large-specific",
      },
      {
        Component: TypographySmall,
        expectedTag: "P",
        testId: "small-specific",
      },
      {
        Component: TypographyMuted,
        expectedTag: "P",
        testId: "muted-specific",
      },
    ];

    specificComponents.forEach(({ Component, expectedTag, testId }) => {
      it(`${Component.displayName} renders correct element`, () => {
        render(<Component data-testid={testId}>Content</Component>);

        const element = screen.getByTestId(testId);
        expect(element.tagName).toBe(expectedTag);
        expect(element).toHaveTextContent("Content");
      });
    });

    it("TypographyList renders as ul by default", () => {
      render(
        <TypographyList data-testid="list-default">
          List content
        </TypographyList>,
      );

      const element = screen.getByTestId("list-default");
      expect(element.tagName).toBe("UL");
      expect(element).toHaveClass("list-disc");
    });

    it("TypographyList renders as ol when ordered prop is true", () => {
      render(
        <TypographyList ordered data-testid="list-ordered">
          List content
        </TypographyList>,
      );

      const element = screen.getByTestId("list-ordered");
      expect(element.tagName).toBe("OL");
      expect(element).toHaveClass("list-decimal");
    });

    it("specific components accept color and other props", () => {
      render(
        <TypographyH1 color="primary" align="center" data-testid="h1-props">
          Styled heading
        </TypographyH1>,
      );

      const element = screen.getByTestId("h1-props");
      expect(element).toHaveClass("text-primary", "text-center");
    });
  });

  describe("Accessibility", () => {
    it("maintains semantic HTML structure", () => {
      render(
        <div>
          <TypographyH1>Main Title</TypographyH1>
          <TypographyH2>Section Title</TypographyH2>
          <TypographyP>Paragraph content</TypographyP>
        </div>,
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Main Title",
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Section Title",
      );
    });

    it("supports ARIA attributes", () => {
      render(
        <Typography
          aria-label="Descriptive label"
          aria-describedby="description"
          data-testid="aria-typography"
        >
          Content
        </Typography>,
      );

      const element = screen.getByTestId("aria-typography");
      expect(element).toHaveAttribute("aria-label", "Descriptive label");
      expect(element).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
      render(
        <Typography role="banner" data-testid="role-typography">
          Banner content
        </Typography>,
      );

      expect(screen.getByTestId("role-typography")).toHaveAttribute(
        "role",
        "banner",
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined variant gracefully", () => {
      render(
        <Typography variant={undefined} data-testid="undefined-variant">
          Text
        </Typography>,
      );

      const element = screen.getByTestId("undefined-variant");
      expect(element.tagName).toBe("P");
      expect(element).toBeInTheDocument();
    });

    it("handles null variant gracefully", () => {
      render(
        <Typography variant={null} data-testid="null-variant">
          Text
        </Typography>,
      );

      const element = screen.getByTestId("null-variant");
      expect(element.tagName).toBe("P");
      expect(element).toBeInTheDocument();
    });

    it("handles empty children", () => {
      render(<Typography data-testid="empty" />);

      expect(screen.getByTestId("empty")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <Typography data-testid="multiple">
          <span>First</span>
          <span>Second</span>
        </Typography>,
      );

      const element = screen.getByTestId("multiple");
      expect(element).toContainHTML("<span>First</span><span>Second</span>");
    });
  });

  describe("CSS Classes Combination", () => {
    it("combines multiple variant props correctly", () => {
      render(
        <Typography
          variant="h2"
          color="primary"
          align="center"
          weight="bold"
          truncate
          data-testid="combined"
        >
          Combined styles
        </Typography>,
      );

      const element = screen.getByTestId("combined");
      expect(element).toHaveClass(
        "scroll-m-20",
        "border-b",
        "pb-2",
        "text-3xl",
        "tracking-tight",
        "text-primary",
        "text-center",
        "font-bold",
        "truncate",
      );
    });

    it("allows custom className to override styles", () => {
      render(
        <Typography
          variant="h1"
          className="text-sm font-normal"
          data-testid="override"
        >
          Overridden styles
        </Typography>,
      );

      const element = screen.getByTestId("override");
      expect(element).toHaveClass("text-sm", "font-normal");
    });
  });

  describe("Event Handling", () => {
    it("handles click events", () => {
      const handleClick = vi.fn();
      render(
        <Typography onClick={handleClick} data-testid="clickable">
          Clickable text
        </Typography>,
      );

      const element = screen.getByTestId("clickable");
      element.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles other HTML events", () => {
      const handleMouseOver = vi.fn();
      render(
        <Typography onMouseOver={handleMouseOver} data-testid="hoverable">
          Hoverable text
        </Typography>,
      );

      const element = screen.getByTestId("hoverable");
      element.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      expect(handleMouseOver).toHaveBeenCalledTimes(1);
    });
  });
});
