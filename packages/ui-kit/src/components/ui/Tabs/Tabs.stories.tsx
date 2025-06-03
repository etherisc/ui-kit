import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../Card/Card";
import { Button } from "../button";

const meta: Meta<typeof Tabs> = {
  title: "UI Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "text" },
      description: "Default active tab",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    value: {
      control: { type: "text" },
      description: "Controlled value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="current" className="text-sm font-medium">
                Current password
              </label>
              <input
                id="current"
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="new" className="text-sm font-medium">
                New password
              </label>
              <input
                id="new"
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button>Save password</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="text-sm text-muted-foreground">
            Get a comprehensive view of your account and recent activities.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            View detailed analytics and performance metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and download various reports.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences and settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const SimpleContent: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Tab One</TabsTrigger>
        <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        <TabsTrigger value="tab3">Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">First Tab Content</h4>
          <p className="text-sm text-muted-foreground">
            This is the content for the first tab. You can put any content here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Second Tab Content</h4>
          <p className="text-sm text-muted-foreground">
            This is the content for the second tab. Each tab can have completely
            different content.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Third Tab Content</h4>
          <p className="text-sm text-muted-foreground">
            This is the content for the third tab. Tabs are great for organizing
            information.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="enabled1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="enabled1">Enabled</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="enabled2">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled1">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">First Enabled Tab</h4>
          <p className="text-sm text-muted-foreground">
            This tab is enabled and can be clicked.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Disabled Tab</h4>
          <p className="text-sm text-muted-foreground">
            This tab is disabled and cannot be accessed.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="enabled2">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Second Enabled Tab</h4>
          <p className="text-sm text-muted-foreground">
            This tab is also enabled and functional.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
