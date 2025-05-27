import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SliderInput } from "./SliderInput";

const meta: Meta<typeof SliderInput> = {
  title: "Primitives/SliderInput",
  component: SliderInput,
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
    showValue: {
      control: "boolean",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Volume",
    value: 75,
    id: "volume-slider",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Brightness",
    description: "Adjust the screen brightness level",
    value: 60,
    id: "brightness-slider",
  },
};

export const WithError: Story = {
  args: {
    label: "Temperature",
    error: "Value is outside acceptable range",
    value: 95,
    id: "temperature-slider",
  },
};

export const WithValueDisplay: Story = {
  args: {
    label: "Progress",
    value: 30,
    showValue: true,
    id: "progress-slider",
  },
};

export const WithCustomFormatter: Story = {
  args: {
    label: "Percentage",
    value: 65,
    formatValue: (value: number) => `${value}%`,
    id: "percentage-slider",
  },
};

export const WithoutValueDisplay: Story = {
  args: {
    label: "Hidden Value",
    value: 40,
    showValue: false,
    id: "hidden-value-slider",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Slider",
    value: 50,
    disabled: true,
    id: "disabled-slider",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small Slider",
    value: 25,
    size: "sm",
    id: "small-slider",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large Slider",
    value: 75,
    size: "lg",
    id: "large-slider",
  },
};

export const CustomRange: Story = {
  args: {
    label: "Custom Range (10-200)",
    value: 100,
    min: 10,
    max: 200,
    step: 5,
    formatValue: (value: number) => `${value} units`,
    id: "custom-range-slider",
  },
};

export const PriceRange: Story = {
  args: {
    label: "Price Range",
    value: 250,
    min: 0,
    max: 1000,
    step: 10,
    formatValue: (value: number) => `$${value}`,
    description: "Set your maximum budget",
    id: "price-slider",
  },
};

export const TemperatureControl: Story = {
  args: {
    label: "Temperature",
    value: 22,
    min: 16,
    max: 30,
    step: 0.5,
    formatValue: (value: number) => `${value}°C`,
    description: "Adjust room temperature",
    id: "temp-slider",
  },
};

// Interactive example for React Hook Form integration
const ReactHookFormExampleComponent = () => {
  const [value, setValue] = React.useState<number>(50);

  return (
    <div className="w-80 space-y-4">
      <SliderInput
        label="Volume Control"
        description="This example shows React Hook Form integration"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        formatValue={(v) => `${v}%`}
        id="rhf-slider"
      />
      <div className="text-sm text-muted-foreground">
        Current value: <code>{value}</code>
      </div>
    </div>
  );
};

export const ReactHookFormExample: Story = {
  render: () => <ReactHookFormExampleComponent />,
};
