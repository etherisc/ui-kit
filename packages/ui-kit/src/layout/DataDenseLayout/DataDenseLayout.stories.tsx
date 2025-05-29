import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataDenseLayout } from "./DataDenseLayout";
import { Button } from "../../components/primitives/Button";

const meta: Meta<typeof DataDenseLayout> = {
  title: "Layout/Content Layouts/DataDenseLayout",
  component: DataDenseLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "DataDenseLayout is optimized for data-heavy interfaces with compact spacing, collapsible sidebars, and efficient use of screen space.",
      },
    },
  },
  argTypes: {
    density: {
      control: { type: "select" },
      options: ["compact", "normal", "comfortable"],
    },
    showBorders: {
      control: { type: "boolean" },
    },
    stickyHeader: {
      control: { type: "boolean" },
    },
    stickyFooter: {
      control: { type: "boolean" },
    },
    collapsibleSidebars: {
      control: { type: "boolean" },
    },
    leftSidebarCollapsed: {
      control: { type: "boolean" },
    },
    rightSidebarCollapsed: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataDenseLayout>;

// Sample components for data-dense interfaces
const DataHeader = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <h1 className="text-lg font-semibold">Data Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Sort
        </Button>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">
        Last updated: 2 min ago
      </span>
      <Button variant="default" size="sm">
        Refresh
      </Button>
    </div>
  </div>
);

const FilterSidebar = () => (
  <div className="space-y-4">
    <div>
      <h2 className="font-medium mb-2">Filters</h2>
      <div className="space-y-2">
        <div>
          <label htmlFor="date-range-select" className="text-sm font-medium">
            Date Range
          </label>
          <select
            id="date-range-select"
            className="w-full mt-1 p-1 border rounded text-sm"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <div className="mt-1 space-y-1">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" defaultChecked />
              Active
            </label>
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Inactive
            </label>
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" defaultChecked />
              Pending
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="category-select" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category-select"
            className="w-full mt-1 p-1 border rounded text-sm"
          >
            <option>All Categories</option>
            <option>Type A</option>
            <option>Type B</option>
            <option>Type C</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <h2 className="font-medium mb-2">Quick Actions</h2>
      <div className="space-y-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs"
        >
          Create New
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs"
        >
          Bulk Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs"
        >
          Import Data
        </Button>
      </div>
    </div>
  </div>
);

const DetailsSidebar = () => (
  <div className="space-y-4">
    <div>
      <h2 className="font-medium mb-2">Selection Details</h2>
      <div className="text-sm space-y-2">
        <div>
          <span className="font-medium">ID:</span>
          <span className="ml-2 text-muted-foreground">12345</span>
        </div>
        <div>
          <span className="font-medium">Status:</span>
          <span className="ml-2 text-green-700">Active</span>
        </div>
        <div>
          <span className="font-medium">Created:</span>
          <span className="ml-2 text-muted-foreground">2024-01-15</span>
        </div>
        <div>
          <span className="font-medium">Modified:</span>
          <span className="ml-2 text-muted-foreground">2024-01-20</span>
        </div>
      </div>
    </div>
    <div>
      <h2 className="font-medium mb-2">Actions</h2>
      <div className="space-y-1">
        <Button variant="default" size="sm" className="w-full text-xs">
          Edit Item
        </Button>
        <Button variant="outline" size="sm" className="w-full text-xs">
          Duplicate
        </Button>
        <Button variant="outline" size="sm" className="w-full text-xs">
          View History
        </Button>
        <Button variant="destructive" size="sm" className="w-full text-xs">
          Delete
        </Button>
      </div>
    </div>
    <div>
      <h2 className="font-medium mb-2">Related Items</h2>
      <div className="text-sm space-y-1">
        <div className="p-2 border rounded hover:bg-muted cursor-pointer">
          <div className="font-medium">Item A</div>
          <div className="text-muted-foreground">Related by category</div>
        </div>
        <div className="p-2 border rounded hover:bg-muted cursor-pointer">
          <div className="font-medium">Item B</div>
          <div className="text-muted-foreground">Related by date</div>
        </div>
      </div>
    </div>
  </div>
);

const DataTable = () => (
  <div className="space-y-4">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left text-sm font-medium">
              ID
            </th>
            <th className="border border-border p-2 text-left text-sm font-medium">
              Name
            </th>
            <th className="border border-border p-2 text-left text-sm font-medium">
              Status
            </th>
            <th className="border border-border p-2 text-left text-sm font-medium">
              Date
            </th>
            <th className="border border-border p-2 text-left text-sm font-medium">
              Value
            </th>
            <th className="border border-border p-2 text-left text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }, (_, i) => (
            <tr key={i} className="hover:bg-muted/50">
              <td className="border border-border p-2 text-sm">{1000 + i}</td>
              <td className="border border-border p-2 text-sm">Item {i + 1}</td>
              <td className="border border-border p-2 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    i % 3 === 0
                      ? "bg-green-100 text-green-800"
                      : i % 3 === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {i % 3 === 0
                    ? "Active"
                    : i % 3 === 1
                      ? "Pending"
                      : "Inactive"}
                </span>
              </td>
              <td className="border border-border p-2 text-sm">
                2024-01-{String(i + 1).padStart(2, "0")}
              </td>
              <td className="border border-border p-2 text-sm">
                ${(Math.random() * 1000).toFixed(2)}
              </td>
              <td className="border border-border p-2 text-sm">
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1"
                  >
                    View
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DataFooter = () => (
  <div className="flex items-center justify-between">
    <div className="text-sm text-muted-foreground">
      Showing 1-20 of 1,234 items
    </div>
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        Previous
      </Button>
      <span className="text-sm">Page 1 of 62</span>
      <Button variant="outline" size="sm">
        Next
      </Button>
    </div>
    <div className="text-sm text-muted-foreground">20 items per page</div>
  </div>
);

/**
 * Default data-dense layout with all elements
 */
export const Default: Story = {
  args: {
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    rightSidebar: <DetailsSidebar />,
    footer: <DataFooter />,
    children: <DataTable />,
  },
};

/**
 * Compact density for maximum data display
 */
export const CompactDensity: Story = {
  args: {
    density: "compact",
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    rightSidebar: <DetailsSidebar />,
    footer: <DataFooter />,
    children: <DataTable />,
  },
};

/**
 * Comfortable density for better readability
 */
export const ComfortableDensity: Story = {
  args: {
    density: "comfortable",
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    rightSidebar: <DetailsSidebar />,
    footer: <DataFooter />,
    children: <DataTable />,
  },
};

/**
 * Layout with collapsed sidebars
 */
export const CollapsedSidebars: Story = {
  args: {
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    rightSidebar: <DetailsSidebar />,
    footer: <DataFooter />,
    leftSidebarCollapsed: true,
    rightSidebarCollapsed: true,
    children: <DataTable />,
  },
};

/**
 * Layout without borders for cleaner look
 */
export const NoBorders: Story = {
  args: {
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    rightSidebar: <DetailsSidebar />,
    footer: <DataFooter />,
    showBorders: false,
    children: <DataTable />,
  },
};

/**
 * Layout with sticky footer
 */
export const StickyFooter: Story = {
  args: {
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    footer: <DataFooter />,
    stickyFooter: true,
    children: <DataTable />,
  },
};

/**
 * Layout with only left sidebar (filters)
 */
export const FiltersOnly: Story = {
  args: {
    header: <DataHeader />,
    sidebar: <FilterSidebar />,
    footer: <DataFooter />,
    children: <DataTable />,
  },
};

/**
 * Layout with only right sidebar (details)
 */
export const DetailsOnly: Story = {
  args: {
    header: <DataHeader />,
    rightSidebar: <DetailsSidebar />,
    footer: <DataFooter />,
    children: <DataTable />,
  },
};

/**
 * Minimal layout with just header and content
 */
export const Minimal: Story = {
  args: {
    header: <DataHeader />,
    children: <DataTable />,
  },
};
