import React from "react";
import { cn } from "@/utils/cn";
import { ErrorShellProps } from "./types";

/**
 * ErrorShell is a layout component for displaying error pages and error states.
 * It provides a centered container with error information, actions, and optional custom content.
 */
export const ErrorShell: React.FC<ErrorShellProps> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again later.",
  errorCode,
  icon,
  actions,
  children,
  className,
  size = "md",
  showPattern = false,
}) => {
  const containerSizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[size];

  const defaultIcon = (
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-destructive/10">
      <svg
        className="w-8 h-8 text-destructive"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={cn(
        "min-h-screen bg-background flex flex-col items-center justify-center p-4",
        showPattern && "bg-gradient-to-br from-background to-muted/20",
        className,
      )}
      role="main"
      aria-labelledby="error-title"
      aria-describedby="error-message"
    >
      {showPattern && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
      )}

      <div
        className={cn(
          "relative w-full flex flex-col items-center text-center p-8 rounded-lg bg-card text-card-foreground shadow-sm border",
          containerSizeClass,
        )}
      >
        {/* Error Code */}
        {errorCode && (
          <div
            className="text-6xl font-bold text-muted-foreground/30 mb-2"
            aria-hidden="true"
          >
            {errorCode}
          </div>
        )}

        {/* Icon */}
        <div className="mb-6">{icon || defaultIcon}</div>

        {/* Title */}
        <h1
          id="error-title"
          className="text-2xl font-semibold text-foreground mb-4"
        >
          {title}
        </h1>

        {/* Message */}
        <p
          id="error-message"
          className="text-muted-foreground mb-6 leading-relaxed"
        >
          {message}
        </p>

        {/* Actions */}
        {actions && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full justify-center">
            {actions}
          </div>
        )}

        {/* Additional Content */}
        {children && (
          <div className="w-full border-t pt-6 mt-6">{children}</div>
        )}
      </div>
    </div>
  );
};

ErrorShell.displayName = "ErrorShell";
