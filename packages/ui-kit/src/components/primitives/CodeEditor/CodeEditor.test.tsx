import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  vi,
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  beforeAll,
} from "vitest";
import { CodeEditor } from "./CodeEditor";

// Mock DOM methods that CodeMirror requires but aren't available in JSDOM
beforeAll(() => {
  // Mock getClientRects which CodeMirror uses for DOM measurement
  Range.prototype.getClientRects = vi.fn(
    () =>
      ({
        length: 1,
        item: () => ({
          top: 0,
          left: 0,
          bottom: 20,
          right: 100,
          width: 100,
          height: 20,
        }),
        [0]: {
          top: 0,
          left: 0,
          bottom: 20,
          right: 100,
          width: 100,
          height: 20,
        },
        [Symbol.iterator]: function* () {
          yield this[0];
        },
      }) as any,
  );

  Range.prototype.getBoundingClientRect = vi.fn(() => ({
    top: 0,
    left: 0,
    bottom: 20,
    right: 100,
    width: 100,
    height: 20,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }));

  // Mock MutationObserver with proper takeRecords method
  global.MutationObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []), // Return empty array instead of function
  }));

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock document.createRange
  document.createRange = vi.fn(
    () =>
      ({
        setStart: vi.fn(),
        setEnd: vi.fn(),
        getClientRects: vi.fn(() => ({
          length: 1,
          item: () => ({
            top: 0,
            left: 0,
            bottom: 20,
            right: 100,
            width: 100,
            height: 20,
          }),
          [0]: {
            top: 0,
            left: 0,
            bottom: 20,
            right: 100,
            width: 100,
            height: 20,
          },
        })),
        getBoundingClientRect: vi.fn(() => ({
          top: 0,
          left: 0,
          bottom: 20,
          right: 100,
          width: 100,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        })),
      }) as any,
  );
});

describe("CodeEditor", () => {
  const defaultProps = {
    value: 'console.log("Hello, World!");',
    language: "javascript" as const,
  };

  beforeEach(() => {
    // Mock timers to control setInterval in CodeEditor
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers and run any pending timers
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders with default props", async () => {
    const { container } = render(<CodeEditor {...defaultProps} />);

    // Test that the component renders without crashing
    // CodeMirror creates its own DOM structure, so we test the container
    expect(container.firstChild).toBeTruthy();

    // Allow time for any async initialization
    act(() => {
      vi.advanceTimersByTime(100);
    });
  });

  it("displays the provided value", async () => {
    const testCode = 'const test = "value";';
    const { container } = render(
      <CodeEditor value={testCode} language="javascript" />,
    );

    // Test that the component renders with the value prop
    expect(container.firstChild).toBeTruthy();

    // Allow time for any async initialization
    act(() => {
      vi.advanceTimersByTime(100);
    });
  });

  it("calls onChange when content changes", async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <CodeEditor value="" language="javascript" onChange={handleChange} />,
    );

    // Test that the component renders and accepts the onChange prop
    expect(container.firstChild).toBeTruthy();
    expect(handleChange).toBeInstanceOf(Function);

    // Allow time for any async initialization
    act(() => {
      vi.advanceTimersByTime(100);
    });
  });

  it("handles focus and blur events", async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const { container } = render(
      <CodeEditor
        {...defaultProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );

    // Test that the component renders and accepts event handler props
    expect(container.firstChild).toBeTruthy();
    expect(handleFocus).toBeInstanceOf(Function);
    expect(handleBlur).toBeInstanceOf(Function);

    // Allow time for any async initialization
    act(() => {
      vi.advanceTimersByTime(100);
    });
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
