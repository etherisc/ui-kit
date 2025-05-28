import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MainFixedLayout } from "./MainFixedLayout";
import { Button } from "../../components/primitives/Button";

const meta: Meta<typeof MainFixedLayout> = {
  title: "Layout/MainFixedLayout",
  component: MainFixedLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "MainFixedLayout is a layout component with fixed positioning for headers, footers, and sidebars. Perfect for applications that need persistent navigation elements.",
      },
    },
  },
  argTypes: {
    fixedHeader: {
      control: { type: "boolean" },
    },
    fixedFooter: {
      control: { type: "boolean" },
    },
    fixedSidebar: {
      control: { type: "boolean" },
    },
    fixedRightSidebar: {
      control: { type: "boolean" },
    },
    contentPadding: {
      control: { type: "boolean" },
    },
    headerHeight: {
      control: { type: "number", min: 40, max: 120, step: 8 },
    },
    footerHeight: {
      control: { type: "number", min: 40, max: 120, step: 8 },
    },
    sidebarWidth: {
      control: { type: "number", min: 200, max: 400, step: 16 },
    },
    rightSidebarWidth: {
      control: { type: "number", min: 200, max: 400, step: 16 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainFixedLayout>;

// Sample content components
const SampleHeader = () => (
  <div className="px-6 flex items-center justify-between w-full">
    <div className="flex items-center space-x-4">
      <h1 className="text-lg font-semibold">App Title</h1>
    </div>
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        Settings
      </Button>
      <Button variant="default" size="sm">
        Profile
      </Button>
    </div>
  </div>
);

const SampleSidebar = () => (
  <div className="p-4">
    <nav className="space-y-2">
      <a
        href="#"
        className="block px-3 py-2 rounded-md bg-primary text-primary-foreground"
      >
        Dashboard
      </a>
      <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted">
        Projects
      </a>
      <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted">
        Tasks
      </a>
      <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted">
        Reports
      </a>
      <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted">
        Settings
      </a>
    </nav>
  </div>
);

const SampleRightSidebar = () => (
  <div className="p-4">
    <h2 className="font-semibold mb-3">Quick Actions</h2>
    <div className="space-y-2">
      <Button variant="outline" size="sm" className="w-full justify-start">
        New Project
      </Button>
      <Button variant="outline" size="sm" className="w-full justify-start">
        Add Task
      </Button>
      <Button variant="outline" size="sm" className="w-full justify-start">
        View Reports
      </Button>
    </div>
    <div className="mt-6">
      <h3 className="font-medium mb-2">Recent Activity</h3>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>Task completed</p>
        <p>New comment added</p>
        <p>Project updated</p>
      </div>
    </div>
  </div>
);

const SampleFooter = () => (
  <div className="px-6 flex items-center justify-between w-full text-sm text-muted-foreground">
    <div>© 2024 Your Company. All rights reserved.</div>
    <div className="flex space-x-4">
      <a href="#" className="hover:text-foreground">
        Privacy
      </a>
      <a href="#" className="hover:text-foreground">
        Terms
      </a>
      <a href="#" className="hover:text-foreground">
        Support
      </a>
    </div>
  </div>
);

const SampleContent = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold mb-4">Main Content Area</h2>
      <p className="text-muted-foreground mb-4">
        This is the main content area. It automatically adjusts its padding
        based on the fixed elements around it.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="p-4 border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Card {i + 1}</h3>
          <p className="text-sm text-muted-foreground">
            Sample content for demonstration purposes.
          </p>
        </div>
      ))}
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Long Content Section</h3>
      {Array.from({ length: 10 }, (_, i) => (
        <p key={i} className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      ))}
    </div>
  </div>
);

/**
 * Default layout with all fixed elements
 */
export const Default: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    rightSidebar: <SampleRightSidebar />,
    footer: <SampleFooter />,
    children: <SampleContent />,
  },
};

/**
 * Layout with header and sidebar only
 */
export const HeaderAndSidebar: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
};

/**
 * Layout with header and footer only
 */
export const HeaderAndFooter: Story = {
  args: {
    header: <SampleHeader />,
    footer: <SampleFooter />,
    children: <SampleContent />,
  },
};

/**
 * Layout with sidebar only
 */
export const SidebarOnly: Story = {
  args: {
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
};

/**
 * Layout with non-fixed elements (relative positioning)
 */
export const NonFixed: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    footer: <SampleFooter />,
    fixedHeader: false,
    fixedSidebar: false,
    fixedFooter: false,
    children: <SampleContent />,
  },
};

/**
 * Layout with custom dimensions
 */
export const CustomDimensions: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    rightSidebar: <SampleRightSidebar />,
    footer: <SampleFooter />,
    headerHeight: 80,
    footerHeight: 48,
    sidebarWidth: 300,
    rightSidebarWidth: 200,
    children: <SampleContent />,
  },
};

/**
 * Layout without content padding
 */
export const NoPadding: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    contentPadding: false,
    children: (
      <div className="p-6">
        <SampleContent />
      </div>
    ),
  },
};

/**
 * Minimal layout with just content
 */
export const ContentOnly: Story = {
  args: {
    children: <SampleContent />,
  },
};
