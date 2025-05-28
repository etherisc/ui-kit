import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SpinnerInput } from "./SpinnerInput";

const meta: Meta<typeof SpinnerInput> = {
  title: "Primitives/SpinnerInput",
  component: SpinnerInput,
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
    showButtons: {
      control: "boolean",
    },
    value: {
      control: "number",
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
    precision: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-spinner",
    value: 10,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Quantity",
    value: 5,
    id: "quantity-input",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Items",
    description: "Enter the number of items you want to order",
    value: 3,
    id: "items-input",
  },
};

export const WithError: Story = {
  args: {
    label: "Age",
    error: "Age must be between 18 and 100",
    value: 15,
    min: 18,
    max: 100,
    id: "age-input",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Score (0-100)",
    value: 75,
    min: 0,
    max: 100,
    step: 5,
    id: "score-input",
  },
};

export const WithPrecision: Story = {
  args: {
    label: "Price",
    value: 19.99,
    min: 0,
    step: 0.01,
    precision: 2,
    placeholder: "0.00",
    id: "price-input",
  },
};

export const WithoutButtons: Story = {
  args: {
    label: "Manual Entry Only",
    value: 42,
    showButtons: false,
    id: "manual-input",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    value: 25,
    disabled: true,
    id: "disabled-input",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small Spinner",
    value: 8,
    size: "sm",
    id: "small-input",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large Spinner",
    value: 12,
    size: "lg",
    id: "large-input",
  },
};

export const Temperature: Story = {
  args: {
    label: "Temperature (°C)",
    value: 22.5,
    min: -10,
    max: 40,
    step: 0.5,
    precision: 1,
    description: "Set your preferred room temperature",
    id: "temperature-input",
  },
};

export const Percentage: Story = {
  args: {
    label: "Completion (%)",
    value: 85,
    min: 0,
    max: 100,
    step: 5,
    description: "Project completion percentage",
    id: "percentage-input",
  },
};

export const Currency: Story = {
  args: {
    label: "Amount ($)",
    value: 1250.75,
    min: 0,
    step: 0.25,
    precision: 2,
    description: "Enter the transaction amount",
    id: "currency-input",
  },
};

export const Inventory: Story = {
  args: {
    label: "Stock Quantity",
    value: 150,
    min: 0,
    max: 1000,
    step: 10,
    description: "Current inventory level",
    id: "inventory-input",
  },
};

export const Rating: Story = {
  args: {
    label: "Rating (1-5)",
    value: 4.2,
    min: 1,
    max: 5,
    step: 0.1,
    precision: 1,
    description: "Rate this product",
    id: "rating-input",
  },
};

// Interactive example for React Hook Form integration
const ReactHookFormExampleComponent = () => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [price, setPrice] = React.useState<number>(29.99);

  const total = quantity * price;

  return (
    <div className="w-80 space-y-4">
      <SpinnerInput
        label="Quantity"
        description="Number of items"
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={10}
        step={1}
        id="rhf-quantity"
      />

      <SpinnerInput
        label="Unit Price"
        description="Price per item"
        value={price}
        onChange={setPrice}
        min={0}
        step={0.01}
        precision={2}
        id="rhf-price"
      />

      <div className="rounded-md bg-muted p-3">
        <div className="text-sm font-medium">Order Summary</div>
        <div className="text-sm text-foreground">
          {quantity} × ${price.toFixed(2)} ={" "}
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export const ReactHookFormExample: Story = {
  render: () => <ReactHookFormExampleComponent />,
};
