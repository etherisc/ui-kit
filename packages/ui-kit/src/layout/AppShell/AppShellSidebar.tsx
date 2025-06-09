import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarTrigger,
  useSidebar,
} from "../../components/ui/Sidebar/Sidebar";
import { cn } from "../../utils/cn";

// Local storage key for persisting collapsed state (same as original SideNav)
const SIDENAV_COLLAPSED_KEY = "ui-kit-sidenav-collapsed";

/**
 * Navigation item structure - maintaining backward compatibility with SideNav
 */
export interface NavItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Display label for the item
   */
  label: string;
  /**
   * Icon element to display next to the label
   */
  icon?: React.ReactNode;
  /**
   * URL to navigate to when item is clicked
   */
  href?: string;
  /**
   * Whether the item is currently active
   */
  isActive?: boolean;
  /**
   * Optional callback when item is clicked
   */
  onClick?: () => void;
  /**
   * Optional children items for nested navigation
   */
  children?: NavItem[];
  /**
   * Whether this is a group/section header
   */
  isGroup?: boolean;
  /**
   * Whether a group is expanded (for groups with children)
   */
  isExpanded?: boolean;
}

/**
 * AppShellSidebar component props
 */
export interface AppShellSidebarProps {
  /**
   * Array of navigation items to display
   */
  items?: NavItem[];
  /**
   * Whether the navigation is collapsed (icon-only mode)
   */
  collapsed?: boolean;
  /**
   * Callback when collapse state changes
   */
  onCollapseToggle?: (collapsed: boolean) => void;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Whether to persist collapsed state in localStorage
   */
  persistCollapsed?: boolean;
  /**
   * Optional data-testid for testing
   */
  "data-testid"?: string;
  /**
   * Optional header content
   */
  header?: React.ReactNode;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

/**
 * Internal component that renders navigation items using ui-kit Sidebar components
 */
const SidebarNavItems: React.FC<{
  items: NavItem[];
  level?: number;
  onItemClick?: (item: NavItem) => void;
}> = ({ items, level = 0, onItemClick }) => {
  const { isCollapsed } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
    // Handle expansion for items with children
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      toggleExpanded(item.id);
    }

    // Call the item's onClick handler
    if (item.onClick) {
      item.onClick();
    }

    // Call the parent's onItemClick handler
    onItemClick?.(item);
  };

  return (
    <div className={cn(level > 0 && "ml-4")}>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.has(item.id) || item.isExpanded;
        const showChildren = hasChildren && !isCollapsed && isExpanded;

        return (
          <div key={item.id}>
            {/* Group header */}
            {item.isGroup ? (
              <div
                className={cn(
                  "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                  isCollapsed && "sr-only",
                )}
              >
                {item.label}
              </div>
            ) : (
              /* Navigation item */
              <SidebarNavItem
                icon={item.icon}
                isActive={item.isActive}
                className={cn(
                  "cursor-pointer",
                  item.href && "hover:bg-accent/50",
                  hasChildren && "group",
                )}
                onClick={(event) => handleItemClick(item, event)}
                asChild={Boolean(item.href)}
              >
                {item.href ? (
                  <a href={item.href} className="flex items-center w-full">
                    <span className="flex-1">{item.label}</span>
                    {hasChildren && !isCollapsed && (
                      <span className="ml-auto">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </a>
                ) : (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {hasChildren && !isCollapsed && (
                      <span className="ml-auto">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </>
                )}
              </SidebarNavItem>
            )}

            {/* Render children if expanded */}
            {showChildren && (
              <SidebarNavItems
                items={item.children!}
                level={level + 1}
                onItemClick={onItemClick}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * AppShellSidebar - Enhanced sidebar component using ui-kit Sidebar
 *
 * This component wraps the ui-kit Sidebar components to provide:
 * - Better mobile support with overlay and proper responsive behavior
 * - Provider pattern for state management
 * - Enhanced accessibility features
 * - Backward compatibility with existing SideNav interface
 * - Improved styling and animations
 */
export const AppShellSidebar: React.FC<AppShellSidebarProps> = ({
  items = [],
  collapsed: controlledCollapsed,
  onCollapseToggle,
  className,
  persistCollapsed = true,
  "data-testid": dataTestId,
  header,
  footer,
}) => {
  const { isCollapsed, setIsCollapsed } = useSidebar();

  // Use internal state if not controlled externally
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  // Sync with ui-kit sidebar state
  useEffect(
    function syncSidebarState() {
      if (collapsed !== isCollapsed) {
        setIsCollapsed(collapsed);
      }
      return () => {
        // Cleanup function (no-op in this case)
      };
    },
    [collapsed, isCollapsed, setIsCollapsed],
  );

  // Load collapsed state from localStorage on mount
  useEffect(
    function loadCollapsedState() {
      if (!isControlled && persistCollapsed) {
        try {
          const savedState = localStorage.getItem(SIDENAV_COLLAPSED_KEY);
          if (savedState !== null) {
            const savedCollapsed = savedState === "true";
            setInternalCollapsed(savedCollapsed);
            setIsCollapsed(savedCollapsed);
          }
        } catch (e) {
          console.error(
            "Error loading SideNav collapsed state from localStorage",
            e,
          );
        }
      }
      return () => {
        // Cleanup function (no-op in this case)
      };
    },
    [isControlled, persistCollapsed, setIsCollapsed],
  );

  // Handle collapse toggle
  const handleCollapseToggle = (newCollapsed: boolean) => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalCollapsed(newCollapsed);

      // Persist to localStorage if enabled
      if (persistCollapsed) {
        try {
          localStorage.setItem(SIDENAV_COLLAPSED_KEY, String(newCollapsed));
        } catch (e) {
          console.error(
            "Error saving SideNav collapsed state to localStorage",
            e,
          );
        }
      }
    }

    // Call external handler if provided
    onCollapseToggle?.(newCollapsed);
  };

  // Listen to ui-kit sidebar state changes
  useEffect(
    function listenToSidebarChanges() {
      handleCollapseToggle(isCollapsed);
      return () => {
        // Cleanup function (no-op in this case)
      };
    },
    [isCollapsed, handleCollapseToggle],
  );

  const handleItemClick = (item: NavItem) => {
    // Additional logic can be added here if needed
    console.log("Navigation item clicked:", item.id);
  };

  return (
    <Sidebar
      className={cn(className)}
      data-testid={dataTestId}
      data-collapsed={collapsed}
      collapsible={true}
      overlay={true}
    >
      {/* Header section */}
      {header && (
        <SidebarHeader>
          {header}
          <SidebarTrigger />
        </SidebarHeader>
      )}

      {/* Main content */}
      <SidebarContent>
        {/* Toggle button when no header */}
        {!header && (
          <div className="p-2 flex justify-center border-b">
            <SidebarTrigger />
          </div>
        )}

        {/* Navigation */}
        <SidebarNav className="flex-1 p-2">
          {items.length > 0 ? (
            <SidebarNavItems items={items} onItemClick={handleItemClick} />
          ) : (
            <div className="text-muted-foreground text-center py-4">
              <span className="text-sm">No navigation items</span>
            </div>
          )}
        </SidebarNav>
      </SidebarContent>

      {/* Footer section */}
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  );
};

AppShellSidebar.displayName = "AppShellSidebar";
