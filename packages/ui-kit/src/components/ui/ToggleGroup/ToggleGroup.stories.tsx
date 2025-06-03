import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "UI Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Selection type - single or multiple",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
      description: "The variant of the toggle group",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the toggle group is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SingleSelection: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultipleSelection: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold">
        <span className="font-bold">B</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <span className="italic">I</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <span className="underline">U</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough">
        <span className="line-through">S</span>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default Variant</h3>
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Outline Variant</h3>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Small</h3>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left" size="sm">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" size="sm">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" size="sm">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default</h3>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left" size="default">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" size="default">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" size="default">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Large</h3>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left" size="lg">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" size="lg">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" size="lg">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

const ControlledSingleExample = () => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className="space-y-4">
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">
        Selected: {value || "None"}
      </p>
    </div>
  );
};

export const ControlledSingle: Story = {
  render: () => <ControlledSingleExample />,
};

const ControlledMultipleExample = () => {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <div className="space-y-4">
      <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
        <ToggleGroupItem value="bold">
          <span className="font-bold">B</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <span className="italic">I</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <span className="underline">U</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough">
          <span className="line-through">S</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">
        Selected: {values.length > 0 ? values.join(", ") : "None"}
      </p>
    </div>
  );
};

export const ControlledMultiple: Story = {
  render: () => <ControlledMultipleExample />,
};

export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-4">
      <ToggleGroup type="single" defaultValue="left" variant="outline">
        <ToggleGroupItem value="left" aria-label="Align left">
          ⬅️
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          ↔️
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          ➡️
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify">
          ↕️
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="p-4 border rounded-md bg-background">
        <p className="text-left">
          This text alignment demo shows the toggle group in action. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  ),
};

export const ViewModes: Story = {
  render: () => (
    <div className="space-y-4">
      <ToggleGroup type="single" defaultValue="list" variant="outline">
        <ToggleGroupItem value="list" aria-label="List view">
          📋 List
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          ⊞ Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="card" aria-label="Card view">
          🃏 Card
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="p-4 border rounded-md bg-muted">
        <p className="text-sm">View mode selection demo</p>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="save" aria-label="Save">
        💾
      </ToggleGroupItem>
      <ToggleGroupItem value="print" aria-label="Print">
        🖨️
      </ToggleGroupItem>
      <ToggleGroupItem value="share" aria-label="Share">
        📤
      </ToggleGroupItem>
      <ToggleGroupItem value="download" aria-label="Download">
        📥
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
