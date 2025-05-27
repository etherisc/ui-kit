import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EtheriscLogo } from "./EtheriscLogo";

const meta = {
  title: "Brand/EtheriscLogo",
  component: EtheriscLogo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The official Etherisc logo component with customizable size and variant options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the logo",
    },
    variant: {
      control: { type: "select" },
      options: ["icon", "full"],
      description: "Logo variant - icon only or full logo with text",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof EtheriscLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "full",
  },
};

export const IconOnly: Story = {
  args: {
    size: "md",
    variant: "icon",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "full",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "full",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    variant: "full",
  },
};

export const SmallIcon: Story = {
  args: {
    size: "sm",
    variant: "icon",
  },
};

export const LargeIcon: Story = {
  args: {
    size: "lg",
    variant: "icon",
  },
};

export const CustomStyling: Story = {
  args: {
    size: "lg",
    variant: "full",
    className: "opacity-75 hover:opacity-100 transition-opacity",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with custom styling using Tailwind classes for opacity and hover effects.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Full Logo - All Sizes</h3>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <EtheriscLogo size="sm" variant="full" />
            <p className="text-sm text-muted-foreground mt-1">Small</p>
          </div>
          <div className="text-center">
            <EtheriscLogo size="md" variant="full" />
            <p className="text-sm text-muted-foreground mt-1">Medium</p>
          </div>
          <div className="text-center">
            <EtheriscLogo size="lg" variant="full" />
            <p className="text-sm text-muted-foreground mt-1">Large</p>
          </div>
          <div className="text-center">
            <EtheriscLogo size="xl" variant="full" />
            <p className="text-sm text-muted-foreground mt-1">Extra Large</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Icon Only - All Sizes</h3>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <EtheriscLogo size="sm" variant="icon" />
            <p className="text-sm text-muted-foreground mt-1">Small</p>
          </div>
          <div className="text-center">
            <EtheriscLogo size="md" variant="icon" />
            <p className="text-sm text-muted-foreground mt-1">Medium</p>
          </div>
          <div className="text-center">
            <EtheriscLogo size="lg" variant="icon" />
            <p className="text-sm text-muted-foreground mt-1">Large</p>
          </div>
          <div className="text-center">
            <EtheriscLogo size="xl" variant="icon" />
            <p className="text-sm text-muted-foreground mt-1">Extra Large</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all available sizes for both full logo and icon-only variants.",
      },
    },
  },
};
