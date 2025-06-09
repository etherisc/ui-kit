import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { AppShell } from "../AppShell";
import { HomeIcon } from "lucide-react";
import type { NavItem } from "../AppShellSidebar";
import type { BreadcrumbItemData } from "../AppShellBreadcrumbs";
import { vi } from "vitest";

// Mock the new wrapper components
vi.mock("../AppShellTopBar", () => ({
  AppShellTopBar: ({
    logo,
    navigationItems,
    userActions,
    fixed,
  }: {
    logo?: React.ReactNode;
    navigationItems?: React.ReactNode;
    userActions?: React.ReactNode;
    fixed?: boolean;
  }) => (
    <div data-testid="appshell-topbar" data-fixed={fixed}>
      {logo && <div data-testid="logo">{logo}</div>}
      {navigationItems && <div data-testid="nav-items">{navigationItems}</div>}
      {userActions && <div data-testid="user-actions">{userActions}</div>}
    </div>
  ),
}));

vi.mock("../AppShellSidebar", () => ({
  AppShellSidebar: ({
    items = [],
    collapsed,
    onCollapseToggle,
  }: {
    items?: NavItem[];
    collapsed?: boolean;
    onCollapseToggle?: (collapsed: boolean) => void;
  }) => (
    <div data-testid="appshell-sidebar" data-collapsed={collapsed}>
      {items.length} items
      <button
        data-testid="sidebar-toggle"
        onClick={() => onCollapseToggle?.(!collapsed)}
      >
        Toggle
      </button>
    </div>
  ),
}));

vi.mock("../ContentWrapper", () => ({
  ContentWrapper: ({
    children,
    breadcrumbs,
    fixed,
  }: {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItemData[];
    fixed?: boolean;
  }) => (
    <div data-testid="content-wrapper" data-fixed={fixed}>
      {breadcrumbs && (
        <div data-testid="breadcrumbs">{breadcrumbs.length} breadcrumbs</div>
      )}
      <div data-testid="content">{children}</div>
    </div>
  ),
}));

// Mock SidebarProvider to prevent context errors
vi.mock("../../components/ui/Sidebar/Sidebar", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
}));

describe("AppShell", () => {
  const mockNavItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon data-testid="home-icon" />,
      href: "/home",
      isActive: true,
    },
  ];

  const mockBreadcrumbs: BreadcrumbItemData[] = [
    { label: "Home", href: "/" },
    { label: "Details", isActive: true },
  ];

  it("renders with all components", () => {
    render(
      <AppShell
        logo={<span>Logo</span>}
        navItems={mockNavItems}
        topNavItems={<span>Navigation</span>}
        userActions={<span>User</span>}
        breadcrumbs={mockBreadcrumbs}
      >
        Content
      </AppShell>,
    );

    expect(screen.getByTestId("appshell-topbar")).toBeInTheDocument();
    expect(screen.getByTestId("appshell-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("content-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("passes fixed prop to ContentWrapper when fixedWidth is true", () => {
    render(<AppShell fixedWidth={true}>Content</AppShell>);

    const contentWrapper = screen.getByTestId("content-wrapper");
    expect(contentWrapper).toHaveAttribute("data-fixed", "true");
  });

  it("passes collapsed prop to AppShellSidebar based on defaultCollapsed", () => {
    render(
      <AppShell defaultCollapsed={true} navItems={mockNavItems}>
        Content
      </AppShell>,
    );

    const sidebar = screen.getByTestId("appshell-sidebar");
    expect(sidebar).toHaveAttribute("data-collapsed", "true");
  });

  it("passes fixed prop to AppShellTopBar based on fixedHeader", () => {
    render(<AppShell fixedHeader={false}>Content</AppShell>);

    const topbar = screen.getByTestId("appshell-topbar");
    expect(topbar).toHaveAttribute("data-fixed", "false");
  });

  it("renders with minimal props", () => {
    render(<AppShell>Content</AppShell>);

    expect(screen.getByTestId("appshell-topbar")).toBeInTheDocument();
    expect(screen.getByTestId("appshell-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("content-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("passes logo to AppShellTopBar", () => {
    const logo = <div data-testid="test-logo">Test Logo</div>;

    render(<AppShell logo={logo}>Content</AppShell>);

    expect(screen.getByTestId("test-logo")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("passes userActions to AppShellTopBar", () => {
    const userActions = <div data-testid="test-user-actions">User Menu</div>;

    render(<AppShell userActions={userActions}>Content</AppShell>);

    expect(screen.getByTestId("test-user-actions")).toBeInTheDocument();
    expect(screen.getByTestId("user-actions")).toBeInTheDocument();
  });

  it("passes topNavItems to AppShellTopBar", () => {
    const navItems = <div data-testid="test-nav-items">Navigation</div>;

    render(<AppShell topNavItems={navItems}>Content</AppShell>);

    expect(screen.getByTestId("test-nav-items")).toBeInTheDocument();
    expect(screen.getByTestId("nav-items")).toBeInTheDocument();
  });

  it("passes breadcrumbs to ContentWrapper", () => {
    render(<AppShell breadcrumbs={mockBreadcrumbs}>Content</AppShell>);

    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("2 breadcrumbs")).toBeInTheDocument();
  });

  it("passes navItems to AppShellSidebar", () => {
    render(<AppShell navItems={mockNavItems}>Content</AppShell>);

    expect(screen.getByText("1 items")).toBeInTheDocument();
  });
});
