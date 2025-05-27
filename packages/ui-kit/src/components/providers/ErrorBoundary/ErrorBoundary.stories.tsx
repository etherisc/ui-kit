import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ErrorBoundary, withErrorBoundary } from "./ErrorBoundary";
import { logger } from "../../../utils/logger";

/**
 * Component that throws an error when triggered
 */
const ErrorThrowingComponent: React.FC<{
  shouldThrow: boolean;
  errorMessage?: string;
}> = ({
  shouldThrow,
  errorMessage = "This is a simulated error for testing purposes",
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
      <h3 className="mb-2 text-lg font-semibold">Working Component</h3>
      <p className="text-sm text-muted-foreground">
        This component is working normally. Click the button below to simulate
        an error.
      </p>
    </div>
  );
};

/**
 * Interactive demo component
 */
const ErrorBoundaryDemo: React.FC<{
  fallbackMessage?: string;
  showErrorDetails?: boolean;
  reportToSentry?: boolean;
}> = ({ fallbackMessage, showErrorDetails, reportToSentry }) => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [key, setKey] = useState(0);

  const handleThrowError = () => {
    logger.info("User triggered error simulation");
    setShouldThrow(true);
  };

  const handleReset = () => {
    logger.info("User reset error boundary");
    setShouldThrow(false);
    setKey((prev) => prev + 1); // Force remount of ErrorBoundary
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={handleThrowError}
          disabled={shouldThrow}
          className="rounded bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
        >
          Throw Error
        </button>
        <button
          onClick={handleReset}
          className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Reset
        </button>
      </div>

      <ErrorBoundary
        key={key}
        fallbackMessage={fallbackMessage}
        showErrorDetails={showErrorDetails}
        reportToSentry={reportToSentry}
        sentryContext={{
          feature: "error-boundary-demo",
          userAction: "button-click",
        }}
        onError={(error, errorInfo) => {
          logger.error("Custom error handler called", {
            error: error.message,
            componentStack: errorInfo.componentStack,
          });
        }}
      >
        <ErrorThrowingComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
};

/**
 * Custom fallback demo component
 */
const CustomFallbackDemo: React.FC = () => {
  const customFallback = (error: Error) => (
    <div className="rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 p-8 text-center">
      <div className="mb-4">
        <svg
          className="mx-auto h-16 w-16 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-bold text-orange-800">
        Oops! Something went wrong
      </h3>
      <p className="mb-4 text-orange-700">
        Custom fallback UI for error: {error.message}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
      >
        Reload Page
      </button>
    </div>
  );

  return (
    <ErrorBoundary fallback={customFallback}>
      <ErrorThrowingComponent
        shouldThrow={true}
        errorMessage="Custom fallback demo error"
      />
    </ErrorBoundary>
  );
};

/**
 * HOC demo component
 */
const WrappedErrorComponent = withErrorBoundary(ErrorThrowingComponent, {
  fallbackMessage: "This component is wrapped with withErrorBoundary HOC",
  showErrorDetails: true,
});

const HOCDemo: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="rounded border p-4">
        <p className="mb-4 text-sm text-muted-foreground">
          This component is wrapped using the withErrorBoundary HOC and will
          show an error:
        </p>
        <WrappedErrorComponent
          shouldThrow={true}
          errorMessage="HOC demo error"
        />
      </div>
    </div>
  );
};

const meta: Meta<typeof ErrorBoundary> = {
  title: "Providers/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The ErrorBoundary component catches JavaScript errors anywhere in the child component tree, 
logs those errors, and displays a fallback UI instead of the component tree that crashed.

## Features

- **Error Catching**: Catches JavaScript errors in child components
- **Sentry Integration**: Automatically reports errors to Sentry with context
- **Logging**: Uses structured logging to record error details
- **Fallback UI**: Shows user-friendly error message with optional details
- **Customizable**: Supports custom fallback components and error messages
- **Development Mode**: Shows detailed error information in development

## Usage

\`\`\`tsx
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";

// Basic usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// With custom fallback message
<ErrorBoundary fallbackMessage="Something went wrong with this feature">
  <MyComponent />
</ErrorBoundary>

// With custom error handler
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Custom error handling logic
    console.log("Error caught:", error.message);
  }}
  sentryContext={{ feature: "my-feature" }}
>
  <MyComponent />
</ErrorBoundary>
\`\`\`

## Higher-Order Component

You can also use the \`withErrorBoundary\` HOC:

\`\`\`tsx
import { withErrorBoundary } from "@/components/providers/ErrorBoundary";

const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent, {
  fallbackMessage: "This feature is temporarily unavailable",
});
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: "Child components to wrap with error boundary",
    },
    fallbackMessage: {
      control: "text",
      description: "Custom error message to display",
    },
    showErrorDetails: {
      control: "boolean",
      description:
        "Whether to show error details (automatically enabled in development)",
    },
    reportToSentry: {
      control: "boolean",
      description: "Whether to report errors to Sentry",
    },
    sentryContext: {
      control: "object",
      description: "Additional context to send to Sentry",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

/**
 * Interactive demo showing how the ErrorBoundary works
 */
export const Interactive: Story = {
  render: (args) => <ErrorBoundaryDemo {...args} />,
  args: {
    fallbackMessage: undefined,
    showErrorDetails: false,
    reportToSentry: true,
  },
};

/**
 * ErrorBoundary with custom fallback message
 */
export const CustomMessage: Story = {
  render: (args) => <ErrorBoundaryDemo {...args} />,
  args: {
    fallbackMessage:
      "This feature is temporarily unavailable. Please try again later.",
    showErrorDetails: false,
    reportToSentry: true,
  },
};

/**
 * ErrorBoundary showing error details
 */
export const WithErrorDetails: Story = {
  render: (args) => <ErrorBoundaryDemo {...args} />,
  args: {
    fallbackMessage: "Development mode - showing error details",
    showErrorDetails: true,
    reportToSentry: false,
  },
};

/**
 * ErrorBoundary with custom fallback component
 */
export const CustomFallback: Story = {
  render: () => <CustomFallbackDemo />,
  parameters: {
    // Exclude from test runner since this story intentionally throws errors
    test: {
      disable: true,
    },
  },
};

/**
 * Example of using withErrorBoundary HOC
 */
export const WithHOC: Story = {
  render: () => <HOCDemo />,
  parameters: {
    // Exclude from test runner since this story intentionally throws errors
    test: {
      disable: true,
    },
  },
};
