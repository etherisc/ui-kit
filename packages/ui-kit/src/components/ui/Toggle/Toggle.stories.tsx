import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "UI Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
      description: "The variant of the toggle",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "The size of the toggle",
    },
    pressed: {
      control: { type: "boolean" },
      description: "Whether the toggle is pressed",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the toggle is disabled",
    },
    children: {
      control: { type: "text" },
      description: "Toggle content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Toggle",
  },
};

export const Pressed: Story = {
  args: {
    children: "Pressed",
    pressed: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const DisabledPressed: Story = {
  args: {
    children: "Disabled Pressed",
    disabled: true,
    pressed: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
};

const ControlledExample = () => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div className="flex items-center space-x-4">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "Pressed" : "Not Pressed"}
      </Toggle>
      <span className="text-sm text-muted-foreground">
        State: {pressed ? "On" : "Off"}
      </span>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <span className="font-bold">B</span>
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <span className="italic">I</span>
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <span className="underline">U</span>
      </Toggle>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle>❤️ Like</Toggle>
      <Toggle>📖 Bookmark</Toggle>
      <Toggle>🔄 Repost</Toggle>
    </div>
  ),
};

const TextEditorExample = () => {
  const [toggles, setToggles] = React.useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const updateToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1 border rounded-md p-1">
        <Toggle
          pressed={toggles.bold}
          onPressedChange={() => updateToggle("bold")}
          size="sm"
          aria-label="Toggle bold"
        >
          <span className="font-bold">B</span>
        </Toggle>
        <Toggle
          pressed={toggles.italic}
          onPressedChange={() => updateToggle("italic")}
          size="sm"
          aria-label="Toggle italic"
        >
          <span className="italic">I</span>
        </Toggle>
        <Toggle
          pressed={toggles.underline}
          onPressedChange={() => updateToggle("underline")}
          size="sm"
          aria-label="Toggle underline"
        >
          <span className="underline">U</span>
        </Toggle>
        <Toggle
          pressed={toggles.strikethrough}
          onPressedChange={() => updateToggle("strikethrough")}
          size="sm"
          aria-label="Toggle strikethrough"
        >
          <span className="line-through">S</span>
        </Toggle>
      </div>

      <div className="p-4 border rounded-md bg-background">
        <p
          className={`
            ${toggles.bold ? "font-bold" : ""}
            ${toggles.italic ? "italic" : ""}
            ${toggles.underline ? "underline" : ""}
            ${toggles.strikethrough ? "line-through" : ""}
          `}
        >
          Sample text with formatting applied
        </p>
      </div>
    </div>
  );
};

export const TextEditor: Story = {
  render: () => <TextEditorExample />,
};

const ViewModesExample = () => {
  const [viewMode, setViewMode] = React.useState<"list" | "grid" | "card">(
    "list",
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1">
        <Toggle
          pressed={viewMode === "list"}
          onPressedChange={() => setViewMode("list")}
          aria-label="List view"
        >
          📋 List
        </Toggle>
        <Toggle
          pressed={viewMode === "grid"}
          onPressedChange={() => setViewMode("grid")}
          aria-label="Grid view"
        >
          ⊞ Grid
        </Toggle>
        <Toggle
          pressed={viewMode === "card"}
          onPressedChange={() => setViewMode("card")}
          aria-label="Card view"
        >
          🃏 Card
        </Toggle>
      </div>

      <div className="p-4 border rounded-md bg-muted">
        <p className="text-sm">
          Current view: <strong>{viewMode}</strong>
        </p>
      </div>
    </div>
  );
};

export const ViewModes: Story = {
  render: () => <ViewModesExample />,
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default Variant</h3>
        <div className="flex space-x-2">
          <Toggle>Default</Toggle>
          <Toggle pressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
          <Toggle disabled pressed>
            Disabled Pressed
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Outline Variant</h3>
        <div className="flex space-x-2">
          <Toggle variant="outline">Default</Toggle>
          <Toggle variant="outline" pressed>
            Pressed
          </Toggle>
          <Toggle variant="outline" disabled>
            Disabled
          </Toggle>
          <Toggle variant="outline" disabled pressed>
            Disabled Pressed
          </Toggle>
        </div>
      </div>
    </div>
  ),
};
