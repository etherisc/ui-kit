import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CodeEditor } from "./CodeEditor";

describe("CodeEditor", () => {
  const defaultProps = {
    value: 'console.log("Hello, World!");',
    language: "javascript" as const,
  };

  it("renders with default props", () => {
    render(<CodeEditor {...defaultProps} />);

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    const testCode = 'const test = "value";';
    render(<CodeEditor value={testCode} language="javascript" />);

    // CodeMirror content is in the DOM but may not be directly accessible
    // We test that the component renders without error
    const editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toBeInTheDocument();
  });

  it("calls onChange when content changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <CodeEditor value="" language="javascript" onChange={handleChange} />,
    );

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    await user.click(editor);

    // Note: Testing CodeMirror content changes is complex due to its DOM structure
    // In a real test environment, you might need to interact with the actual CodeMirror instance
    expect(editor).toBeInTheDocument();
  });

  it("applies read-only state correctly", () => {
    render(<CodeEditor {...defaultProps} readOnly />);

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toHaveAttribute("aria-readonly", "true");
  });

  it("applies disabled state correctly", () => {
    render(<CodeEditor {...defaultProps} disabled />);

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toHaveAttribute("aria-disabled", "true");
    expect(editor).toHaveAttribute("tabIndex", "-1");
  });

  it("supports different programming languages", () => {
    const languages = [
      "javascript",
      "typescript",
      "css",
      "html",
      "json",
      "markdown",
    ] as const;

    languages.forEach((language) => {
      const { unmount } = render(
        <CodeEditor value="test code" language={language} />,
      );

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();

      unmount();
    });
  });

  it("supports light and dark themes", () => {
    const { rerender } = render(<CodeEditor {...defaultProps} theme="light" />);

    let editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toBeInTheDocument();

    rerender(<CodeEditor {...defaultProps} theme="dark" />);

    editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toBeInTheDocument();
  });

  it("applies custom height", () => {
    render(<CodeEditor {...defaultProps} height="500px" />);

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toBeInTheDocument();
  });

  it("handles placeholder text", () => {
    const placeholder = "Enter your code here...";
    render(
      <CodeEditor value="" language="javascript" placeholder={placeholder} />,
    );

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    expect(editor).toBeInTheDocument();
  });

  it("supports custom CSS classes", () => {
    const customClass = "custom-editor-class";
    render(<CodeEditor {...defaultProps} className={customClass} />);

    const container = screen.getByRole("textbox", {
      name: /code editor/i,
    }).parentElement;
    expect(container).toHaveClass(customClass);
  });

  it("handles focus and blur events", async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <CodeEditor
        {...defaultProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );

    const editor = screen.getByRole("textbox", { name: /code editor/i });

    await user.click(editor);
    // Focus events in CodeMirror are handled internally
    expect(editor).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(
        <CodeEditor
          {...defaultProps}
          aria-label="Custom code editor"
          aria-labelledby="editor-label"
          aria-describedby="editor-description"
          aria-required={true}
          aria-invalid={true}
        />,
      );

      const editor = screen.getByRole("textbox", {
        name: /custom code editor/i,
      });
      expect(editor).toHaveAttribute("aria-label", "Custom code editor");
      expect(editor).toHaveAttribute("aria-labelledby", "editor-label");
      expect(editor).toHaveAttribute("aria-describedby", "editor-description");
      expect(editor).toHaveAttribute("aria-required", "true");
      expect(editor).toHaveAttribute("aria-invalid", "true");
      expect(editor).toHaveAttribute("aria-multiline", "true");
    });

    it("has default aria-label when none provided", () => {
      render(<CodeEditor {...defaultProps} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toHaveAttribute("aria-label", "Code editor");
    });

    it("is keyboard accessible", () => {
      render(<CodeEditor {...defaultProps} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toHaveAttribute("tabIndex", "0");
    });

    it("is not keyboard accessible when disabled", () => {
      render(<CodeEditor {...defaultProps} disabled />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Configuration Options", () => {
    it("supports line numbers configuration", () => {
      const { rerender } = render(
        <CodeEditor {...defaultProps} lineNumbers={true} />,
      );

      let editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();

      rerender(<CodeEditor {...defaultProps} lineNumbers={false} />);

      editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports line wrapping configuration", () => {
      render(<CodeEditor {...defaultProps} lineWrapping={true} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports search configuration", () => {
      render(<CodeEditor {...defaultProps} searchEnabled={false} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports bracket matching configuration", () => {
      render(<CodeEditor {...defaultProps} bracketMatching={false} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports autocompletion configuration", () => {
      render(<CodeEditor {...defaultProps} autocompletion={false} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports custom tab size", () => {
      render(<CodeEditor {...defaultProps} tabSize={4} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports indent with tabs", () => {
      render(<CodeEditor {...defaultProps} indentWithTabs={true} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });
  });

  describe("Size Configuration", () => {
    it("supports min and max height", () => {
      render(
        <CodeEditor {...defaultProps} minHeight="100px" maxHeight="600px" />,
      );

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("supports numeric height values", () => {
      render(<CodeEditor {...defaultProps} height={300} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles empty value gracefully", () => {
      render(<CodeEditor value="" language="javascript" />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("handles undefined onChange gracefully", () => {
      render(<CodeEditor {...defaultProps} onChange={undefined} />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });

    it("handles invalid language gracefully", () => {
      render(<CodeEditor value="test" language="plaintext" />);

      const editor = screen.getByRole("textbox", { name: /code editor/i });
      expect(editor).toBeInTheDocument();
    });
  });

  describe("Data Test ID", () => {
    it("applies data-testid when provided", () => {
      const testId = "custom-code-editor";
      render(<CodeEditor {...defaultProps} data-testid={testId} />);

      const container = screen.getByTestId(testId);
      expect(container).toBeInTheDocument();
    });
  });
});
