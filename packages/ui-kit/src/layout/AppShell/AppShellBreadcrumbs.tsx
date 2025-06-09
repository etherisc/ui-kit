import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/Breadcrumb/Breadcrumb";

/**
 * Breadcrumb item structure - maintaining backward compatibility
 */
export interface BreadcrumbItemData {
  /**
   * Label to display for the breadcrumb
   */
  label: string;
  /**
   * URL to navigate to when breadcrumb is clicked
   */
  href?: string;
  /**
   * Whether this is the current/active breadcrumb
   */
  isActive?: boolean;
}

/**
 * AppShellBreadcrumbs component props
 */
export interface AppShellBreadcrumbsProps {
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItemData[];
  /**
   * Optional custom separator between breadcrumbs
   * @default ChevronRight icon
   */
  separator?: React.ReactNode;
  /**
   * Whether to truncate middle items when there are too many
   * @default false
   */
  truncate?: boolean;
  /**
   * Maximum number of items to show when truncating
   * @default 3
   */
  maxVisibleItems?: number;
  /**
   * Optional custom class name
   */
  className?: string;
}

/**
 * AppShellBreadcrumbs - Enhanced breadcrumb component using ui-kit Breadcrumb
 *
 * This component wraps the ui-kit Breadcrumb components to provide:
 * - Proper separator rendering (fixes ">/" issue)
 * - Better accessibility (WCAG 2.1 AA compliance)
 * - Advanced features (ellipsis truncation, custom separators)
 * - Backward compatibility with existing BreadcrumbItem interface
 */
export const AppShellBreadcrumbs: React.FC<AppShellBreadcrumbsProps> = ({
  items,
  separator,
  truncate = false,
  maxVisibleItems = 3,
  className,
}) => {
  // Don't render if no items provided
  if (!items || items.length === 0) {
    return null;
  }

  // Handle truncation logic
  const renderItems = () => {
    if (!truncate || items.length <= maxVisibleItems) {
      // Render all items normally
      return items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {index > 0 && (
            <BreadcrumbSeparator>
              {separator || <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
          )}
          <BreadcrumbItem>
            {item.href && !item.isActive ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </React.Fragment>
      ));
    }

    // Truncate logic - show first item, ellipsis, and last items
    const firstItem = items[0];
    const lastItems = items.slice(-2);
    const showEllipsis = items.length > maxVisibleItems;

    return (
      <>
        {/* First item */}
        <BreadcrumbItem>
          {firstItem.href && !firstItem.isActive ? (
            <BreadcrumbLink href={firstItem.href}>
              {firstItem.label}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{firstItem.label}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {/* Ellipsis if needed */}
        {showEllipsis && (
          <>
            <BreadcrumbSeparator>
              {separator || <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="flex h-9 w-9 items-center justify-center">
                <span className="text-muted-foreground">...</span>
                <span className="sr-only">More pages</span>
              </span>
            </BreadcrumbItem>
          </>
        )}

        {/* Last items */}
        {lastItems.map((item, index) => (
          <React.Fragment key={`${item.label}-last-${index}`}>
            <BreadcrumbSeparator>
              {separator || <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.href && !item.isActive ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>{renderItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

AppShellBreadcrumbs.displayName = "AppShellBreadcrumbs";
