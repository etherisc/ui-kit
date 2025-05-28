import { render, screen } from "@testing-library/react";
import { ErrorShell } from "./ErrorShell";

describe("ErrorShell", () => {
  it("renders with default props", () => {
    render(<ErrorShell />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again later."),
    ).toBeInTheDocument();
  });

  it("renders with custom title and message", () => {
    render(
      <ErrorShell
        title="Custom Error"
        message="This is a custom error message"
      />,
    );

    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(
      screen.getByText("This is a custom error message"),
    ).toBeInTheDocument();
  });

  it("renders error code when provided", () => {
    render(<ErrorShell errorCode="404" />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
    render(<ErrorShell icon={customIcon} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = (
      <>
        <button>Action 1</button>
        <button>Action 2</button>
      </>
    );
    render(<ErrorShell actions={actions} />);

    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("renders children content when provided", () => {
    render(
      <ErrorShell>
        <div>Additional content</div>
      </ErrorShell>,
    );

    expect(screen.getByText("Additional content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<ErrorShell className="custom-class" />);

    const container = screen.getByRole("main");
    expect(container).toHaveClass("custom-class");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<ErrorShell size="sm" />);
    let errorContainer = screen.getByRole("main").querySelector("div > div");
    expect(errorContainer).toHaveClass("max-w-sm");

    rerender(<ErrorShell size="md" />);
    errorContainer = screen.getByRole("main").querySelector("div > div");
    expect(errorContainer).toHaveClass("max-w-md");

    rerender(<ErrorShell size="lg" />);
    errorContainer = screen.getByRole("main").querySelector("div > div");
    expect(errorContainer).toHaveClass("max-w-lg");
  });

  it("shows pattern background when showPattern is true", () => {
    render(<ErrorShell showPattern={true} />);

    const container = screen.getByRole("main");
    expect(container).toHaveClass(
      "bg-gradient-to-br",
      "from-background",
      "to-muted/20",
    );
  });

  it("has proper accessibility attributes", () => {
    render(<ErrorShell title="Error Title" message="Error message" />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("aria-labelledby", "error-title");
    expect(main).toHaveAttribute("aria-describedby", "error-message");

    const title = screen.getByText("Error Title");
    expect(title).toHaveAttribute("id", "error-title");

    const message = screen.getByText("Error message");
    expect(message).toHaveAttribute("id", "error-message");
  });

  it("renders default icon when no custom icon provided", () => {
    render(<ErrorShell />);

    // Check for the default warning icon SVG
    const defaultIcon = screen.getByRole("main").querySelector("svg");
    expect(defaultIcon).toBeInTheDocument();
    expect(defaultIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("hides error code when not provided", () => {
    render(<ErrorShell />);

    // Error code should not be present
    const errorCodeElement = screen
      .getByRole("main")
      .querySelector(".text-6xl");
    expect(errorCodeElement).not.toBeInTheDocument();
  });

  it("hides actions section when not provided", () => {
    render(<ErrorShell />);

    // Actions container should not be present
    const actionsContainer = screen
      .getByRole("main")
      .querySelector(".flex.flex-col.sm\\:flex-row");
    expect(actionsContainer).not.toBeInTheDocument();
  });

  it("hides children section when not provided", () => {
    render(<ErrorShell />);

    // Children container should not be present
    const childrenContainer = screen
      .getByRole("main")
      .querySelector(".border-t");
    expect(childrenContainer).not.toBeInTheDocument();
  });

  it("renders with all props combined", () => {
    const customIcon = <div data-testid="custom-icon">Icon</div>;
    const actions = <button>Try Again</button>;
    const children = <div>Extra info</div>;

    render(
      <ErrorShell
        title="Complex Error"
        message="Complex error message"
        errorCode="500"
        icon={customIcon}
        actions={actions}
        size="lg"
        showPattern={true}
        className="test-class"
      >
        {children}
      </ErrorShell>,
    );

    expect(screen.getByText("Complex Error")).toBeInTheDocument();
    expect(screen.getByText("Complex error message")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
    expect(screen.getByText("Extra info")).toBeInTheDocument();

    const container = screen.getByRole("main");
    expect(container).toHaveClass("test-class");
  });
});
