import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { MarkdownEditor } from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("renders with default props", () => {
      render(<MarkdownEditor {...defaultProps} />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("displays placeholder text", () => {
      const placeholder = "Enter your markdown here...";
      render(<MarkdownEditor {...defaultProps} placeholder={placeholder} />);
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it("calls onChange when text is entered", () => {
      const onChange = vi.fn();
      render(<MarkdownEditor {...defaultProps} onChange={onChange} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "# Hello World" } });

      expect(onChange).toHaveBeenCalledWith("# Hello World");
    });

    it("toggles between edit and preview modes", () => {
      render(<MarkdownEditor {...defaultProps} value="# Hello World" />);

      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      expect(screen.getByRole("region")).toBeInTheDocument();
      expect(screen.getByText("Preview")).toBeInTheDocument();
    });

    it("respects disabled state", () => {
      render(<MarkdownEditor {...defaultProps} disabled />);

      const textarea = screen.getByRole("textbox");
      const toggleButton = screen.getByRole("button");

      expect(textarea).toBeDisabled();
      expect(toggleButton).toBeDisabled();
    });

    it("respects readOnly state", () => {
      const onChange = vi.fn();
      render(<MarkdownEditor {...defaultProps} onChange={onChange} readOnly />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "test" } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("Security Tests - XSS Prevention", () => {
    it("removes script tags from markdown content", () => {
      const maliciousContent = `
# Hello
<script>alert('xss')</script>
Some content
      `;

      render(<MarkdownEditor {...defaultProps} value={maliciousContent} />);

      // Switch to preview mode
      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview.innerHTML).not.toContain("<script>");
      expect(preview.innerHTML).not.toContain("alert('xss')");
    });

    it("removes javascript: URLs from links", () => {
      const maliciousContent = `[Click me](javascript:alert('xss'))`;

      render(<MarkdownEditor {...defaultProps} value={maliciousContent} />);

      // Switch to preview mode
      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview.innerHTML).not.toContain("javascript:");
    });

    it("removes event handlers from HTML", () => {
      const maliciousContent = `
# Test
<img src="test.jpg" onerror="alert('xss')" />
<div onclick="alert('xss')">Click me</div>
      `;

      render(<MarkdownEditor {...defaultProps} value={maliciousContent} />);

      // Switch to preview mode
      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview.innerHTML).not.toContain("onerror=");
      expect(preview.innerHTML).not.toContain("onclick=");
    });

    it("handles data URLs safely", () => {
      const maliciousContent = `
![Test](data:text/html,<script>alert('xss')</script>)
      `;

      render(<MarkdownEditor {...defaultProps} value={maliciousContent} />);

      // Switch to preview mode
      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      // The basic sanitization removes script tags but data URLs remain encoded
      expect(preview.innerHTML).not.toContain("<script>");
    });

    it("handles style injection attempts", () => {
      const maliciousContent = `
<div style="background:url(javascript:alert('xss'))">Content</div>
      `;

      render(<MarkdownEditor {...defaultProps} value={maliciousContent} />);

      // Switch to preview mode
      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview.innerHTML).not.toContain("javascript:");
    });

    it("preserves safe markdown content", () => {
      const safeContent = `
# Hello World

This is **bold** and *italic* text.

- List item 1
- List item 2

[Safe link](https://example.com)

\`\`\`javascript
console.log('code block');
\`\`\`
      `;

      render(<MarkdownEditor {...defaultProps} value={safeContent} />);

      // Switch to preview mode
      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview.innerHTML).toContain("<h1>");
      expect(preview.innerHTML).toContain("<strong>");
      expect(preview.innerHTML).toContain("<em>");
      expect(preview.innerHTML).toContain("<ul>");
      expect(preview.innerHTML).toContain("https://example.com");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels", () => {
      const ariaLabel = "Custom markdown editor";
      render(<MarkdownEditor {...defaultProps} aria-label={ariaLabel} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-label", ariaLabel);
    });

    it("has proper ARIA described by", () => {
      const ariaDescribedBy = "help-text";
      render(
        <MarkdownEditor {...defaultProps} aria-describedby={ariaDescribedBy} />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby", ariaDescribedBy);
    });

    it("has accessible toggle button", () => {
      render(<MarkdownEditor {...defaultProps} />);

      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      expect(toggleButton).toBeInTheDocument();

      fireEvent.click(toggleButton);

      const editButton = screen.getByRole("button", {
        name: /switch to edit mode/i,
      });
      expect(editButton).toBeInTheDocument();
    });

    it("preview has proper role", () => {
      render(<MarkdownEditor {...defaultProps} value="# Test" />);

      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview).toHaveAttribute("aria-label", "Markdown preview");
    });
  });

  describe("Error Handling", () => {
    it("handles empty content gracefully", () => {
      render(<MarkdownEditor {...defaultProps} value="" />);

      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      const preview = screen.getByRole("region");
      expect(preview.innerHTML).toBe("");
    });

    it("handles malformed markdown gracefully", () => {
      const malformedContent = "# Unclosed [link(";

      render(<MarkdownEditor {...defaultProps} value={malformedContent} />);

      const toggleButton = screen.getByRole("button", {
        name: /switch to preview mode/i,
      });
      fireEvent.click(toggleButton);

      // Should not crash and should render something
      const preview = screen.getByRole("region");
      expect(preview).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      const customClass = "custom-editor";
      render(<MarkdownEditor {...defaultProps} className={customClass} />);

      // The className is applied to the root container
      const container = document.querySelector(`.${customClass}`);
      expect(container).toBeInTheDocument();
    });

    it("applies data-testid", () => {
      const testId = "my-editor";
      render(<MarkdownEditor {...defaultProps} data-testid={testId} />);

      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });
});
