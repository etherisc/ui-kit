export { AppShell } from "./AppShell";
export type { AppShellProps } from "./AppShell";

// New wrapper components
export { AppShellTopBar } from "./AppShellTopBar";
export type {
  AppShellTopBarProps,
  NavigationItem,
  UserActionItem,
} from "./AppShellTopBar";

export { AppShellSidebar } from "./AppShellSidebar";
export type { AppShellSidebarProps } from "./AppShellSidebar";

export { AppShellBreadcrumbs } from "./AppShellBreadcrumbs";
export type {
  AppShellBreadcrumbsProps,
  BreadcrumbItemData,
} from "./AppShellBreadcrumbs";

// Legacy components (for backward compatibility)
export { TopBar } from "./TopBar";
export type { TopBarProps } from "./TopBar";

export { SideNav } from "./SideNav";
export type { SideNavProps, NavItem } from "./SideNav";

export { Breadcrumbs } from "./Breadcrumbs";
export type { BreadcrumbsProps, BreadcrumbItem } from "./Breadcrumbs";

export { ContentWrapper } from "./ContentWrapper";
export type { ContentWrapperProps } from "./ContentWrapper";

export { BREAKPOINTS, DIMENSIONS, STORAGE_KEYS } from "./constants";
