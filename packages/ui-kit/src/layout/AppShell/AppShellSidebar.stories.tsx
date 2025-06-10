import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShellSidebar } from "./AppShellSidebar";
import { SidebarProvider } from "../../components/ui/Sidebar/Sidebar";
import type { NavItem } from "./SideNav";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
  ShoppingCartIcon,
  HelpCircleIcon,
  CreditCardIcon,
  UserIcon,
  BellIcon,
  ClipboardIcon,
} from "lucide-react";

const meta: Meta<typeof AppShellSidebar> = {
  title: "Layout/AppShell/AppShellSidebar",
  component: AppShellSidebar,
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: false },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <SidebarProvider>
          <Story />
        </SidebarProvider>
        <div className="flex-1 p-6 bg-background">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p>This is the main content area next to the sidebar.</p>
        </div>
      </div>
    ),
  ],
  argTypes: {
    collapsed: {
      control: "boolean",
      description: "Whether the sidebar is collapsed",
    },
    persistCollapsed: {
      control: "boolean",
      description: "Whether to persist collapsed state in localStorage",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppShellSidebar>;

// Basic navigation items
const basicNavItems: NavItem[] = [
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
  },
  {
    id: "policies",
    label: "Policies",
    icon: <FileTextIcon size={20} />,
    href: "/policies",
  },
  {
    id: "reports",
    label: "Reports",
    icon: <BarChartIcon size={20} />,
    href: "/reports",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon size={20} />,
    href: "/settings",
  },
];

// Navigation items with nested children
const nestedNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon size={20} />,
    href: "/dashboard",
    isActive: true,
  },
  {
    id: "insurance",
    label: "Insurance Products",
    icon: <ShoppingCartIcon size={20} />,
    isExpanded: true,
    children: [
      {
        id: "auto-insurance",
        label: "Auto Insurance",
        href: "/insurance/auto",
      },
      {
        id: "home-insurance",
        label: "Home Insurance",
        href: "/insurance/home",
        isActive: true,
      },
      {
        id: "life-insurance",
        label: "Life Insurance",
        href: "/insurance/life",
      },
    ],
  },
  {
    id: "customers",
    label: "Customer Management",
    icon: <UsersIcon size={20} />,
    children: [
      {
        id: "individual-customers",
        label: "Individual Customers",
        href: "/customers/individual",
      },
      {
        id: "business-customers",
        label: "Business Customers",
        href: "/customers/business",
      },
    ],
  },
  {
    id: "claims",
    label: "Claims Processing",
    icon: <ClipboardIcon size={20} />,
    children: [
      {
        id: "new-claims",
        label: "New Claims",
        href: "/claims/new",
      },
      {
        id: "pending-claims",
        label: "Pending Review",
        href: "/claims/pending",
      },
      {
        id: "approved-claims",
        label: "Approved Claims",
        href: "/claims/approved",
      },
      {
        id: "claim-history",
        label: "Claims History",
        href: "/claims/history",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: <BarChartIcon size={20} />,
    children: [
      {
        id: "sales-reports",
        label: "Sales Reports",
        href: "/reports/sales",
      },
      {
        id: "financial-reports",
        label: "Financial Reports",
        href: "/reports/financial",
      },
      {
        id: "customer-analytics",
        label: "Customer Analytics",
        href: "/reports/customers",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon size={20} />,
    href: "/settings",
  },
];

// Navigation items with groups
const groupedNavItems: NavItem[] = [
  {
    id: "main-group",
    label: "Main",
    isGroup: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon size={20} />,
    href: "/dashboard",
    isActive: true,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <BellIcon size={20} />,
    href: "/notifications",
  },
  {
    id: "business-group",
    label: "Business Operations",
    isGroup: true,
  },
  {
    id: "customers",
    label: "Customers",
    icon: <UsersIcon size={20} />,
    href: "/customers",
  },
  {
    id: "policies",
    label: "Policies",
    icon: <FileTextIcon size={20} />,
    children: [
      {
        id: "active-policies",
        label: "Active Policies",
        href: "/policies/active",
      },
      {
        id: "pending-policies",
        label: "Pending Approval",
        href: "/policies/pending",
      },
      {
        id: "expired-policies",
        label: "Expired Policies",
        href: "/policies/expired",
      },
    ],
  },
  {
    id: "claims",
    label: "Claims",
    icon: <ClipboardIcon size={20} />,
    href: "/claims",
  },
  {
    id: "financial-group",
    label: "Financial",
    isGroup: true,
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCardIcon size={20} />,
    href: "/billing",
  },
  {
    id: "reports",
    label: "Reports",
    icon: <BarChartIcon size={20} />,
    href: "/reports",
  },
  {
    id: "system-group",
    label: "System",
    isGroup: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon size={20} />,
    href: "/settings",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: <HelpCircleIcon size={20} />,
    href: "/help",
  },
];

// Minimal navigation items
const minimalNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon size={20} />,
    href: "/",
    isActive: true,
  },
  {
    id: "profile",
    label: "Profile",
    icon: <UserIcon size={20} />,
    href: "/profile",
  },
];

/**
 * Basic sidebar with simple navigation items
 */
export const Default: Story = {
  args: {
    items: basicNavItems,
  },
};

/**
 * Sidebar with nested navigation items
 */
export const WithNestedItems: Story = {
  args: {
    items: nestedNavItems,
  },
};

/**
 * Sidebar with grouped navigation items
 */
export const WithGroups: Story = {
  args: {
    items: groupedNavItems,
  },
};

/**
 * Collapsed sidebar (icon-only mode)
 */
export const Collapsed: Story = {
  args: {
    items: basicNavItems,
    collapsed: true,
  },
};

/**
 * Collapsed sidebar with nested items
 */
export const CollapsedWithNested: Story = {
  args: {
    items: nestedNavItems,
    collapsed: true,
  },
};

/**
 * Sidebar with header content
 */
export const WithHeader: Story = {
  args: {
    items: basicNavItems,
    header: (
      <div className="flex items-center gap-2 p-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">IC</span>
        </div>
        <span className="font-semibold">Insurance Co</span>
      </div>
    ),
  },
};

/**
 * Sidebar with footer content
 */
export const WithFooter: Story = {
  args: {
    items: basicNavItems,
    footer: (
      <div className="text-center text-xs text-muted-foreground">
        <p>© 2024 Insurance Platform</p>
        <p>Version 1.0.0</p>
      </div>
    ),
  },
};

/**
 * Sidebar with both header and footer
 */
export const WithHeaderAndFooter: Story = {
  args: {
    items: groupedNavItems,
    header: (
      <div className="flex items-center gap-2 p-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">IC</span>
        </div>
        <span className="font-semibold">Insurance Portal</span>
      </div>
    ),
    footer: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2 text-sm">
          <UserIcon size={16} />
          <span>John Doe</span>
        </div>
        <div className="text-center text-xs text-muted-foreground border-t pt-2">
          Version 1.0.0
        </div>
      </div>
    ),
  },
};

/**
 * Minimal sidebar for simple applications
 */
export const Minimal: Story = {
  args: {
    items: minimalNavItems,
  },
};

/**
 * Empty sidebar (no navigation items)
 */
export const Empty: Story = {
  args: {
    items: [],
  },
};

/**
 * Sidebar without localStorage persistence
 */
export const WithoutPersistence: Story = {
  args: {
    items: basicNavItems,
    persistCollapsed: false,
  },
};

/**
 * Mobile view of the sidebar
 */
export const Mobile: Story = {
  args: {
    items: nestedNavItems,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet view of the sidebar
 */
export const Tablet: Story = {
  args: {
    items: groupedNavItems,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
