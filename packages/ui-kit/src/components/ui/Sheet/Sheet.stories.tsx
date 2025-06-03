import React from "react";
import type { Meta } from "@storybook/react";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "UI Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Whether the sheet is open",
    },
    modal: {
      control: { type: "boolean" },
      description: "Whether the sheet should be modal",
    },
  },
};

export default meta;

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FromLeft = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Access the main navigation from the left side.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </nav>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FromTop = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification Center</SheetTitle>
          <SheetDescription>
            View your recent notifications and announcements.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                New feature available
              </p>
              <p className="text-sm text-muted-foreground">
                Check out the latest updates to our platform.
              </p>
            </div>
            <div className="text-xs text-muted-foreground">2m ago</div>
          </div>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Deployment successful
              </p>
              <p className="text-sm text-muted-foreground">
                Your latest changes have been deployed.
              </p>
            </div>
            <div className="text-xs text-muted-foreground">5m ago</div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Mark all as read</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FromBottom = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>
            Perform common actions quickly from this panel.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <Button variant="outline" className="h-20 flex-col">
            <div className="h-6 w-6 rounded-full bg-blue-500 mb-2"></div>
            <span className="text-xs">Create</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <div className="h-6 w-6 rounded-full bg-green-500 mb-2"></div>
            <span className="text-xs">Import</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <div className="h-6 w-6 rounded-full bg-purple-500 mb-2"></div>
            <span className="text-xs">Export</span>
          </Button>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add New Contact</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Contact</SheetTitle>
          <SheetDescription>
            Fill in the details to add a new contact to your address book.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input id="firstName" placeholder="John" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input id="lastName" placeholder="Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Additional notes..."
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">Add Contact</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

const ControlledSheetExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open Controlled Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
            <SheetDescription>
              This sheet's open state is controlled by React state.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              The sheet is currently {open ? "open" : "closed"}.
            </p>
          </div>
          <SheetFooter>
            <Button onClick={() => setOpen(false)}>
              Close Programmatically
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} variant="secondary">
          Open Sheet
        </Button>
        <Button onClick={() => setOpen(false)} variant="outline">
          Close Sheet
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Current state: {open ? "Open" : "Closed"}
      </p>
    </div>
  );
};

export const Controlled = {
  render: () => <ControlledSheetExample />,
};

export const CustomSizes = {
  render: () => (
    <div className="flex gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Small</Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle>Small Sheet</SheetTitle>
            <SheetDescription>
              This is a smaller sheet for compact content.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm">Compact content goes here.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Large</Button>
        </SheetTrigger>
        <SheetContent className="w-[600px] sm:w-[600px]">
          <SheetHeader>
            <SheetTitle>Large Sheet</SheetTitle>
            <SheetDescription>
              This is a larger sheet for extensive content.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm">
              This sheet has more room for complex layouts and extensive
              content. You can fit more form fields, data tables, or detailed
              information here.
            </p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Full Width</Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-full">
          <SheetHeader>
            <SheetTitle>Full Width Sheet</SheetTitle>
            <SheetDescription>
              This sheet takes the full width of the viewport.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm">
              Perfect for displaying dashboards, wide tables, or complex
              interfaces that need maximum space.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const WithScrollableContent = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Scrollable Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Terms and Conditions</SheetTitle>
          <SheetDescription>
            Please read through our terms and conditions.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 max-h-[400px] overflow-y-auto">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="mb-4">
              <h4 className="font-medium">Section {i + 1}</h4>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Decline</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Accept</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const MobileResponsive = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Mobile Menu</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Mobile Navigation</SheetTitle>
          <SheetDescription>
            Responsive navigation menu for mobile devices.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left"
            >
              <span className="mr-3">🏠</span>
              Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left"
            >
              <span className="mr-3">📊</span>
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left"
            >
              <span className="mr-3">👥</span>
              Team
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left"
            >
              <span className="mr-3">📁</span>
              Projects
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left"
            >
              <span className="mr-3">⚙️</span>
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left"
            >
              <span className="mr-3">📞</span>
              Support
            </Button>
          </nav>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const WithoutHeader = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Simple Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <div className="py-6">
          <p className="text-sm text-muted-foreground mb-4">
            This is a simple sheet without a header or footer. Perfect for
            minimalist content or custom layouts.
          </p>
          <div className="space-y-4">
            <Button className="w-full">Primary Action</Button>
            <Button variant="outline" className="w-full">
              Secondary Action
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
