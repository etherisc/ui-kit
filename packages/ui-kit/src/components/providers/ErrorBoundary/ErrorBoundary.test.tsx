import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import * as Sentry from "@sentry/react";
import { ErrorBoundary, withErrorBoundary } from "./ErrorBoundary";
import { logger } from "../../../utils/logger";

// Mock Sentry
vi.mock("@sentry/react", () => ({
  withScope: vi.fn(),
  captureException: vi.fn(),
}));

// Mock logger
vi.mock("../../../utils/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

// Test component that works normally
const WorkingComponent: React.FC = () => <div>Working component</div>;

// Mock error for testing
const mockError = new Error("Test error");
const mockErrorInfo = {
  componentStack: "\n    in ThrowingComponent\n    in ErrorBoundary",
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for cleaner test output
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Working component")).toBeDefined();
  });

  it("renders default fallback UI when an error occurs", () => {
    // Create a component that simulates an error state
    const ErrorBoundaryWithError = () => {
      const errorBoundary = new ErrorBoundary({
        children: <WorkingComponent />,
      });

      // Simulate error state
      errorBoundary.state = {
        hasError: true,
        error: mockError,
        errorInfo: mockErrorInfo,
      };

      return errorBoundary.render();
    };

    render(<ErrorBoundaryWithError />);

    expect(screen.getByText("Something went wrong")).toBeDefined();
    expect(
      screen.getByText(
        "An unexpected error occurred. Please try refreshing the page.",
      ),
    ).toBeDefined();
    expect(screen.getByText("Reload Page")).toBeDefined();
  });

  it("renders custom fallback message when provided", () => {
    const customMessage = "Custom error message";

    const ErrorBoundaryWithError = () => {
      const errorBoundary = new ErrorBoundary({
        children: <WorkingComponent />,
        fallbackMessage: customMessage,
      });

      errorBoundary.state = {
        hasError: true,
        error: mockError,
        errorInfo: mockErrorInfo,
      };

      return errorBoundary.render();
    };

    render(<ErrorBoundaryWithError />);

    expect(screen.getByText(customMessage)).toBeDefined();
  });

  it("renders custom fallback component when provided", () => {
    const CustomFallback = () => <div>Custom fallback UI</div>;

    const ErrorBoundaryWithError = () => {
      const errorBoundary = new ErrorBoundary({
        children: <WorkingComponent />,
        fallback: <CustomFallback />,
      });

      errorBoundary.state = {
        hasError: true,
        error: mockError,
        errorInfo: mockErrorInfo,
      };

      return errorBoundary.render();
    };

    render(<ErrorBoundaryWithError />);

    expect(screen.getByText("Custom fallback UI")).toBeDefined();
  });

  it("renders custom fallback function when provided", () => {
    const customFallback = (error: Error) => (
      <div>Custom fallback for: {error.message}</div>
    );

    const ErrorBoundaryWithError = () => {
      const errorBoundary = new ErrorBoundary({
        children: <WorkingComponent />,
        fallback: customFallback,
      });

      errorBoundary.state = {
        hasError: true,
        error: mockError,
        errorInfo: mockErrorInfo,
      };

      return errorBoundary.render();
    };

    render(<ErrorBoundaryWithError />);

    expect(screen.getByText("Custom fallback for: Test error")).toBeDefined();
  });

  it("shows error details when showErrorDetails is true", () => {
    const ErrorBoundaryWithError = () => {
      const errorBoundary = new ErrorBoundary({
        children: <WorkingComponent />,
        showErrorDetails: true,
      });

      errorBoundary.state = {
        hasError: true,
        error: mockError,
        errorInfo: mockErrorInfo,
      };

      return errorBoundary.render();
    };

    render(<ErrorBoundaryWithError />);

    expect(screen.getByText("Error Details")).toBeDefined();
    expect(screen.getByText("Test error")).toBeDefined();
  });

  it("logs error with logger when componentDidCatch is called", () => {
    const mockLoggerError = vi.mocked(logger.error);
    const errorBoundary = new ErrorBoundary({ children: <WorkingComponent /> });

    // Simulate componentDidCatch
    errorBoundary.componentDidCatch(mockError, mockErrorInfo);

    expect(mockLoggerError).toHaveBeenCalledWith(
      "ErrorBoundary caught an error",
      expect.objectContaining({
        error: "Test error",
        stack: expect.any(String),
        componentStack: expect.any(String),
      }),
    );
  });

  it("reports error to Sentry when reportToSentry is true", () => {
    const mockWithScope = vi.mocked(Sentry.withScope);

    const errorBoundary = new ErrorBoundary({
      children: <WorkingComponent />,
      reportToSentry: true,
    });

    errorBoundary.componentDidCatch(mockError, mockErrorInfo);

    expect(mockWithScope).toHaveBeenCalled();
  });

  it("does not report to Sentry when reportToSentry is false", () => {
    const mockWithScope = vi.mocked(Sentry.withScope);

    const errorBoundary = new ErrorBoundary({
      children: <WorkingComponent />,
      reportToSentry: false,
    });

    errorBoundary.componentDidCatch(mockError, mockErrorInfo);

    expect(mockWithScope).not.toHaveBeenCalled();
  });

  it("calls custom onError handler when provided", () => {
    const mockOnError = vi.fn();

    const errorBoundary = new ErrorBoundary({
      children: <WorkingComponent />,
      onError: mockOnError,
    });

    errorBoundary.componentDidCatch(mockError, mockErrorInfo);

    expect(mockOnError).toHaveBeenCalledWith(mockError, mockErrorInfo);
  });

  describe("withErrorBoundary HOC", () => {
    it("wraps component with ErrorBoundary", () => {
      const WrappedComponent = withErrorBoundary(WorkingComponent);

      render(<WrappedComponent />);

      expect(screen.getByText("Working component")).toBeDefined();
    });

    it("sets correct displayName", () => {
      const TestComponent = () => <div>Test</div>;
      TestComponent.displayName = "TestComponent";

      const WrappedComponent = withErrorBoundary(TestComponent);

      expect(WrappedComponent.displayName).toBe(
        "withErrorBoundary(TestComponent)",
      );
    });

    it("uses component name when displayName is not available", () => {
      function TestFunction() {
        return <div>Test</div>;
      }

      const WrappedComponent = withErrorBoundary(TestFunction);

      expect(WrappedComponent.displayName).toBe(
        "withErrorBoundary(TestFunction)",
      );
    });
  });
});
