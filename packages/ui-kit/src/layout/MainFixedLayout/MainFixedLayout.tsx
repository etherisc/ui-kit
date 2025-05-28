import React from "react";
import { cn } from "@/utils/cn";
import { MainFixedLayoutProps } from "./types";

/**
 * MainFixedLayout is a layout component with fixed positioning for headers, footers, and sidebars.
 * It provides a flexible layout system where elements can be positioned absolutely while content flows around them.
 */
export const MainFixedLayout: React.FC<MainFixedLayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  rightSidebar,
  fixedHeader = true,
  fixedFooter = true,
  fixedSidebar = true,
  fixedRightSidebar = true,
  headerHeight = 64,
  footerHeight = 64,
  sidebarWidth = 256,
  rightSidebarWidth = 256,
  contentPadding = true,
  className,
  contentClassName,
}) => {
  // Calculate content area styles based on fixed elements
  const contentStyle: React.CSSProperties = {
    paddingTop: fixedHeader && header ? headerHeight : 0,
    paddingBottom: fixedFooter && footer ? footerHeight : 0,
    paddingLeft: fixedSidebar && sidebar ? sidebarWidth : 0,
    paddingRight: fixedRightSidebar && rightSidebar ? rightSidebarWidth : 0,
  };

  return (
    <div className={cn("relative min-h-screen bg-background", className)}>
      {/* Fixed Header */}
      {header && (
        <div
          className={cn(
            "bg-card border-b z-40",
            fixedHeader ? "fixed top-0 left-0 right-0" : "relative",
          )}
          style={fixedHeader ? { height: headerHeight } : undefined}
        >
          <div className="h-full flex items-center">{header}</div>
        </div>
      )}

      {/* Fixed Left Sidebar */}
      {sidebar && (
        <div
          className={cn(
            "bg-card border-r z-30",
            fixedSidebar ? "fixed left-0 top-0 bottom-0" : "relative",
          )}
          style={{
            width: sidebarWidth,
            top: fixedSidebar && fixedHeader && header ? headerHeight : 0,
            bottom: fixedSidebar && fixedFooter && footer ? footerHeight : 0,
          }}
        >
          <div className="h-full overflow-y-auto">{sidebar}</div>
        </div>
      )}

      {/* Fixed Right Sidebar */}
      {rightSidebar && (
        <div
          className={cn(
            "bg-card border-l z-30",
            fixedRightSidebar ? "fixed right-0 top-0 bottom-0" : "relative",
          )}
          style={{
            width: rightSidebarWidth,
            top: fixedRightSidebar && fixedHeader && header ? headerHeight : 0,
            bottom:
              fixedRightSidebar && fixedFooter && footer ? footerHeight : 0,
          }}
        >
          <div className="h-full overflow-y-auto">{rightSidebar}</div>
        </div>
      )}

      {/* Main Content Area */}
      <main
        className={cn(
          "min-h-screen",
          contentPadding && "p-6",
          contentClassName,
        )}
        style={contentStyle}
        role="main"
      >
        <div className="h-full">{children}</div>
      </main>

      {/* Fixed Footer */}
      {footer && (
        <div
          className={cn(
            "bg-card border-t z-40",
            fixedFooter ? "fixed bottom-0 left-0 right-0" : "relative",
          )}
          style={fixedFooter ? { height: footerHeight } : undefined}
        >
          <div className="h-full flex items-center">{footer}</div>
        </div>
      )}
    </div>
  );
};

MainFixedLayout.displayName = "MainFixedLayout";
