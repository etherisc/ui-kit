import React from "react";
import type { Meta } from "@storybook/react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "UI Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "Whether the collapsible is disabled",
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: "Initial open state",
    },
  },
};

export default meta;

export const Default = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Recent Projects</h4>
        <CollapsibleTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle projects</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          <div className="font-medium">Project Alpha</div>
          <div className="text-muted-foreground">
            Web application with React and TypeScript
          </div>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          <div className="font-medium">Project Beta</div>
          <div className="text-muted-foreground">
            Mobile app with React Native
          </div>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          <div className="font-medium">Project Gamma</div>
          <div className="text-muted-foreground">
            Backend API with Node.js and Express
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Disabled = {
  render: () => (
    <Collapsible disabled className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold opacity-50">Disabled Section</h4>
        <CollapsibleTrigger asChild>
          <button
            disabled
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background opacity-50 cursor-not-allowed"
          >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle (disabled)</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm opacity-50">
        This content cannot be toggled
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm opacity-50">
          Hidden content 1
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm opacity-50">
          Hidden content 2
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

const ControlledExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-[350px] space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Controlled Collapsible</h4>
          <CollapsibleTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
              <span className="sr-only">Toggle</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">
          Always visible content
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            This content is controlled by React state
          </div>
          <div className="rounded-md border px-4 py-3 text-sm">
            Current state: {isOpen ? "Open" : "Closed"}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
        >
          Open
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded bg-secondary px-3 py-1 text-sm text-secondary-foreground"
        >
          Close
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded bg-muted px-3 py-1 text-sm text-muted-foreground"
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export const Controlled = {
  render: () => <ControlledExample />,
};

export const NestedCollapsibles = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Collapsible className="space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Web Development</h4>
          <CollapsibleTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle web development</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 pl-4">
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h5 className="text-sm font-medium">Frontend</h5>
              <CollapsibleTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <ChevronDown className="h-3 w-3" />
                  <span className="sr-only">Toggle frontend</span>
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-1 pl-4">
              <div className="rounded-md border px-3 py-2 text-sm">React</div>
              <div className="rounded-md border px-3 py-2 text-sm">Vue.js</div>
              <div className="rounded-md border px-3 py-2 text-sm">Angular</div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h5 className="text-sm font-medium">Backend</h5>
              <CollapsibleTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <ChevronDown className="h-3 w-3" />
                  <span className="sr-only">Toggle backend</span>
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-1 pl-4">
              <div className="rounded-md border px-3 py-2 text-sm">Node.js</div>
              <div className="rounded-md border px-3 py-2 text-sm">Python</div>
              <div className="rounded-md border px-3 py-2 text-sm">Java</div>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const WithAnimations = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Animated Collapsible</h4>
        <CollapsibleTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all">
            <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
            <span className="sr-only">Toggle</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm">
        Always visible header content
      </div>
      <CollapsibleContent className="space-y-2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <div className="rounded-md border px-4 py-3 text-sm transform transition-all duration-300">
          Smoothly animated content 1
        </div>
        <div className="rounded-md border px-4 py-3 text-sm transform transition-all duration-300 delay-75">
          Smoothly animated content 2
        </div>
        <div className="rounded-md border px-4 py-3 text-sm transform transition-all duration-300 delay-150">
          Smoothly animated content 3
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const CustomStyling = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <Collapsible className="space-y-2">
        <div className="flex items-center justify-between space-x-4 rounded-lg bg-blue-50 px-4 py-2">
          <h4 className="text-sm font-semibold text-blue-900">Information</h4>
          <CollapsibleTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle information</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md bg-blue-50 border-l-4 border-l-blue-500 px-4 py-3 text-sm text-blue-800">
            This is some important information that can be toggled.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-2">
        <div className="flex items-center justify-between space-x-4 rounded-lg bg-green-50 px-4 py-2">
          <h4 className="text-sm font-semibold text-green-900">Success</h4>
          <CollapsibleTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-700 hover:bg-green-200">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle success message</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md bg-green-50 border-l-4 border-l-green-500 px-4 py-3 text-sm text-green-800">
            Operation completed successfully! Here are the details.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-2">
        <div className="flex items-center justify-between space-x-4 rounded-lg bg-amber-50 px-4 py-2">
          <h4 className="text-sm font-semibold text-amber-900">Warning</h4>
          <CollapsibleTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle warning</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md bg-amber-50 border-l-4 border-l-amber-500 px-4 py-3 text-sm text-amber-800">
            Please be aware of this important warning before proceeding.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const TableOfContents = {
  render: () => (
    <div className="w-[300px] space-y-1">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>

      <Collapsible className="space-y-1">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted">
            <span>1. Introduction</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-4">
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            1.1 Overview
          </div>
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            1.2 Getting Started
          </div>
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            1.3 Prerequisites
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-1">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted">
            <span>2. Components</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-4">
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            2.1 Basic Components
          </div>
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            2.2 Form Components
          </div>
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            2.3 Layout Components
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-1">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted">
            <span>3. Advanced Topics</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-4">
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            3.1 Theming
          </div>
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            3.2 Customization
          </div>
          <div className="rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
            3.3 Performance
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
