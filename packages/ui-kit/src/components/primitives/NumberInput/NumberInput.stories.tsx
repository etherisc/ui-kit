import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NumberInput } from "./NumberInput";

const meta = {
  title: "Form Controls/NumberInput",
  component: NumberInput,
  args: {
    // placeholder: 'Enter a number',
  },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    // disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <main>
        <h1 className="sr-only">NumberInput Component Examples</h1>
        <Story />
      </main>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Number",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Age",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Age",
    description: "Enter your age in years",
  },
};

export const WithError: Story = {
  args: {
    label: "Age",
    error: "Age must be between 18 and 100",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Age",
    min: 0,
    max: 100,
  },
};

export const Disabled: Story = {
  args: {
    label: "Age",
    // disabled: true,
  },
};
