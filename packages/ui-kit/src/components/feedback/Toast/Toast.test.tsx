import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toast } from "./Toast";
import { type Toast as ToastType } from "../../../providers/ToastProvider/ToastProvider";

const mockToast: ToastType = {
  id: "test-toast-1",
  title: "Test Toast",
  description: "This is a test toast",
  variant: "success",
  duration: 5000,
};

describe("Toast", () => {
  it("should render toast with title and description", () => {
    render(<Toast toast={mockToast} />);

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("This is a test toast")).toBeInTheDocument();
  });

  it("should render toast with only title when description is not provided", () => {
    const toastWithoutDescription = { ...mockToast, description: undefined };
    render(<Toast toast={toastWithoutDescription} />);

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.queryByText("This is a test toast")).not.toBeInTheDocument();
  });

  it("should apply correct variant styling", () => {
    const { rerender } = render(<Toast toast={mockToast} />);

    // Test success variant - check inline styles instead of CSS classes
    let toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveStyle({ backgroundColor: "#dcfce7" });

    // Test error variant
    rerender(<Toast toast={{ ...mockToast, variant: "error" }} />);
    toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveStyle({ backgroundColor: "#fee2e2" });

    // Test warning variant
    rerender(<Toast toast={{ ...mockToast, variant: "warning" }} />);
    toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveStyle({ backgroundColor: "#fef3c7" });

    // Test info variant
    rerender(<Toast toast={{ ...mockToast, variant: "info" }} />);
    toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveStyle({ backgroundColor: "#dbeafe" });
  });

  it("should call onClose when close button is clicked", () => {
    const onCloseMock = vi.fn();
    render(<Toast toast={mockToast} onClose={onCloseMock} />);

    const closeButton = screen.getByLabelText("Close toast");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call toast.onClose when close button is clicked", () => {
    const toastOnCloseMock = vi.fn();
    const toastWithOnClose = { ...mockToast, onClose: toastOnCloseMock };

    render(<Toast toast={toastWithOnClose} />);

    const closeButton = screen.getByLabelText("Close toast");
    fireEvent.click(closeButton);

    expect(toastOnCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call both onClose callbacks when both are provided", () => {
    const onCloseMock = vi.fn();
    const toastOnCloseMock = vi.fn();
    const toastWithOnClose = { ...mockToast, onClose: toastOnCloseMock };

    render(<Toast toast={toastWithOnClose} onClose={onCloseMock} />);

    const closeButton = screen.getByLabelText("Close toast");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(toastOnCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should have proper accessibility attributes", () => {
    render(<Toast toast={mockToast} />);

    const toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveAttribute("aria-live", "assertive");
    expect(toastElement).toHaveAttribute("aria-atomic", "true");

    const closeButton = screen.getByLabelText("Close toast");
    expect(closeButton).toHaveAttribute("type", "button");
  });

  it("should accept custom className", () => {
    render(<Toast toast={mockToast} className="custom-class" />);

    const toastElement = screen.getByRole("alert");
    expect(toastElement).toHaveClass("custom-class");
  });

  it("should pass through additional props", () => {
    render(<Toast toast={mockToast} data-testid="custom-toast" />);

    const toastElement = screen.getByTestId("custom-toast");
    expect(toastElement).toBeInTheDocument();
  });
});
