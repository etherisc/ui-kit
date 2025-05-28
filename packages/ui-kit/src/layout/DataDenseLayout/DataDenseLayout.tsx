import React, { useState, useCallback } from "react";
import { cn } from "@/utils/cn";
import { DataDenseLayoutProps } from "./types";

/**
 * DataDenseLayout is a layout component optimized for data-heavy interfaces.
 * It provides compact spacing, collapsible sidebars, and efficient use of screen space.
 */
export const DataDenseLayout: React.FC<DataDenseLayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  rightSidebar,
  density = "normal",
  showBorders = true,
  stickyHeader = true,
  stickyFooter = false,
  collapsibleSidebars = true,
  leftSidebarCollapsed: initialLeftCollapsed = false,
  rightSidebarCollapsed: initialRightCollapsed = false,
  onLeftSidebarToggle,
  onRightSidebarToggle,
  leftSidebarWidth = 280,
  rightSidebarWidth = 320,
  collapsedSidebarWidth = 48,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
}) => {
  const [leftCollapsed, setLeftCollapsed] = useState(initialLeftCollapsed);
  const [rightCollapsed, setRightCollapsed] = useState(initialRightCollapsed);

  const handleLeftToggle = useCallback(() => {
    const newState = !leftCollapsed;
    setLeftCollapsed(newState);
    onLeftSidebarToggle?.(newState);
  }, [leftCollapsed, onLeftSidebarToggle]);

  const handleRightToggle = useCallback(() => {
    const newState = !rightCollapsed;
    setRightCollapsed(newState);
    onRightSidebarToggle?.(newState);
  }, [rightCollapsed, onRightSidebarToggle]);

  // Density-based spacing classes
  const densityClasses = {
    compact: {
      padding: "p-2",
      gap: "gap-1",
      headerPadding: "px-3 py-1",
      footerPadding: "px-3 py-1",
      sidebarPadding: "p-2",
    },
    normal: {
      padding: "p-4",
      gap: "gap-2",
      headerPadding: "px-4 py-2",
      footerPadding: "px-4 py-2",
      sidebarPadding: "p-3",
    },
    comfortable: {
      padding: "p-6",
      gap: "gap-4",
      headerPadding: "px-6 py-3",
      footerPadding: "px-6 py-3",
      sidebarPadding: "p-4",
    },
  }[density];

  const currentLeftWidth = leftCollapsed
    ? collapsedSidebarWidth
    : leftSidebarWidth;
  const currentRightWidth = rightCollapsed
    ? collapsedSidebarWidth
    : rightSidebarWidth;

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-background text-foreground",
        className,
      )}
    >
      {/* Header */}
      {header && (
        <header
          className={cn(
            "bg-card text-card-foreground",
            densityClasses.headerPadding,
            showBorders && "border-b",
            stickyHeader && "sticky top-0 z-30",
            headerClassName,
          )}
        >
          {header}
        </header>
      )}

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {sidebar && (
          <aside
            className={cn(
              "bg-card text-card-foreground flex-shrink-0 transition-all duration-200 ease-in-out",
              showBorders && "border-r",
            )}
            style={{ width: currentLeftWidth }}
            aria-label="Filters and navigation"
          >
            <div className="h-full flex flex-col">
              {/* Sidebar toggle button */}
              {collapsibleSidebars && (
                <div className="flex justify-end p-1">
                  <button
                    onClick={handleLeftToggle}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label={
                      leftCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                  >
                    <svg
                      className={cn(
                        "w-4 h-4 transition-transform",
                        leftCollapsed ? "rotate-0" : "rotate-180",
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Sidebar content */}
              <div
                className={cn(
                  "flex-1 overflow-y-auto",
                  densityClasses.sidebarPadding,
                  leftCollapsed && "hidden",
                )}
              >
                {sidebar}
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main
          className={cn(
            "flex-1 overflow-auto",
            densityClasses.padding,
            contentClassName,
          )}
          role="main"
        >
          {children}
        </main>

        {/* Right Sidebar */}
        {rightSidebar && (
          <aside
            className={cn(
              "bg-card text-card-foreground flex-shrink-0 transition-all duration-200 ease-in-out",
              showBorders && "border-l",
            )}
            style={{ width: currentRightWidth }}
            aria-label="Details and actions"
          >
            <div className="h-full flex flex-col">
              {/* Sidebar toggle button */}
              {collapsibleSidebars && (
                <div className="flex justify-start p-1">
                  <button
                    onClick={handleRightToggle}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label={
                      rightCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                  >
                    <svg
                      className={cn(
                        "w-4 h-4 transition-transform",
                        rightCollapsed ? "rotate-180" : "rotate-0",
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Sidebar content */}
              <div
                className={cn(
                  "flex-1 overflow-y-auto",
                  densityClasses.sidebarPadding,
                  rightCollapsed && "hidden",
                )}
              >
                {rightSidebar}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <footer
          className={cn(
            "bg-card text-card-foreground",
            densityClasses.footerPadding,
            showBorders && "border-t",
            stickyFooter && "sticky bottom-0 z-30",
            footerClassName,
          )}
        >
          {footer}
        </footer>
      )}
    </div>
  );
};

DataDenseLayout.displayName = "DataDenseLayout";
