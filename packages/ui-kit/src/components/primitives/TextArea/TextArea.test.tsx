import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  it("renders with basic props", () => {
    render(<TextArea placeholder="Enter text here" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Enter text here");
  });

  it("renders with label", () => {
    render(<TextArea label="Description" id="description" />);
    const label = screen.getByText("Description");
    const textarea = screen.getByRole("textbox");

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "description");
    expect(textarea).toHaveAttribute("id", "description");
  });

  it("renders with description", () => {
    render(<TextArea description="Please provide details" />);
    expect(screen.getByText("Please provide details")).toBeInTheDocument();
  });

  it("renders with error state", () => {
    render(<TextArea error="This field is required" />);
    const textarea = screen.getByRole("textbox");
    const errorMessage = screen.getByText("This field is required");

    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-destructive-foreground");
  });

  it("does not show description when error is present", () => {
    render(
      <TextArea description="This is a description" error="This is an error" />,
    );

    expect(screen.getByText("This is an error")).toBeInTheDocument();
    expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<TextArea size="sm" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass(
      "min-h-[40px]",
      "text-xs",
    );

    rerender(<TextArea size="lg" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass(
      "min-h-[80px]",
      "text-base",
    );

    rerender(<TextArea size="default" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass("min-h-[60px]");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("supports disabled state", () => {
    render(<TextArea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("supports rows and cols props", () => {
    render(<TextArea rows={5} cols={30} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("cols", "30");
  });

  it("applies custom className to wrapper", () => {
    render(<TextArea className="custom-wrapper" data-testid="wrapper" />);
    const wrapper = screen.getByTestId("wrapper").parentElement;
    expect(wrapper).toHaveClass("custom-wrapper");
  });

  it("applies custom textareaClassName to textarea element", () => {
    render(
      <TextArea textareaClassName="custom-textarea" data-testid="textarea" />,
    );
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveClass("custom-textarea");
  });
});
