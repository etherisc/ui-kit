import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { AppShellSidebar } from "../AppShellSidebar";
import { SidebarProvider } from "../../../components/ui/Sidebar/Sidebar";
import type { NavItem } from "../AppShellSidebar";
import { HomeIcon, SettingsIcon, UsersIcon } from "lucide-react";

// Test data
const basicNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon data-testid="home-icon" />,
    href: "/",
    isActive: true,
  },
  {
    id: "users",
    label: "Users",
    icon: <UsersIcon data-testid="users-icon" />,
    href: "/users",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon data-testid="settings-icon" />,
    href: "/settings",
  },
];

const nestedNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon data-testid="home-icon" />,
    href: "/",
    isActive: true,
  },
  {
    id: "admin",
    label: "Administration",
    icon: <SettingsIcon data-testid="admin-icon" />,
    children: [
      {
        id: "users",
        label: "Users",
        href: "/admin/users",
      },
      {
        id: "roles",
        label: "Roles",
        href: "/admin/roles",
      },
    ],
    isExpanded: true,
  },
];

const groupNavItems: NavItem[] = [
  {
    id: "main-group",
    label: "Main",
    isGroup: true,
  },
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon data-testid="home-icon" />,
    href: "/",
  },
  {
    id: "admin-group",
    label: "Administration",
    isGroup: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon data-testid="settings-icon" />,
    href: "/settings",
  },
];

// Wrapper component that provides SidebarProvider context
const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <SidebarProvider>{children}</SidebarProvider>;

describe("AppShellSidebar", () => {
  describe("Basic Functionality", () => {
    it("renders navigation items correctly", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("renders icons for navigation items", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      expect(screen.getByTestId("home-icon")).toBeInTheDocument();
      expect(screen.getByTestId("users-icon")).toBeInTheDocument();
      expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
    });

    it("renders links for items with href", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toHaveAttribute("href", "/");

      const usersLink = screen.getByRole("link", { name: /users/i });
      expect(usersLink).toHaveAttribute("href", "/users");
    });

    it("highlights active navigation item", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      const homeItem = screen.getByText("Home").closest("div");
      expect(homeItem).toHaveClass("bg-accent");
    });

    it("renders collapse/expand trigger", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Nested Navigation", () => {
    it("renders nested navigation items", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={nestedNavItems} />
        </SidebarWrapper>,
      );

      expect(screen.getByText("Administration")).toBeInTheDocument();
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("Roles")).toBeInTheDocument();
    });

    it("shows chevron icons for expandable items", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={nestedNavItems} />
        </SidebarWrapper>,
      );

      // Should show ChevronDown for expanded item
      const chevronDown = screen
        .getByText("Administration")
        .closest("div")
        ?.querySelector("svg");
      expect(chevronDown).toBeInTheDocument();
    });

    it("toggles nested items when parent is clicked", () => {
      const collapsedNestedItems = nestedNavItems.map((item) =>
        item.id === "admin" ? { ...item, isExpanded: false } : item,
      );

      render(
        <SidebarWrapper>
          <AppShellSidebar items={collapsedNestedItems} />
        </SidebarWrapper>,
      );

      // Initially, nested items should not be visible
      expect(screen.queryByText("Users")).not.toBeInTheDocument();
      expect(screen.queryByText("Roles")).not.toBeInTheDocument();

      // Click on Administration to expand
      fireEvent.click(screen.getByText("Administration"));

      // Now nested items should be visible
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("Roles")).toBeInTheDocument();
    });
  });

  describe("Group Headers", () => {
    it("renders group headers correctly", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={groupNavItems} />
        </SidebarWrapper>,
      );

      expect(screen.getByText("Main")).toBeInTheDocument();
      expect(screen.getByText("Administration")).toBeInTheDocument();
    });

    it("applies correct styling to group headers", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={groupNavItems} />
        </SidebarWrapper>,
      );

      const mainGroup = screen.getByText("Main");
      expect(mainGroup).toHaveClass("text-muted-foreground");
      expect(mainGroup).toHaveClass("uppercase");
    });
  });

  describe("Header and Footer", () => {
    it("renders header when provided", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar
            items={basicNavItems}
            header={<div data-testid="sidebar-header">Header Content</div>}
          />
        </SidebarWrapper>,
      );

      expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
      expect(screen.getByText("Header Content")).toBeInTheDocument();
    });

    it("renders footer when provided", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar
            items={basicNavItems}
            footer={<div data-testid="sidebar-footer">Footer Content</div>}
          />
        </SidebarWrapper>,
      );

      expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });

    it("places trigger in header when header is provided", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar
            items={basicNavItems}
            header={<div data-testid="sidebar-header">Header</div>}
          />
        </SidebarWrapper>,
      );

      const headerContent = screen.getByTestId("sidebar-header");
      const trigger = screen.getByRole("button");

      // Both header content and trigger should be present
      expect(headerContent).toBeInTheDocument();
      expect(trigger).toBeInTheDocument();

      // They should be siblings in the same SidebarHeader container
      const sidebarHeaderContainer = headerContent.parentElement;
      expect(sidebarHeaderContainer).toContainElement(headerContent);
      expect(sidebarHeaderContainer).toContainElement(trigger);
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler when navigation item is clicked", () => {
      const handleClick = vi.fn();
      const itemsWithClick = [
        {
          ...basicNavItems[0],
          onClick: handleClick,
        },
      ];

      render(
        <SidebarWrapper>
          <AppShellSidebar items={itemsWithClick} />
        </SidebarWrapper>,
      );

      fireEvent.click(screen.getByText("Home"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onCollapseToggle when collapse state changes", () => {
      const handleCollapseToggle = vi.fn();

      render(
        <SidebarWrapper>
          <AppShellSidebar
            items={basicNavItems}
            onCollapseToggle={handleCollapseToggle}
          />
        </SidebarWrapper>,
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      expect(handleCollapseToggle).toHaveBeenCalled();
    });
  });

  describe("Empty State", () => {
    it("renders empty state when no items provided", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={[]} />
        </SidebarWrapper>,
      );

      expect(screen.getByText("No navigation items")).toBeInTheDocument();
    });

    it("renders empty state when items prop is undefined", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar />
        </SidebarWrapper>,
      );

      expect(screen.getByText("No navigation items")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA structure", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("applies data-testid when provided", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} data-testid="test-sidebar" />
        </SidebarWrapper>,
      );

      expect(screen.getByTestId("test-sidebar")).toBeInTheDocument();
    });
  });

  describe("Backward Compatibility", () => {
    it("maintains the same interface as original SideNav component", () => {
      // Test that the component accepts the same props as the original
      render(
        <SidebarWrapper>
          <AppShellSidebar
            items={basicNavItems}
            collapsed={false}
            persistCollapsed={true}
            className="custom-sidebar"
          />
        </SidebarWrapper>,
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("works with minimal props like original component", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar items={basicNavItems} />
        </SidebarWrapper>,
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      render(
        <SidebarWrapper>
          <AppShellSidebar
            items={basicNavItems}
            className="custom-sidebar"
            data-testid="sidebar"
          />
        </SidebarWrapper>,
      );

      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar).toHaveClass("custom-sidebar");
    });
  });
});
