import { ReactNode } from "react";

/**
 * Props for the ErrorShell component
 */
export interface ErrorShellProps {
  /**
   * Error title to display
   */
  title?: string;

  /**
   * Error message or description
   */
  message?: string;

  /**
   * Error code (e.g., 404, 500, etc.)
   */
  errorCode?: string | number;

  /**
   * Custom error icon or illustration
   */
  icon?: ReactNode;

  /**
   * Action buttons or links (e.g., "Go Home", "Try Again")
   */
  actions?: ReactNode;

  /**
   * Additional content to display below the error message
   */
  children?: ReactNode;

  /**
   * Optional additional class name for the container
   */
  className?: string;

  /**
   * Size variant of the error shell
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether to show a background pattern or keep it minimal
   * @default false
   */
  showPattern?: boolean;
}
