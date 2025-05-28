import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ErrorShell } from "./ErrorShell";
import { Button } from "../../components/primitives/Button";

const meta: Meta<typeof ErrorShell> = {
  title: "Layout/ErrorShell",
  component: ErrorShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "ErrorShell is a layout component for displaying error pages and error states with customizable content and actions.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    showPattern: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorShell>;

/**
 * Default error shell with standard error message
 */
export const Default: Story = {
  args: {},
};

/**
 * 404 Not Found error page
 */
export const NotFound: Story = {
  args: {
    errorCode: "404",
    title: "Page Not Found",
    message:
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    actions: (
      <>
        <Button variant="default" size="sm">
          Go Home
        </Button>
        <Button variant="outline" size="sm">
          Go Back
        </Button>
      </>
    ),
  },
};

/**
 * 500 Server Error page
 */
export const ServerError: Story = {
  args: {
    errorCode: "500",
    title: "Internal Server Error",
    message:
      "Something went wrong on our end. Our team has been notified and is working to fix the issue.",
    actions: (
      <>
        <Button variant="default" size="sm">
          Try Again
        </Button>
        <Button variant="outline" size="sm">
          Contact Support
        </Button>
      </>
    ),
    showPattern: true,
  },
};

/**
 * Network error with custom icon
 */
export const NetworkError: Story = {
  args: {
    title: "Connection Lost",
    message:
      "Unable to connect to the server. Please check your internet connection and try again.",
    icon: (
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-warning/10">
        <svg
          className="w-8 h-8 text-warning"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      </div>
    ),
    actions: (
      <Button variant="default" size="sm">
        Retry Connection
      </Button>
    ),
  },
};

/**
 * Access denied error
 */
export const AccessDenied: Story = {
  args: {
    errorCode: "403",
    title: "Access Denied",
    message:
      "You do not have permission to access this resource. Please contact your administrator if you believe this is an error.",
    icon: (
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-destructive/10">
        <svg
          className="w-8 h-8 text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
    ),
    actions: (
      <>
        <Button variant="default" size="sm">
          Go Home
        </Button>
        <Button variant="outline" size="sm">
          Contact Admin
        </Button>
      </>
    ),
  },
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    size: "sm",
    title: "Oops!",
    message: "Something went wrong.",
    actions: (
      <Button variant="default" size="sm">
        Try Again
      </Button>
    ),
  },
};

/**
 * Large size variant with additional content
 */
export const LargeWithContent: Story = {
  args: {
    size: "lg",
    errorCode: "503",
    title: "Service Unavailable",
    message:
      "The service is temporarily unavailable due to maintenance. We apologize for the inconvenience.",
    actions: (
      <>
        <Button variant="default" size="sm">
          Check Status
        </Button>
        <Button variant="outline" size="sm">
          Get Updates
        </Button>
      </>
    ),
    showPattern: true,
    children: (
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Estimated maintenance time: 2 hours</p>
        <p>For urgent matters, please contact our emergency support line.</p>
      </div>
    ),
  },
};

/**
 * Minimal error without actions
 */
export const Minimal: Story = {
  args: {
    title: "Error",
    message: "An error occurred while processing your request.",
    size: "sm",
  },
};
