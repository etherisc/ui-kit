import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import type { NavigationItem, UserActionItem } from "./AppShellTopBar";
import type { NavItem } from "./AppShellSidebar";
import type { BreadcrumbItemData } from "./AppShellBreadcrumbs";
import { Logo } from "../../components/layout/Logo";
import { HeaderActionIcon } from "../../components/layout/HeaderActionIcon";
import { Button } from "../../components/primitives/Button/Button";
import { ThemeToggle } from "../../components/primitives/ThemeToggle/ThemeToggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BellIcon,
  HelpCircleIcon,
  BarChartIcon,
  LogOutIcon,
  UserIcon,
  CreditCardIcon,
} from "lucide-react";

const meta: Meta<typeof AppShell> = {
  title: "Layout/Shells/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    // Disable interactions to prevent infinite loops
    chromatic: { disableSnapshot: false },
    a11y: { disable: false },
    actions: { disable: false },
    controls: { disable: false },
    interactions: { disable: true },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppShell>;

// Example Logo
const LogoExample = () => (
  <Logo
    text="Insurance Platform"
    src="https://placekitten.com/32/32"
    alt="Company Logo"
    onClick={() => {
      /* no-op to prevent test recursion */
    }}
  />
);

// Example Nav Items
const NavItems = () => (
  <div className="flex items-center gap-4">
    <Button intent="ghost">Dashboard</Button>
    <Button intent="ghost">Policies</Button>
    <Button intent="ghost">Claims</Button>
    <Button intent="ghost">Reports</Button>
  </div>
);

// Example User Menu
const UserMenu = () => (
  <div className="flex items-center gap-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://placekitten.com/100/100" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <span className="hidden md:inline">John Doe</span>
  </div>
);

// Example Action Icons - memoized to prevent recursion
const ActionIcons = () => (
  <div className="flex items-center gap-2">
    <HeaderActionIcon icon={<HelpCircleIcon />} label="Help" />
    <HeaderActionIcon
      icon={<BellIcon />}
      label="Notifications"
      badgeCount={3}
    />
    <HeaderActionIcon icon={<SettingsIcon />} label="Settings" />
    <ThemeToggle size="sm" />
  </div>
);

// Example side navigation items
const sideNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon size={20} />,
    href: "/dashboard",
    isActive: true,
  },
  {
    id: "customers",
    label: "Customers",
    icon: <UsersIcon size={20} />,
    href: "/customers",
    isActive: false,
  },
  {
    id: "policies",
    label: "Policies",
    icon: <FileTextIcon size={20} />,
    isExpanded: true,
    children: [
      {
        id: "active-policies",
        label: "Active Policies",
        href: "/policies/active",
        isActive: false,
      },
      {
        id: "pending-policies",
        label: "Pending Approval",
        href: "/policies/pending",
        isActive: false,
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: <BarChartIcon size={20} />,
    href: "/reports",
    isActive: false,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon size={20} />,
    href: "/settings",
    isActive: false,
  },
];

// Example breadcrumbs
const breadcrumbsItems: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "John Smith", href: "/customers/123" },
  { label: "Policy Details", isActive: true },
];

// Create sample content only once to avoid re-renders
const sampleContent = (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
    <p className="mb-4">
      This is an example of the AppShell component with all features enabled.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card p-4 rounded-md shadow">
          <h2 className="font-bold mb-2">Card {i + 1}</h2>
          <p>This is some sample content for card {i + 1}.</p>
        </div>
      ))}
    </div>
  </div>
);

// Create settings content only once
const settingsContent = (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Settings Page</h1>
    <p className="mb-4">
      This example demonstrates fixed-width content, useful for forms and
      settings pages.
    </p>
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <input
          id="username"
          className="w-full p-2 border rounded"
          defaultValue="john.doe"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          className="w-full p-2 border rounded"
          defaultValue="john.doe@example.com"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="notifications" className="font-medium">
          Notification Preferences
        </label>
        <select id="notifications" className="w-full p-2 border rounded">
          <option>All notifications</option>
          <option>Important only</option>
          <option>None</option>
        </select>
      </div>
      <div className="pt-4">
        <Button intent="primary">Save Changes</Button>
      </div>
    </div>
  </div>
);

// Example Footer
const SampleFooter = () => (
  <div className="flex items-center justify-between text-sm text-muted-foreground">
    <div>© 2024 Insurance Platform. All rights reserved.</div>
    <div className="flex items-center space-x-4">
      <a href="#" className="hover:text-foreground">
        Privacy Policy
      </a>
      <a href="#" className="hover:text-foreground">
        Terms of Service
      </a>
      <a href="#" className="hover:text-foreground">
        Support
      </a>
    </div>
  </div>
);

// Enhanced Navigation Items using NavigationItem interface
const enhancedNavigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    isActive: true,
  },
  {
    id: "products",
    label: "Products",
    children: [
      {
        id: "insurance-products",
        label: "Insurance Products",
        href: "/products/insurance",
        icon: <FileTextIcon className="h-4 w-4" />,
      },
      {
        id: "claims",
        label: "Claims Management",
        href: "/products/claims",
        icon: <BarChartIcon className="h-4 w-4" />,
      },
      {
        id: "reporting",
        label: "Reporting Tools",
        href: "/products/reporting",
        icon: <BarChartIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    external: true,
  },
];

// Enhanced User Actions using UserActionItem interface
const enhancedUserActions: UserActionItem[] = [
  {
    id: "account-header",
    label: "Account",
    isLabel: true,
    separator: true,
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    id: "billing",
    label: "Billing",
    href: "/billing",
    icon: <CreditCardIcon className="h-4 w-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    separator: true,
  },
  {
    id: "logout",
    label: "Log out",
    onClick: () => alert("Logging out..."),
    icon: <LogOutIcon className="h-4 w-4" />,
  },
];

// Enhanced breadcrumbs using BreadcrumbItemData interface
const enhancedBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Insurance Portal", href: "/" },
  { label: "Customer Management", href: "/customers" },
  { label: "John Smith", href: "/customers/123" },
  { label: "Policy Details", href: "/customers/123/policy/456" },
  { label: "Claims History", isActive: true },
];

// Long breadcrumbs to demonstrate truncation
const longBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Insurance Products", href: "/products" },
  { label: "Commercial Insurance", href: "/products/commercial" },
  { label: "Property & Casualty", href: "/products/commercial/property" },
  {
    label: "Buildings Insurance",
    href: "/products/commercial/property/buildings",
  },
  {
    label: "Policy Configuration",
    href: "/products/commercial/property/buildings/config",
  },
  {
    label: "Coverage Details",
    href: "/products/commercial/property/buildings/config/coverage",
  },
  { label: "Risk Assessment", isActive: true },
];

export const Default: Story = {
  args: {
    logo: <LogoExample />,
    navItems: sideNavItems,
    topNavItems: <NavItems />,
    userActions: (
      <>
        <ActionIcons />
        <UserMenu />
      </>
    ),
    breadcrumbs: breadcrumbsItems,
    children: sampleContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};

export const CollapsedSideNav: Story = {
  args: {
    ...Default.args,
    defaultCollapsed: true,
  },
  parameters: {
    interactions: { disable: true },
  },
};

export const FixedWidthContent: Story = {
  args: {
    ...Default.args,
    fixedWidth: true,
    children: settingsContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    interactions: { disable: true },
  },
};

export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    interactions: { disable: true },
  },
};

/**
 * AppShell with footer content
 */
export const WithFooter: Story = {
  args: {
    logo: <LogoExample />,
    navItems: sideNavItems,
    topNavItems: <NavItems />,
    userActions: (
      <>
        <ActionIcons />
        <UserMenu />
      </>
    ),
    breadcrumbs: breadcrumbsItems,
    footer: <SampleFooter />,
    children: sampleContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};

/**
 * AppShell with footer and collapsed sidebar
 */
export const WithFooterCollapsed: Story = {
  args: {
    ...WithFooter.args,
    defaultCollapsed: true,
  },
  parameters: {
    interactions: { disable: true },
  },
};

/**
 * AppShell with footer and fixed width content
 */
export const WithFooterFixedWidth: Story = {
  args: {
    ...WithFooter.args,
    fixedWidth: true,
    children: settingsContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};

/**
 * Enhanced AppShell with structured navigation and user actions
 * Showcases new NavigationItem[] and UserActionItem[] interfaces
 */
export const Enhanced: Story = {
  args: {
    logo: <LogoExample />,
    navItems: sideNavItems,
    topNavItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
    breadcrumbs: enhancedBreadcrumbs,
    children: sampleContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};

/**
 * Enhanced AppShell with dropdown navigation
 * Demonstrates nested navigation menus
 */
export const EnhancedWithDropdowns: Story = {
  args: {
    logo: <LogoExample />,
    navItems: sideNavItems,
    topNavItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
    breadcrumbs: enhancedBreadcrumbs,
    children: sampleContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};

/**
 * Enhanced AppShell with breadcrumb truncation
 * Shows how long breadcrumb paths are handled
 */
export const EnhancedWithTruncation: Story = {
  args: {
    logo: <LogoExample />,
    navItems: sideNavItems,
    topNavItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
    breadcrumbs: longBreadcrumbs,
    children: sampleContent,
  },
  parameters: {
    interactions: { disable: true },
  },
};
