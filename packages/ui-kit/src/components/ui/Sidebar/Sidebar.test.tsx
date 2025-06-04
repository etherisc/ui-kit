import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  useSidebar,
} from "./Sidebar";

// Mock window.innerWidth for responsive tests
const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

// Test component to access useSidebar hook
interface SidebarState {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const TestComponent = ({
  onStateChange,
}: {
  onStateChange?: (state: SidebarState) => void;
}) => {
  const sidebarState = useSidebar();

  React.useEffect(() => {
    onStateChange?.(sidebarState);
  }, [sidebarState, onStateChange]);

  return (
    <div>
      <span data-testid="collapsed">{sidebarState.isCollapsed.toString()}</span>
      <span data-testid="open">{sidebarState.isOpen.toString()}</span>
      <span data-testid="mobile">{sidebarState.isMobile.toString()}</span>
    </div>
  );
};

const BasicSidebar = () => (
  <SidebarProvider>
    <Sidebar data-testid="sidebar">
      <SidebarHeader data-testid="sidebar-header">
        <h2>App Name</h2>
        <SidebarTrigger data-testid="sidebar-trigger" />
      </SidebarHeader>
      <SidebarContent data-testid="sidebar-content">
        <SidebarNav data-testid="sidebar-nav">
          <SidebarNavItem
            data-testid="nav-item-home"
            icon={<Home className="h-4 w-4" />}
            isActive
          >
            Home
          </SidebarNavItem>
          <SidebarNavItem
            data-testid="nav-item-settings"
            icon={<Settings className="h-4 w-4" />}
          >
            Settings
          </SidebarNavItem>
          <SidebarNavItem data-testid="nav-item-disabled" disabled>
            Disabled
          </SidebarNavItem>
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter data-testid="sidebar-footer">Footer content</SidebarFooter>
    </Sidebar>
    <TestComponent />
  </SidebarProvider>
);

describe("Sidebar", () => {
  beforeEach(() => {
    // Reset window width to desktop
    mockWindowWidth(1024);
  });

  describe("Basic Rendering", () => {
    it("renders sidebar with all sub-components", () => {
      render(<BasicSidebar />);

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-nav")).toBeInTheDocument();
      expect(screen.getByText("App Name")).toBeInTheDocument();
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("renders navigation items correctly", () => {
      render(<BasicSidebar />);

      expect(screen.getByTestId("nav-item-home")).toBeInTheDocument();
      expect(screen.getByTestId("nav-item-settings")).toBeInTheDocument();
      expect(screen.getByTestId("nav-item-disabled")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Disabled")).toBeInTheDocument();
    });

    it("applies correct classes for active nav item", () => {
      render(<BasicSidebar />);

      const activeItem = screen.getByTestId("nav-item-home");
      expect(activeItem).toHaveClass("bg-accent", "text-accent-foreground");
    });

    it("applies correct classes for disabled nav item", () => {
      render(<BasicSidebar />);

      const disabledItem = screen.getByTestId("nav-item-disabled");
      expect(disabledItem).toHaveClass("opacity-50", "pointer-events-none");
    });
  });

  describe("SidebarProvider", () => {
    it("provides default context values", () => {
      render(<BasicSidebar />);

      expect(screen.getByTestId("collapsed")).toHaveTextContent("false");
      expect(screen.getByTestId("open")).toHaveTextContent("true");
      expect(screen.getByTestId("mobile")).toHaveTextContent("false");
    });

    it("respects defaultCollapsed prop", () => {
      render(
        <SidebarProvider defaultCollapsed>
          <TestComponent />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("collapsed")).toHaveTextContent("true");
    });

    it("respects defaultOpen prop", () => {
      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("open")).toHaveTextContent("false");
    });

    it("calls onCollapsedChange callback", () => {
      const onCollapsedChange = vi.fn();
      let sidebarState: SidebarState;

      render(
        <SidebarProvider onCollapsedChange={onCollapsedChange}>
          <TestComponent onStateChange={(state) => (sidebarState = state)} />
        </SidebarProvider>,
      );

      act(() => {
        sidebarState.setIsCollapsed(true);
      });

      expect(onCollapsedChange).toHaveBeenCalledWith(true);
    });

    it("calls onOpenChange callback", () => {
      const onOpenChange = vi.fn();
      let sidebarState: SidebarState;

      render(
        <SidebarProvider onOpenChange={onOpenChange}>
          <TestComponent onStateChange={(state) => (sidebarState = state)} />
        </SidebarProvider>,
      );

      act(() => {
        sidebarState.setIsOpen(false);
      });

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Responsive Behavior", () => {
    it("detects mobile viewport", () => {
      act(() => {
        mockWindowWidth(500);
      });

      render(<BasicSidebar />);

      expect(screen.getByTestId("mobile")).toHaveTextContent("true");
    });

    it("detects desktop viewport", () => {
      act(() => {
        mockWindowWidth(1024);
      });

      render(<BasicSidebar />);

      expect(screen.getByTestId("mobile")).toHaveTextContent("false");
    });

    it("updates mobile state on window resize", () => {
      render(<BasicSidebar />);

      expect(screen.getByTestId("mobile")).toHaveTextContent("false");

      act(() => {
        mockWindowWidth(500);
      });

      expect(screen.getByTestId("mobile")).toHaveTextContent("true");

      act(() => {
        mockWindowWidth(1024);
      });

      expect(screen.getByTestId("mobile")).toHaveTextContent("false");
    });
  });

  describe("SidebarTrigger", () => {
    it("toggles collapsed state on desktop", async () => {
      const user = userEvent.setup();
      render(<BasicSidebar />);

      const trigger = screen.getByTestId("sidebar-trigger");
      expect(screen.getByTestId("collapsed")).toHaveTextContent("false");

      await user.click(trigger);
      expect(screen.getByTestId("collapsed")).toHaveTextContent("true");

      await user.click(trigger);
      expect(screen.getByTestId("collapsed")).toHaveTextContent("false");
    });

    it("toggles open state on mobile", async () => {
      const user = userEvent.setup();

      act(() => {
        mockWindowWidth(500);
      });

      render(<BasicSidebar />);

      const trigger = screen.getByTestId("sidebar-trigger");
      expect(screen.getByTestId("open")).toHaveTextContent("true");

      await user.click(trigger);
      expect(screen.getByTestId("open")).toHaveTextContent("false");

      await user.click(trigger);
      expect(screen.getByTestId("open")).toHaveTextContent("true");
    });
  });

  describe("Variants and Sizes", () => {
    it("applies size variants correctly", () => {
      const { rerender } = render(
        <SidebarProvider>
          <Sidebar size="sm" data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass("w-48");

      rerender(
        <SidebarProvider>
          <Sidebar size="lg" data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass("w-80");
    });

    it("applies variant styles correctly", () => {
      const { rerender } = render(
        <SidebarProvider>
          <Sidebar variant="ghost" data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass(
        "bg-transparent",
        "border-none",
      );

      rerender(
        <SidebarProvider>
          <Sidebar variant="default" data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass("bg-background");
    });

    it("applies position variants correctly", () => {
      const { rerender } = render(
        <SidebarProvider>
          <Sidebar position="right" data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass(
        "right-0",
        "border-l",
        "border-r-0",
      );

      rerender(
        <SidebarProvider>
          <Sidebar position="left" data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass("left-0");
    });

    it("changes to icon size when collapsed", () => {
      render(
        <SidebarProvider defaultCollapsed>
          <Sidebar data-testid="sidebar" />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("sidebar")).toHaveClass("w-16");
    });
  });

  describe("SidebarNavItem Collapsed State", () => {
    it("shows only icons when collapsed", () => {
      render(
        <SidebarProvider defaultCollapsed>
          <Sidebar>
            <SidebarContent>
              <SidebarNav>
                <SidebarNavItem
                  data-testid="nav-item"
                  icon={<Home className="h-4 w-4" />}
                >
                  Home
                </SidebarNavItem>
              </SidebarNav>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>,
      );

      const navItem = screen.getByTestId("nav-item");
      expect(navItem).toHaveClass("justify-center", "px-2");

      // Text should be hidden with sr-only
      const text = screen.getByText("Home");
      expect(text).toHaveClass("sr-only");
    });

    it("shows full content when expanded", () => {
      render(
        <SidebarProvider defaultCollapsed={false}>
          <Sidebar>
            <SidebarContent>
              <SidebarNav>
                <SidebarNavItem
                  data-testid="nav-item"
                  icon={<Home className="h-4 w-4" />}
                >
                  Home
                </SidebarNavItem>
              </SidebarNav>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>,
      );

      const text = screen.getByText("Home");
      expect(text).not.toHaveClass("sr-only");
      expect(text).toHaveClass("truncate");
    });
  });

  describe("Mobile Overlay", () => {
    it("renders overlay when open on mobile", () => {
      act(() => {
        mockWindowWidth(500);
      });

      render(
        <SidebarProvider>
          <Sidebar overlay data-testid="sidebar">
            <SidebarContent>Content</SidebarContent>
          </Sidebar>
        </SidebarProvider>,
      );

      // Should render overlay
      const overlay = document.querySelector(
        ".fixed.inset-0.z-40.bg-black\\/50",
      );
      expect(overlay).toBeInTheDocument();
    });

    it("closes sidebar when overlay is clicked", async () => {
      const user = userEvent.setup();

      act(() => {
        mockWindowWidth(500);
      });

      render(
        <SidebarProvider>
          <Sidebar overlay data-testid="sidebar">
            <SidebarContent>Content</SidebarContent>
          </Sidebar>
          <TestComponent />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("open")).toHaveTextContent("true");

      const overlay = document.querySelector(
        ".fixed.inset-0.z-40.bg-black\\/50",
      ) as HTMLElement;
      await user.click(overlay);

      expect(screen.getByTestId("open")).toHaveTextContent("false");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<BasicSidebar />);

      const nav = screen.getByTestId("sidebar-nav");
      expect(nav.tagName).toBe("NAV");
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<BasicSidebar />);

      const trigger = screen.getByTestId("sidebar-trigger");

      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(screen.getByTestId("collapsed")).toHaveTextContent("true");
    });

    it("provides screen reader content for collapsed state", () => {
      render(
        <SidebarProvider defaultCollapsed>
          <Sidebar>
            <SidebarContent>
              <SidebarNav>
                <SidebarNavItem icon={<Home className="h-4 w-4" />}>
                  Home
                </SidebarNavItem>
              </SidebarNav>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>,
      );

      const srText = screen.getByText("Home");
      expect(srText).toHaveClass("sr-only");
    });
  });

  describe("Error Handling", () => {
    it("throws error when useSidebar is used outside provider", () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        render(<TestComponent />);
      }).toThrow("useSidebar must be used within a SidebarProvider");

      console.error = originalError;
    });
  });
});
