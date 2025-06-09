import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShellTopBar } from "./AppShellTopBar";
import type { NavigationItem, UserActionItem } from "./AppShellTopBar";
import { Logo } from "../../components/layout/Logo";
import {
  HomeIcon,
  FileTextIcon,
  BarChartIcon,
  SettingsIcon,
  UserIcon,
  CreditCardIcon,
  LogOutIcon,
  ShoppingCartIcon,
  UsersIcon,
  HelpCircleIcon,
  BellIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const meta: Meta<typeof AppShellTopBar> = {
  title: "Layout/AppShell/AppShellTopBar",
  component: AppShellTopBar,
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppShellTopBar>;

// Sample Logo
const SampleLogo = () => (
  <Logo
    text="Insurance Platform"
    src="https://placekitten.com/32/32"
    alt="Company Logo"
  />
);

// Basic Navigation Items (ReactNode - backward compatibility)
const BasicNavigationComponent = () => (
  <div className="flex items-center gap-4">
    <a href="#" className="text-sm font-medium hover:text-primary">
      Dashboard
    </a>
    <a href="#" className="text-sm font-medium hover:text-primary">
      Policies
    </a>
    <a href="#" className="text-sm font-medium hover:text-primary">
      Claims
    </a>
    <a href="#" className="text-sm font-medium hover:text-primary">
      Reports
    </a>
  </div>
);

// Enhanced Navigation Items (NavigationItem[])
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
      {
        id: "analytics",
        label: "Analytics Dashboard",
        href: "/products/analytics",
        icon: <BarChartIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    href: "/customers",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    external: true,
  },
];

// Complex Navigation with Multiple Dropdowns
const complexNavigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    isActive: true,
  },
  {
    id: "insurance",
    label: "Insurance",
    children: [
      {
        id: "auto-insurance",
        label: "Auto Insurance",
        href: "/insurance/auto",
        icon: <ShoppingCartIcon className="h-4 w-4" />,
      },
      {
        id: "home-insurance",
        label: "Home Insurance",
        href: "/insurance/home",
        icon: <HomeIcon className="h-4 w-4" />,
      },
      {
        id: "life-insurance",
        label: "Life Insurance",
        href: "/insurance/life",
        icon: <UserIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "claims",
    label: "Claims",
    children: [
      {
        id: "file-claim",
        label: "File New Claim",
        href: "/claims/new",
        icon: <FileTextIcon className="h-4 w-4" />,
      },
      {
        id: "track-claims",
        label: "Track Claims",
        href: "/claims/track",
        icon: <BarChartIcon className="h-4 w-4" />,
      },
      {
        id: "claim-history",
        label: "Claims History",
        href: "/claims/history",
        icon: <FileTextIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: <HelpCircleIcon className="h-4 w-4" />,
  },
];

// Basic User Actions (ReactNode - backward compatibility)
const BasicUserActionsComponent = () => (
  <div className="flex items-center gap-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://placekitten.com/100/100" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <span className="hidden md:inline text-sm">John Doe</span>
  </div>
);

// Enhanced User Actions (UserActionItem[])
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
    label: "Billing & Payments",
    href: "/billing",
    icon: <CreditCardIcon className="h-4 w-4" />,
  },
  {
    id: "preferences",
    label: "Preferences",
    href: "/preferences",
    icon: <SettingsIcon className="h-4 w-4" />,
    separator: true,
  },
  {
    id: "help",
    label: "Help & Support",
    href: "/help",
    icon: <HelpCircleIcon className="h-4 w-4" />,
  },
  {
    id: "logout",
    label: "Log out",
    onClick: () => alert("Logging out..."),
    icon: <LogOutIcon className="h-4 w-4" />,
  },
];

// Complex User Actions with Notifications
const complexUserActions: UserActionItem[] = [
  {
    id: "notifications-header",
    label: "Notifications",
    isLabel: true,
  },
  {
    id: "unread-notifications",
    label: "3 unread messages",
    href: "/notifications",
    icon: <BellIcon className="h-4 w-4" />,
    separator: true,
  },
  {
    id: "account-header",
    label: "Account",
    isLabel: true,
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
    id: "help",
    label: "Help",
    href: "/help",
    icon: <HelpCircleIcon className="h-4 w-4" />,
  },
  {
    id: "logout",
    label: "Sign out",
    onClick: () => alert("Signing out..."),
    icon: <LogOutIcon className="h-4 w-4" />,
  },
];

/**
 * Basic TopBar with logo only
 */
export const LogoOnly: Story = {
  args: {
    logo: <SampleLogo />,
  },
};

/**
 * TopBar with logo and basic navigation (ReactNode - backward compatibility)
 */
export const WithBasicNavigation: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: <BasicNavigationComponent />,
  },
};

/**
 * TopBar with enhanced structured navigation (NavigationItem[])
 */
export const EnhancedNavigation: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: enhancedNavigationItems,
  },
};

/**
 * TopBar with complex dropdown navigation
 */
export const ComplexNavigation: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: complexNavigationItems,
  },
};

/**
 * TopBar with basic user actions (ReactNode - backward compatibility)
 */
export const WithBasicUserActions: Story = {
  args: {
    logo: <SampleLogo />,
    userActions: <BasicUserActionsComponent />,
  },
};

/**
 * TopBar with enhanced user actions dropdown
 */
export const EnhancedUserActions: Story = {
  args: {
    logo: <SampleLogo />,
    userActions: enhancedUserActions,
  },
};

/**
 * Complete TopBar with both enhanced navigation and user actions
 */
export const Complete: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
  },
};

/**
 * Complex TopBar with multiple dropdowns and notifications
 */
export const Complex: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: complexNavigationItems,
    userActions: complexUserActions,
  },
};

/**
 * TopBar without fixed positioning
 */
export const NotFixed: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
    fixed: false,
  },
};

/**
 * Mobile view of the TopBar
 */
export const Mobile: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet view of the TopBar
 */
export const Tablet: Story = {
  args: {
    logo: <SampleLogo />,
    navigationItems: enhancedNavigationItems,
    userActions: enhancedUserActions,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
