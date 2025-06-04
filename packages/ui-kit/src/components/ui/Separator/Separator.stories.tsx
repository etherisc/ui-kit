import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "UI Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: { type: "boolean" },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Links to different sections
          </p>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="text-sm">Home</div>
          <div className="text-sm">About</div>
          <div className="text-sm">Contact</div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="text-sm">Settings</div>
          <div className="text-sm">Help</div>
        </div>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>Default separator</div>
      <Separator />

      <div>Thick separator</div>
      <Separator className="h-1 bg-primary" />

      <div>Dashed separator</div>
      <Separator className="border-t border-dashed border-border bg-transparent h-0" />

      <div>Colored separator</div>
      <Separator className="bg-destructive" />
    </div>
  ),
};
