import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Primitives/TextArea",
  component: TextArea,
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
    rows: {
      control: "number",
    },
    cols: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message here...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message here...",
    id: "message",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Feedback",
    description: "Please provide detailed feedback about your experience.",
    placeholder: "Your feedback...",
    id: "feedback",
  },
};

export const WithError: Story = {
  args: {
    label: "Required Field",
    error: "This field is required",
    placeholder: "Enter text...",
    id: "required-field",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled TextArea",
    placeholder: "This is disabled",
    disabled: true,
    id: "disabled",
  },
};

export const Small: Story = {
  args: {
    label: "Small TextArea",
    size: "sm",
    placeholder: "Small size...",
    id: "small",
  },
};

export const Large: Story = {
  args: {
    label: "Large TextArea",
    size: "lg",
    placeholder: "Large size...",
    id: "large",
  },
};

export const WithRowsAndCols: Story = {
  args: {
    label: "Custom Dimensions",
    rows: 8,
    cols: 50,
    placeholder: "This textarea has 8 rows and 50 columns...",
    id: "custom-dimensions",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <TextArea
        label="Default"
        placeholder="Default textarea"
        id="default-variant"
      />
      <TextArea
        label="With Description"
        description="This is a helpful description"
        placeholder="Textarea with description"
        id="description-variant"
      />
      <TextArea
        label="Error State"
        error="This field has an error"
        placeholder="Error state textarea"
        id="error-variant"
      />
      <TextArea
        label="Disabled"
        disabled
        placeholder="Disabled textarea"
        id="disabled-variant"
      />
      <TextArea
        label="Small Size"
        size="sm"
        placeholder="Small textarea"
        id="small-variant"
      />
      <TextArea
        label="Large Size"
        size="lg"
        placeholder="Large textarea"
        id="large-variant"
      />
    </div>
  ),
};
