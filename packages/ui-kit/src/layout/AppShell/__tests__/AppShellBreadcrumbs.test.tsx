import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { AppShellBreadcrumbs } from "../AppShellBreadcrumbs";
import type { BreadcrumbItemData } from "../AppShellBreadcrumbs";

// Test data
const basicBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "John Smith", href: "/customers/123" },
  { label: "Policy Details", isActive: true },
];

const singleBreadcrumb: BreadcrumbItemData[] = [
  { label: "Dashboard", isActive: true },
];

const longBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Applications", href: "/applications" },
  { label: "Web Applications", href: "/applications/web" },
  { label: "Dashboard", href: "/applications/web/dashboard" },
  { label: "Analytics", href: "/applications/web/dashboard/analytics" },
  { label: "Reports", isActive: true },
];

describe("AppShellBreadcrumbs", () => {
  describe("Basic Functionality", () => {
    it("renders breadcrumb items correctly", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Customers")).toBeInTheDocument();
      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText("Policy Details")).toBeInTheDocument();
    });

    it("renders links for non-active items with href", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} />);

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).toHaveAttribute("href", "/");

      const customersLink = screen.getByRole("link", { name: "Customers" });
      expect(customersLink).toHaveAttribute("href", "/customers");

      const johnSmithLink = screen.getByRole("link", { name: "John Smith" });
      expect(johnSmithLink).toHaveAttribute("href", "/customers/123");
    });

    it("renders active item as non-link with proper aria-current", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} />);

      const activePage = screen.getByText("Policy Details");
      expect(activePage).not.toHaveAttribute("href");
      expect(activePage.closest('[aria-current="page"]')).toBeInTheDocument();
    });

    it("renders proper navigation structure with aria-label", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} />);

      const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Separator Handling", () => {
    it("renders default ChevronRight separators", () => {
      const { container } = render(
        <AppShellBreadcrumbs items={basicBreadcrumbs} />,
      );

      // Check for ChevronRight SVG icons
      const chevronIcons = container.querySelectorAll(
        "svg.lucide-chevron-right",
      );
      expect(chevronIcons).toHaveLength(3);
    });

    it("renders custom separator when provided", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} separator=">" />);

      expect(screen.getAllByText(">")).toHaveLength(3);
    });

    it("does not render separator for single item", () => {
      const { container } = render(
        <AppShellBreadcrumbs items={singleBreadcrumb} />,
      );

      const chevronIcons = container.querySelectorAll(
        "svg.lucide-chevron-right",
      );
      expect(chevronIcons).toHaveLength(0);
    });
  });

  describe("Truncation Feature", () => {
    it("does not truncate when truncate is false", () => {
      render(<AppShellBreadcrumbs items={longBreadcrumbs} truncate={false} />);

      // All items should be visible
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Applications")).toBeInTheDocument();
      expect(screen.getByText("Web Applications")).toBeInTheDocument();
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Analytics")).toBeInTheDocument();
      expect(screen.getByText("Reports")).toBeInTheDocument();
    });

    it("truncates items when truncate is true and items exceed maxVisibleItems", () => {
      render(
        <AppShellBreadcrumbs
          items={longBreadcrumbs}
          truncate={true}
          maxVisibleItems={3}
        />,
      );

      // Should show first item, ellipsis, and last 2 items
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("...")).toBeInTheDocument();
      expect(screen.getByText("Analytics")).toBeInTheDocument();
      expect(screen.getByText("Reports")).toBeInTheDocument();

      // These should not be visible
      expect(screen.queryByText("Applications")).not.toBeInTheDocument();
      expect(screen.queryByText("Web Applications")).not.toBeInTheDocument();
      expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    });

    it("does not truncate when items count is within maxVisibleItems", () => {
      render(
        <AppShellBreadcrumbs
          items={basicBreadcrumbs}
          truncate={true}
          maxVisibleItems={5}
        />,
      );

      // All items should be visible since we have 4 items and max is 5
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Customers")).toBeInTheDocument();
      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText("Policy Details")).toBeInTheDocument();
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("includes screen reader text for ellipsis", () => {
      render(
        <AppShellBreadcrumbs
          items={longBreadcrumbs}
          truncate={true}
          maxVisibleItems={3}
        />,
      );

      expect(screen.getByText("More pages")).toBeInTheDocument();
      expect(screen.getByText("More pages")).toHaveClass("sr-only");
    });
  });

  describe("Edge Cases", () => {
    it("returns null when no items provided", () => {
      const { container } = render(<AppShellBreadcrumbs items={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("handles items without href correctly", () => {
      const itemsWithoutHref: BreadcrumbItemData[] = [
        { label: "Home" },
        { label: "Current Page", isActive: true },
      ];

      render(<AppShellBreadcrumbs items={itemsWithoutHref} />);

      // Both should be rendered as page elements, not actual links
      expect(screen.queryAllByRole("link")).toHaveLength(2); // They get role="link" from BreadcrumbPage
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <AppShellBreadcrumbs
          items={basicBreadcrumbs}
          className="custom-breadcrumbs"
        />,
      );

      expect(
        container.querySelector(".custom-breadcrumbs"),
      ).toBeInTheDocument();
    });
  });

  describe("Backward Compatibility", () => {
    it("maintains the same interface as original Breadcrumbs component", () => {
      // Test that the component accepts the same props as the original
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} separator="/" />);

      expect(screen.getAllByText("/")).toHaveLength(3);
    });

    it("works with minimal props like original component", () => {
      const { container } = render(
        <AppShellBreadcrumbs items={basicBreadcrumbs} />,
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      const chevronIcons = container.querySelectorAll(
        "svg.lucide-chevron-right",
      );
      expect(chevronIcons).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA structure", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "breadcrumb");

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("marks separators as presentation", () => {
      const { container } = render(
        <AppShellBreadcrumbs items={basicBreadcrumbs} />,
      );

      // Check that separator list items have the correct attributes
      const separatorLis = container.querySelectorAll(
        'li[role="presentation"]',
      );
      expect(separatorLis).toHaveLength(3);
      separatorLis.forEach((separator) => {
        expect(separator).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("marks active page with aria-current", () => {
      render(<AppShellBreadcrumbs items={basicBreadcrumbs} />);

      const currentPage = screen
        .getByText("Policy Details")
        .closest('[aria-current="page"]');
      expect(currentPage).toBeInTheDocument();
    });
  });
});
