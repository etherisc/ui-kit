import React from "react";
import { cn } from "../../utils/cn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/Card/Card";
import { Logo } from "../../components/layout/Logo";

/**
 * MinimalShell component props
 */
export interface MinimalShellProps {
  /**
   * Main title
   */
  title: string;
  /**
   * Optional subtitle or description text
   */
  message?: string;
  /**
   * Optional main content to be displayed
   */
  children?: React.ReactNode;
  /**
   * Optional action buttons or links
   */
  actions?: React.ReactNode;
  /**
   * Optional image or icon to display
   */
  image?: React.ReactNode;
  /**
   * Optional logo element
   */
  logo?: React.ReactNode;
  /**
   * Optional additional CSS class name
   */
  className?: string;
}

/**
 * MinimalShell - Simple centered layout for error pages and simple screens
 *
 * Features:
 * - Centered content with logo, title, message, and optional actions
 * - Useful for error pages (404, 500), maintenance screens, or simple layouts
 */
export const MinimalShell: React.FC<MinimalShellProps> = ({
  title,
  message,
  children,
  actions,
  image,
  logo,
  className,
}) => {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-background p-4",
        className,
      )}
    >
      {/* Logo area */}
      <header className="mb-6">{logo || <Logo text="Company Name" />}</header>

      <Card className="max-w-md w-full text-center">
        <CardHeader className="flex flex-col items-center">
          {/* Image/icon if provided */}
          {image && (
            <div className="flex justify-center mb-2" aria-hidden="true">
              {image}
            </div>
          )}

          {/* Title */}
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>

          {/* Message */}
          {message && (
            <CardDescription className="text-muted-foreground">
              {message}
            </CardDescription>
          )}
        </CardHeader>

        {/* Main content */}
        {children && <CardContent>{children}</CardContent>}

        {/* Action buttons */}
        {actions && (
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            {actions}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

MinimalShell.displayName = "MinimalShell";
