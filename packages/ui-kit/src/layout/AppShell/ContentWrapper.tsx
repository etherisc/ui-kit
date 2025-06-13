import React from "react";
import { AppShellBreadcrumbs } from "./AppShellBreadcrumbs";
import { BreadcrumbItem } from "./Breadcrumbs";
import { cn } from "../../utils/cn";

/**
 * ContentWrapper component props
 */
export interface ContentWrapperProps {
  /**
   * Content to display
   */
  children: React.ReactNode;
  /**
   * Optional breadcrumbs to display above content
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Whether the content should be fixed width (max-width: 960px)
   */
  fixed?: boolean;
  /**
   * Optional custom header content
   */
  header?: React.ReactNode;
  /**
   * Optional custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Optional additional className
   */
  className?: string;
}

/**
 * ContentWrapper - Main content area for the AppShell layout
 */
export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  breadcrumbs,
  fixed = false,
  header,
  footer,
  className,
}) => {
  return (
    <main className={cn("flex flex-col flex-1 overflow-auto", className)}>
      {/* Breadcrumbs section */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div
          className={cn("py-2 px-4 border-b bg-muted/40", "border-border")}
          // style={{ borderColor: "hsl(var(--border))" }}
        >
          <AppShellBreadcrumbs items={breadcrumbs} />
        </div>
      )}

      {/* Custom header if provided */}
      {header && (
        <div
          className="content-header border-b border-border"
          // style={{ borderColor: "hsl(var(--border))" }}
        >
          {header}
        </div>
      )}

      {/* Main content */}
      <div
        className={cn(
          "flex-1 p-4 md:p-6",
          fixed && "container max-w-[960px] mx-auto",
        )}
      >
        {children}
      </div>

      {/* Custom footer if provided */}
      {footer && (
        <div
          className="content-footer border-t border-border mt-auto"
          // style={{ borderColor: "hsl(var(--border))" }}
        >
          {footer}
        </div>
      )}
    </main>
  );
};

ContentWrapper.displayName = "ContentWrapper";
