import React, { useState } from "react";
import { AppShellTopBar } from "./AppShellTopBar";
import type { NavigationItem, UserActionItem } from "./AppShellTopBar";
import { AppShellSidebar } from "./AppShellSidebar";
import { SidebarProvider } from "../../components/ui/Sidebar/Sidebar";
import { ContentWrapper } from "./ContentWrapper";
import { cn } from "../../utils/cn";
import type { NavItem } from "./SideNav";
import type { BreadcrumbItem } from "./Breadcrumbs";

/**
 * AppShell component props
 */
export interface AppShellProps {
  /**
   * The main content of the app
   */
  children?: React.ReactNode;
  /**
   * Optional logo element for the TopBar
   */
  logo?: React.ReactNode;
  /**
   * Optional array of navigation items for the SideNav
   */
  navItems?: NavItem[];
  /**
   * Optional navigation elements for the TopBar
   * Can be React elements (for backward compatibility) or structured NavigationItem array
   */
  topNavItems?: React.ReactNode | NavigationItem[];
  /**
   * Optional user actions for the TopBar
   * Can be React elements (for backward compatibility) or structured UserActionItem array
   */
  userActions?: React.ReactNode | UserActionItem[];
  /**
   * Optional breadcrumbs items for the ContentWrapper
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Whether the TopBar should be fixed at the top
   */
  fixedHeader?: boolean;
  /**
   * Whether the SideNav should be initially collapsed
   */
  defaultCollapsed?: boolean;
  /**
   * Optional additional className for the root element
   */
  className?: string;
  /**
   * Whether content should have a fixed width (max-width 960px)
   */
  fixedWidth?: boolean;
  /**
   * Optional footer content to display at the bottom
   */
  footer?: React.ReactNode;
}

/**
 * AppShell component serves as the main layout for the application
 * Combines AppShellTopBar, AppShellSidebar, and ContentWrapper components
 */
export const AppShell: React.FC<AppShellProps> = ({
  children,
  logo,
  navItems = [],
  topNavItems,
  userActions,
  breadcrumbs,
  fixedHeader = true,
  defaultCollapsed = false,
  className,
  fixedWidth = false,
  footer,
}) => {
  // State for sidebar collapsed state
  const [sideNavCollapsed, setSideNavCollapsed] =
    useState<boolean>(defaultCollapsed);

  // Handle sidebar collapse toggle
  const handleCollapseToggle = (collapsed: boolean) => {
    setSideNavCollapsed(collapsed);
  };

  return (
    <div
      className={cn("flex flex-col h-screen w-full bg-background", className)}
    >
      {/* AppShellTopBar */}
      <AppShellTopBar
        logo={logo}
        navigationItems={topNavItems}
        userActions={userActions}
        fixed={fixedHeader}
        data-testid="topbar"
      />

      {/* Main content area with AppShellSidebar and ContentWrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* AppShellSidebar wrapped in SidebarProvider */}
        <SidebarProvider
          defaultCollapsed={sideNavCollapsed}
          onCollapsedChange={handleCollapseToggle}
        >
          <AppShellSidebar
            items={navItems}
            collapsed={sideNavCollapsed}
            onCollapseToggle={handleCollapseToggle}
            persistCollapsed={true}
            data-testid="sidenav"
          />
        </SidebarProvider>

        {/* ContentWrapper with children */}
        <ContentWrapper breadcrumbs={breadcrumbs} fixed={fixedWidth}>
          {children}
        </ContentWrapper>
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="mt-auto p-4 bg-background border-t border-border"
          // style={{ borderColor: "hsl(var(--border))" }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

AppShell.displayName = "AppShell";
