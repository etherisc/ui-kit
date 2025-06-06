import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToastProvider } from "../providers/ToastProvider";
import { useToast } from "./useToast";

// Test component to access the public useToast API
function TestComponent() {
  const { success, error, warning, info, toast } = useToast();

  return (
    <div>
      <button
        onClick={() => success("Success!", "Operation completed")}
        data-testid="success-toast"
      >
        Success Toast
      </button>
      <button
        onClick={() => error("Error!", "Something went wrong")}
        data-testid="error-toast"
      >
        Error Toast
      </button>
      <button
        onClick={() => warning("Warning!", "Please be careful")}
        data-testid="warning-toast"
      >
        Warning Toast
      </button>
      <button
        onClick={() => info("Info", "Here is some information")}
        data-testid="info-toast"
      >
        Info Toast
      </button>
      <button
        onClick={() => toast({ title: "Custom Toast", variant: "success" })}
        data-testid="custom-toast"
      >
        Custom Toast
      </button>
    </div>
  );
}

describe("useToast (Public API)", () => {
  it("should provide toast functions without errors", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    // All buttons should be rendered (just check they exist)
    expect(screen.getByTestId("success-toast")).toBeDefined();
    expect(screen.getByTestId("error-toast")).toBeDefined();
    expect(screen.getByTestId("warning-toast")).toBeDefined();
    expect(screen.getByTestId("info-toast")).toBeDefined();
    expect(screen.getByTestId("custom-toast")).toBeDefined();
  });

  it("should call success toast without throwing errors", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByTestId("success-toast").click();
    });

    // No errors should be thrown
  });

  it("should call error toast without throwing errors", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByTestId("error-toast").click();
    });

    // No errors should be thrown
  });

  it("should call warning toast without throwing errors", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByTestId("warning-toast").click();
    });

    // No errors should be thrown
  });

  it("should call info toast without throwing errors", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByTestId("info-toast").click();
    });

    // No errors should be thrown
  });

  it("should call custom toast without throwing errors", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByTestId("custom-toast").click();
    });

    // No errors should be thrown
  });

  it("should return toast IDs when creating toasts", () => {
    let toastId: string = "";

    function TestIdComponent() {
      const { success } = useToast();

      return (
        <button
          onClick={() => {
            toastId = success("Test", "Description");
          }}
          data-testid="create-toast"
        >
          Create Toast
        </button>
      );
    }

    render(
      <ToastProvider>
        <TestIdComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByTestId("create-toast").click();
    });

    expect(toastId).toBeTruthy();
    expect(typeof toastId).toBe("string");
  });

  it("should throw error when useToast is used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useToastContext must be used within a ToastProvider");

    consoleSpy.mockRestore();
  });
});
