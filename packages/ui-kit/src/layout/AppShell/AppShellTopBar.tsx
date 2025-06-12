import React from "react";
import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../../components/ui/NavigationMenu/NavigationMenu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../../components/ui/DropdownMenu/DropdownMenu";
import { Button } from "../../components/ui/button";
import { cn } from "../../utils/cn";

/**
 * Navigation item structure for structured navigation
 */
export interface NavigationItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Display label for the item
   */
  label: string;
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
   * Optional children items for dropdown navigation
   */
  children?: NavigationItem[];
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
  /**
   * External link indicator
   */
  external?: boolean;
}

/**
 * User action item structure for dropdown menus
 */
export interface UserActionItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Display label for the item
   */
  label: string;
  /**
   * URL to navigate to when item is clicked
   */
  href?: string;
  /**
   * Optional callback when item is clicked
   */
  onClick?: () => void;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show a separator after this item
   */
  separator?: boolean;
  /**
   * Whether this is a section label
   */
  isLabel?: boolean;
}

/**
 * Enhanced TopBar component props
 */
export interface AppShellTopBarProps {
  /**
   * Optional logo element to display on the left side
   */
  logo?: React.ReactNode;
  /**
   * Optional navigation elements to display in the center
   * Can be React elements (for backward compatibility) or structured NavigationItem array
   */
  navigationItems?: React.ReactNode | NavigationItem[];
  /**
   * Optional user actions to display on the right side
   * Can be React elements (for backward compatibility) or structured UserActionItem array
   */
  userActions?: React.ReactNode | UserActionItem[];
  /**
   * Optional additional className for the header
   */
  className?: string;
  /**
   * Optional prop to make the TopBar fixed at the top of the viewport
   */
  fixed?: boolean;
  /**
   * Optional data-testid for testing
   */
  "data-testid"?: string;
}

/**
 * Internal component to render structured navigation items
 */
const StructuredNavigation: React.FC<{ items: NavigationItem[] }> = ({
  items,
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          return (
            <NavigationMenuItem key={item.id}>
              {hasChildren ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      item.isActive && "bg-accent text-accent-foreground",
                      item.disabled && "opacity-50 pointer-events-none",
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={item.href}
                          >
                            {item.icon && (
                              <div className="mb-2 mt-4">{item.icon}</div>
                            )}
                            <div className="mb-2 text-lg font-medium">
                              {item.label}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-1">
                        {item.children!.map((child) => (
                          <NavigationMenuLink
                            key={child.id}
                            href={child.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              child.disabled &&
                                "opacity-50 pointer-events-none",
                            )}
                            onClick={child.onClick}
                          >
                            <div className="flex items-center">
                              {child.icon && (
                                <span className="mr-2">{child.icon}</span>
                              )}
                              <div className="text-sm font-medium leading-none">
                                {child.label}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  href={item.href}
                  className={cn(
                    item.isActive && "bg-accent text-accent-foreground",
                    item.disabled && "opacity-50 pointer-events-none",
                  )}
                  onClick={item.onClick}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

/**
 * Internal component to render structured user actions
 */
const StructuredUserActions: React.FC<{ items: UserActionItem[] }> = ({
  items,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Actions
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {items.map((item) => {
          if (item.isLabel) {
            return (
              <React.Fragment key={item.id}>
                <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                {item.separator && <DropdownMenuSeparator />}
              </React.Fragment>
            );
          }

          const menuItem = (
            <DropdownMenuItem
              key={item.id}
              disabled={item.disabled}
              onClick={item.onClick}
              asChild={Boolean(item.href)}
            >
              {item.href ? (
                <a href={item.href} className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <>
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </>
              )}
            </DropdownMenuItem>
          );

          return (
            <React.Fragment key={item.id}>
              {menuItem}
              {item.separator && <DropdownMenuSeparator />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * AppShellTopBar - Enhanced TopBar component using ui-kit NavigationMenu and DropdownMenu
 *
 * This component wraps the ui-kit NavigationMenu and DropdownMenu components to provide:
 * - Structured navigation with dropdown support
 * - Enhanced user actions with dropdown menus
 * - Better accessibility and keyboard navigation
 * - Backward compatibility with existing TopBar interface
 * - Improved styling and animations
 *
 * Features:
 * - Supports both structured data (NavigationItem[]/UserActionItem[]) and ReactNode for flexibility
 * - NavigationMenu for main navigation with nested dropdown support
 * - DropdownMenu for user actions with labels, separators, and icons
 * - Responsive height scaling (64px/56px/48px)
 * - Fixed positioning option
 * - Full keyboard accessibility
 */
export const AppShellTopBar: React.FC<AppShellTopBarProps> = ({
  logo,
  navigationItems,
  userActions,
  className,
  fixed = true,
  "data-testid": dataTestId,
}) => {
  // Determine if navigationItems is structured data or ReactNode
  const isStructuredNavigation = Array.isArray(navigationItems);
  const isStructuredUserActions = Array.isArray(userActions);

  return (
    <header
      className={cn(
        "w-full bg-background border-b border-border",
        "h-16 md:h-14 sm:h-12", // Height: 64px/56px/48px
        "flex items-center justify-between",
        "px-4 md:px-3 sm:px-2",
        fixed && "sticky top-0 z-40",
        className,
      )}
      style={{ borderColor: "hsl(var(--border))" }}
      role="banner"
      aria-label="Top navigation bar"
      data-testid={dataTestId}
    >
      {/* Logo section - fixed width between 220-260px */}
      {logo && (
        <div
          className={cn("flex-shrink-0", "w-[260px] md:w-[240px] sm:w-[220px]")}
        >
          {logo}
        </div>
      )}

      {/* Navigation section */}
      {navigationItems && (
        <nav
          className="flex-grow flex items-center justify-center"
          role="navigation"
          aria-label="Main navigation"
        >
          {isStructuredNavigation ? (
            <StructuredNavigation items={navigationItems as NavigationItem[]} />
          ) : (
            navigationItems
          )}
        </nav>
      )}

      {/* User actions section */}
      {userActions && (
        <div className="flex-shrink-0 flex items-center gap-2">
          {isStructuredUserActions ? (
            <StructuredUserActions items={userActions as UserActionItem[]} />
          ) : (
            userActions
          )}
        </div>
      )}
    </header>
  );
};

AppShellTopBar.displayName = "AppShellTopBar";
