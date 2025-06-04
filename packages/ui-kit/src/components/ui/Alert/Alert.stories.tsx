import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
      description: "Alert variant",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new software update is available. Download now or install tonight.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Info className="h-4 w-4" />
      <AlertDescription>
        This is a simple notification without a title.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert className="max-w-md border-green-200 text-green-800 dark:border-green-800 dark:text-green-400">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert className="max-w-2xl">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Installation Complete</AlertTitle>
      <AlertDescription>
        The installation process has been completed successfully. Your
        application is now ready to use. You can start by exploring the
        dashboard or checking out the documentation for more information on how
        to get started.
        <br />
        <br />
        If you encounter any issues, please don't hesitate to contact our
        support team.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with normal styling.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert for errors or warnings.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
