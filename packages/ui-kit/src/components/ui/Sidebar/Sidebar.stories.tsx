import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  HelpCircle,
  User,
  LogOut,
  Building,
  Calendar,
  Inbox,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
} from "./Sidebar";
import { Input } from "../input";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { Separator } from "../Separator/Separator";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible sidebar component with collapsible state, responsive behavior, and navigation support. Perfect for application layouts and navigation systems.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-background">
    {children}
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <SidebarTrigger />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">Card {i + 1}</h3>
              <p className="text-muted-foreground">
                This is sample content for the main area. The sidebar can be
                collapsed to give more space to the content.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <DemoLayout>
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold">My App</h2>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem icon={<Home className="h-4 w-4" />} isActive>
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                Users
              </SidebarNavItem>
              <SidebarNavItem icon={<FileText className="h-4 w-4" />}>
                Documents
              </SidebarNavItem>
              <SidebarNavItem icon={<BarChart3 className="h-4 w-4" />}>
                Analytics
              </SidebarNavItem>
              <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>
          <SidebarFooter>
            <SidebarNavItem icon={<HelpCircle className="h-4 w-4" />}>
              Help
            </SidebarNavItem>
          </SidebarFooter>
        </Sidebar>
      </DemoLayout>
    </SidebarProvider>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultCollapsed>
      <DemoLayout>
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold">My App</h2>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem icon={<Home className="h-4 w-4" />} isActive>
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                Users
              </SidebarNavItem>
              <SidebarNavItem icon={<FileText className="h-4 w-4" />}>
                Documents
              </SidebarNavItem>
              <SidebarNavItem icon={<BarChart3 className="h-4 w-4" />}>
                Analytics
              </SidebarNavItem>
              <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>
          <SidebarFooter>
            <SidebarNavItem icon={<HelpCircle className="h-4 w-4" />}>
              Help
            </SidebarNavItem>
          </SidebarFooter>
        </Sidebar>
      </DemoLayout>
    </SidebarProvider>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <SidebarProvider>
      <DemoLayout>
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold">My App</h2>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent padding="sm">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
              </div>
            </div>
            <Separator />
            <div className="p-2">
              <SidebarNav>
                <SidebarNavItem icon={<Home className="h-4 w-4" />} isActive>
                  Dashboard
                </SidebarNavItem>
                <SidebarNavItem icon={<Inbox className="h-4 w-4" />}>
                  Inbox
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    12
                  </span>
                </SidebarNavItem>
                <SidebarNavItem icon={<Calendar className="h-4 w-4" />}>
                  Calendar
                </SidebarNavItem>
                <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                  Team
                </SidebarNavItem>
                <SidebarNavItem icon={<Building className="h-4 w-4" />}>
                  Company
                </SidebarNavItem>
              </SidebarNav>
            </div>
          </SidebarContent>
        </Sidebar>
      </DemoLayout>
    </SidebarProvider>
  ),
};

export const WithUserProfile: Story = {
  render: () => (
    <SidebarProvider>
      <DemoLayout>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">
                  john@example.com
                </p>
              </div>
            </div>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem icon={<Home className="h-4 w-4" />} isActive>
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                Team
              </SidebarNavItem>
              <SidebarNavItem icon={<FileText className="h-4 w-4" />}>
                Projects
              </SidebarNavItem>
              <SidebarNavItem icon={<BarChart3 className="h-4 w-4" />}>
                Reports
              </SidebarNavItem>
            </SidebarNav>
            <Separator className="my-4" />
            <SidebarNav>
              <SidebarNavItem icon={<User className="h-4 w-4" />}>
                Profile
              </SidebarNavItem>
              <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>
          <SidebarFooter>
            <SidebarNavItem icon={<LogOut className="h-4 w-4" />}>
              Sign Out
            </SidebarNavItem>
          </SidebarFooter>
        </Sidebar>
      </DemoLayout>
    </SidebarProvider>
  ),
};

export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <SidebarTrigger />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">Card {i + 1}</h3>
                  <p className="text-muted-foreground">
                    This sidebar is positioned on the right side of the screen.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Sidebar position="right">
          <SidebarHeader>
            <SidebarTrigger />
            <h2 className="text-lg font-semibold">Tools</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem icon={<Search className="h-4 w-4" />}>
                Search
              </SidebarNavItem>
              <SidebarNavItem icon={<FileText className="h-4 w-4" />} isActive>
                Documents
              </SidebarNavItem>
              <SidebarNavItem icon={<BarChart3 className="h-4 w-4" />}>
                Analytics
              </SidebarNavItem>
              <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Sidebar</h3>
        <div className="h-64 border rounded-lg overflow-hidden">
          <SidebarProvider>
            <div className="flex h-full">
              <Sidebar size="sm">
                <SidebarHeader>
                  <h2 className="text-sm font-semibold">Small</h2>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarNav>
                    <SidebarNavItem
                      icon={<Home className="h-3 w-3" />}
                      isActive
                    >
                      Home
                    </SidebarNavItem>
                    <SidebarNavItem icon={<Users className="h-3 w-3" />}>
                      Users
                    </SidebarNavItem>
                  </SidebarNav>
                </SidebarContent>
              </Sidebar>
              <div className="flex-1 p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Small sidebar content
                </p>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large Sidebar</h3>
        <div className="h-64 border rounded-lg overflow-hidden">
          <SidebarProvider>
            <div className="flex h-full">
              <Sidebar size="lg">
                <SidebarHeader>
                  <h2 className="text-lg font-semibold">Large Sidebar</h2>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarNav>
                    <SidebarNavItem
                      icon={<Home className="h-4 w-4" />}
                      isActive
                    >
                      Dashboard
                    </SidebarNavItem>
                    <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                      User Management
                    </SidebarNavItem>
                    <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                      System Settings
                    </SidebarNavItem>
                  </SidebarNav>
                </SidebarContent>
              </Sidebar>
              <div className="flex-1 p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Large sidebar content
                </p>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  ),
};

export const GhostVariant: Story = {
  render: () => (
    <SidebarProvider>
      <DemoLayout>
        <Sidebar variant="ghost">
          <SidebarHeader>
            <h2 className="text-lg font-semibold">Ghost Sidebar</h2>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem icon={<Home className="h-4 w-4" />} isActive>
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                Users
              </SidebarNavItem>
              <SidebarNavItem icon={<FileText className="h-4 w-4" />}>
                Documents
              </SidebarNavItem>
              <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>
        </Sidebar>
      </DemoLayout>
    </SidebarProvider>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <SidebarProvider>
      <DemoLayout>
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold">My App</h2>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav>
              <SidebarNavItem icon={<Home className="h-4 w-4" />} isActive>
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem icon={<Users className="h-4 w-4" />}>
                Users
              </SidebarNavItem>
              <SidebarNavItem icon={<FileText className="h-4 w-4" />} disabled>
                Documents (Coming Soon)
              </SidebarNavItem>
              <SidebarNavItem icon={<BarChart3 className="h-4 w-4" />} disabled>
                Analytics (Premium)
              </SidebarNavItem>
              <SidebarNavItem icon={<Settings className="h-4 w-4" />}>
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarContent>
        </Sidebar>
      </DemoLayout>
    </SidebarProvider>
  ),
};
