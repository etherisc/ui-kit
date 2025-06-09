import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShellBreadcrumbs } from "./AppShellBreadcrumbs";
import type { BreadcrumbItemData } from "./AppShellBreadcrumbs";
import { SlashIcon, ArrowRightIcon } from "lucide-react";

const meta: Meta<typeof AppShellBreadcrumbs> = {
  title: "Layout/AppShell/AppShellBreadcrumbs",
  component: AppShellBreadcrumbs,
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: false },
  },
  tags: ["autodocs"],
  argTypes: {
    truncate: {
      control: "boolean",
      description: "Whether to truncate long breadcrumb lists",
    },
    maxVisibleItems: {
      control: { type: "number", min: 3, max: 10 },
      description: "Maximum number of items to show when truncated",
    },
    separator: {
      control: false,
      description: "Custom separator element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppShellBreadcrumbs>;

// Basic breadcrumb items
const basicBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Insurance", href: "/insurance" },
  { label: "Auto Insurance", isActive: true },
];

// Medium length breadcrumbs
const mediumBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Insurance Products", href: "/products" },
  { label: "Commercial Insurance", href: "/products/commercial" },
  { label: "Property & Casualty", href: "/products/commercial/property" },
  { label: "Policy Details", isActive: true },
];

// Long breadcrumbs to demonstrate truncation
const longBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Insurance Portal", href: "/" },
  { label: "Customer Management", href: "/customers" },
  { label: "Commercial Clients", href: "/customers/commercial" },
  { label: "Enterprise Accounts", href: "/customers/commercial/enterprise" },
  {
    label: "Johnson & Associates LLC",
    href: "/customers/commercial/enterprise/johnson",
  },
  {
    label: "Policy Portfolio",
    href: "/customers/commercial/enterprise/johnson/policies",
  },
  {
    label: "Property Insurance",
    href: "/customers/commercial/enterprise/johnson/policies/property",
  },
  {
    label: "Building Coverage",
    href: "/customers/commercial/enterprise/johnson/policies/property/building",
  },
  {
    label: "Risk Assessment",
    href: "/customers/commercial/enterprise/johnson/policies/property/building/risk",
  },
  { label: "Current Analysis", isActive: true },
];

// Very long breadcrumbs
const veryLongBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Enterprise Dashboard", href: "/" },
  { label: "Administration", href: "/admin" },
  { label: "System Configuration", href: "/admin/config" },
  { label: "Insurance Products", href: "/admin/config/products" },
  { label: "Commercial Lines", href: "/admin/config/products/commercial" },
  {
    label: "Property & Casualty",
    href: "/admin/config/products/commercial/property",
  },
  {
    label: "Coverage Types",
    href: "/admin/config/products/commercial/property/coverage",
  },
  {
    label: "Building Insurance",
    href: "/admin/config/products/commercial/property/coverage/building",
  },
  {
    label: "Risk Categories",
    href: "/admin/config/products/commercial/property/coverage/building/risk",
  },
  {
    label: "Natural Disasters",
    href: "/admin/config/products/commercial/property/coverage/building/risk/natural",
  },
  {
    label: "Flood Coverage",
    href: "/admin/config/products/commercial/property/coverage/building/risk/natural/flood",
  },
  {
    label: "Zone Classifications",
    href: "/admin/config/products/commercial/property/coverage/building/risk/natural/flood/zones",
  },
  { label: "High Risk Areas", isActive: true },
];

// Breadcrumbs without links
const noLinkBreadcrumbs: BreadcrumbItemData[] = [
  { label: "Dashboard" },
  { label: "Reports" },
  { label: "Monthly Summary", isActive: true },
];

/**
 * Basic breadcrumbs with default styling
 */
export const Default: Story = {
  args: {
    items: basicBreadcrumbs,
  },
};

/**
 * Breadcrumbs with medium length path
 */
export const MediumLength: Story = {
  args: {
    items: mediumBreadcrumbs,
  },
};

/**
 * Long breadcrumbs without truncation
 */
export const LongWithoutTruncation: Story = {
  args: {
    items: longBreadcrumbs,
    truncate: false,
  },
};

/**
 * Long breadcrumbs with truncation enabled (default settings)
 */
export const LongWithTruncation: Story = {
  args: {
    items: longBreadcrumbs,
    truncate: true,
  },
};

/**
 * Very long breadcrumbs with custom truncation settings
 */
export const VeryLongWithCustomTruncation: Story = {
  args: {
    items: veryLongBreadcrumbs,
    truncate: true,
    maxVisibleItems: 5,
  },
};

/**
 * Breadcrumbs with custom slash separator
 */
export const WithSlashSeparator: Story = {
  args: {
    items: mediumBreadcrumbs,
    separator: <SlashIcon className="h-4 w-4" />,
  },
};

/**
 * Breadcrumbs with custom arrow separator
 */
export const WithArrowSeparator: Story = {
  args: {
    items: mediumBreadcrumbs,
    separator: <ArrowRightIcon className="h-4 w-4" />,
  },
};

/**
 * Breadcrumbs with custom text separator
 */
export const WithTextSeparator: Story = {
  args: {
    items: mediumBreadcrumbs,
    separator: <span className="text-muted-foreground mx-1">|</span>,
  },
};

/**
 * Single breadcrumb item (no separators)
 */
export const SingleItem: Story = {
  args: {
    items: [{ label: "Current Page", isActive: true }],
  },
};

/**
 * Breadcrumbs without any links
 */
export const WithoutLinks: Story = {
  args: {
    items: noLinkBreadcrumbs,
  },
};

/**
 * Empty breadcrumbs (returns null)
 */
export const Empty: Story = {
  args: {
    items: [],
  },
};

/**
 * Mobile view of long breadcrumbs with truncation
 */
export const MobileTruncated: Story = {
  args: {
    items: longBreadcrumbs,
    truncate: true,
    maxVisibleItems: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet view of breadcrumbs
 */
export const Tablet: Story = {
  args: {
    items: mediumBreadcrumbs,
    truncate: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

/**
 * Demonstrates minimal truncation (showing 3 items)
 */
export const MinimalTruncation: Story = {
  args: {
    items: longBreadcrumbs,
    truncate: true,
    maxVisibleItems: 3,
  },
};

/**
 * Demonstrates maximum practical truncation
 */
export const MaximalTruncation: Story = {
  args: {
    items: veryLongBreadcrumbs,
    truncate: true,
    maxVisibleItems: 8,
  },
};

/**
 * Long breadcrumbs with custom separator and truncation
 */
export const CustomSeparatorWithTruncation: Story = {
  args: {
    items: longBreadcrumbs,
    truncate: true,
    maxVisibleItems: 4,
    separator: <ArrowRightIcon className="h-3 w-3 text-primary" />,
  },
};
