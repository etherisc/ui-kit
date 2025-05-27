import React, { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/react";
import { logger } from "../../../utils/logger";

/**
 * Props for the ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Custom fallback UI component */
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
  /** Custom error message to display */
  fallbackMessage?: string;
  /** Whether to show error details in development */
  showErrorDetails?: boolean;
  /** Callback when an error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Additional context to send to Sentry */
  sentryContext?: Record<string, unknown>;
  /** Whether to report errors to Sentry */
  reportToSentry?: boolean;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Default fallback UI component
 */
const DefaultFallback: React.FC<{
  error: Error;
  errorInfo: ErrorInfo;
  showErrorDetails: boolean;
  fallbackMessage?: string;
}> = ({ error, errorInfo, showErrorDetails, fallbackMessage }) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-lg font-semibold text-destructive">
        Something went wrong
      </h2>

      <p className="mb-4 text-sm text-muted-foreground">
        {fallbackMessage ||
          "An unexpected error occurred. Please try refreshing the page."}
      </p>

      {(showErrorDetails || isDevelopment) && (
        <details className="mt-4 w-full max-w-md">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
            Error Details
          </summary>
          <div className="mt-2 rounded bg-muted p-3 text-left">
            <p className="text-xs font-mono text-destructive">
              <strong>Error:</strong> {error.message}
            </p>
            {error.stack && (
              <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                {error.stack}
              </pre>
            )}
            {errorInfo.componentStack && (
              <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                <strong>Component Stack:</strong>
                {errorInfo.componentStack}
              </pre>
            )}
          </div>
        </details>
      )}

      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Reload Page
      </button>
    </div>
  );
};

/**
 * ErrorBoundary component with Sentry integration
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallbackMessage="Something went wrong with this feature">
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, sentryContext, reportToSentry = true } = this.props;

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Log error with our logger
    logger.error("ErrorBoundary caught an error", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      ...sentryContext,
    });

    // Report to Sentry if enabled
    if (reportToSentry) {
      Sentry.withScope((scope) => {
        // Add additional context
        if (sentryContext) {
          Object.entries(sentryContext).forEach(([key, value]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scope.setContext(key, value as any);
          });
        }

        // Add component stack
        scope.setContext("componentStack", {
          componentStack: errorInfo.componentStack,
        });

        // Set error level
        scope.setLevel("error");

        // Capture the exception
        Sentry.captureException(error);
      });
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }
  }

  render() {
    const {
      children,
      fallback,
      fallbackMessage,
      showErrorDetails = false,
    } = this.props;
    const { hasError, error, errorInfo } = this.state;

    if (hasError && error && errorInfo) {
      // Custom fallback component
      if (fallback) {
        if (typeof fallback === "function") {
          return fallback(error, errorInfo);
        }
        return fallback;
      }

      // Default fallback UI
      return (
        <DefaultFallback
          error={error}
          errorInfo={errorInfo}
          showErrorDetails={showErrorDetails}
          fallbackMessage={fallbackMessage}
        />
      );
    }

    return children;
  }
}

/**
 * Higher-order component to wrap components with ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">,
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

export default ErrorBoundary;
