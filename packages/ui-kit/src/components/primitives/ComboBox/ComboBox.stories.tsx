import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ComboBox, type ComboBoxOption } from "./ComboBox";

const meta: Meta<typeof ComboBox> = {
  title: "Form Controls/ComboBox",
  component: ComboBox,
  parameters: {
    layout: "centered",
    a11y: {
      disable: false,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    searchable: {
      control: "boolean",
    },
    value: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: ComboBoxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik", disabled: true },
];

const countryOptions: ComboBoxOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
];

export const Default: Story = {
  args: {
    id: "default-combobox",
    options: sampleOptions,
    placeholder: "Select a framework...",
  },
};

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    placeholder: "Choose your framework",
    id: "framework-select",
  },
};

export const WithDescription: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    description: "Select your preferred frontend framework for development",
    placeholder: "Choose framework",
    id: "framework-with-desc",
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    error: "Please select a framework",
    placeholder: "Choose framework",
    id: "framework-error",
  },
};

export const WithSelectedValue: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    value: "react",
    placeholder: "Choose framework",
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    disabled: true,
    placeholder: "Choose framework",
  },
};

export const SmallSize: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    size: "sm",
    placeholder: "Choose framework",
  },
};

export const LargeSize: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    size: "lg",
    placeholder: "Choose framework",
  },
};

export const NonSearchable: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    searchable: false,
    placeholder: "Choose framework",
  },
};

export const CustomEmptyText: Story = {
  args: {
    options: sampleOptions,
    label: "Frontend Framework",
    emptyText: "No frameworks match your search",
    placeholder: "Search frameworks...",
  },
};

export const ManyOptions: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country...",
    description: "Choose your country from the list",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "option1", label: "Available Option 1" },
      { value: "option2", label: "Available Option 2" },
      { value: "option3", label: "Disabled Option", disabled: true },
      { value: "option4", label: "Available Option 3" },
      { value: "option5", label: "Another Disabled Option", disabled: true },
    ],
    label: "Options with Disabled Items",
    placeholder: "Select an option...",
  },
};

// Interactive example for React Hook Form integration
const ReactHookFormExampleComponent = () => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className="w-80">
      <ComboBox
        options={sampleOptions}
        label="Framework Selection"
        description="This example shows React Hook Form integration"
        value={value}
        onChange={setValue}
        placeholder="Choose a framework..."
        id="rhf-example"
      />
      <div className="mt-4 text-sm text-muted-foreground">
        Selected value: <code>{value || "none"}</code>
      </div>
    </div>
  );
};

export const ReactHookFormExample: Story = {
  render: () => <ReactHookFormExampleComponent />,
};
