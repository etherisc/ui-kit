import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./InputOTP";

const meta: Meta<typeof InputOTP> = {
  title: "UI Components/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: { type: "number" },
      description: "Maximum number of characters",
    },
    value: {
      control: { type: "text" },
      description: "Current value of the input",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    autoFocus: {
      control: { type: "boolean" },
      description: "Whether to auto-focus the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <InputOTP maxLength={6} aria-label="Enter 6-digit verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <InputOTP maxLength={6} aria-label="Enter 6-digit code with separator">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const FourDigits: Story = {
  render: () => (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const EightDigits: Story = {
  render: () => (
    <InputOTP maxLength={8}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const NumbersOnly: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

const ControlledExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-4">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-center text-sm text-muted-foreground">
        Current value: "{value}"
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

const FormExample = () => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted OTP: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter verification code:</label>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <button
        type="submit"
        disabled={value.length !== 6}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        Verify Code
      </button>
    </form>
  );
};

export const WithForm: Story = {
  render: () => <FormExample />,
};

const ValidationExample = () => {
  const [value, setValue] = React.useState("");
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  const handleComplete = (value: string) => {
    // Simulate validation
    const isCorrect = value === "123456";
    setIsValid(isCorrect);
  };

  const handleChange = (value: string) => {
    setValue(value);
    if (value.length < 6) {
      setIsValid(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Enter code (try "123456"):
        </label>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {isValid !== null && (
        <div
          className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}
        >
          {isValid ? "✓ Code is valid!" : "✗ Invalid code. Try again."}
        </div>
      )}
    </div>
  );
};

export const WithValidation: Story = {
  render: () => <ValidationExample />,
};

export const MultipleSeparators: Story = {
  render: () => (
    <InputOTP maxLength={8}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

const AutoFocusExample = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This input will automatically focus when the story loads:
      </p>
      <InputOTP maxLength={6} autoFocus>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export const AutoFocus: Story = {
  render: () => <AutoFocusExample />,
};

const AllStatesExample = () => {
  const [values, setValues] = React.useState({
    empty: "",
    partial: "123",
    full: "123456",
    disabled: "456",
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Empty</h3>
        <InputOTP
          maxLength={6}
          value={values.empty}
          onChange={(value) => setValues((prev) => ({ ...prev, empty: value }))}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Partially filled</h3>
        <InputOTP
          maxLength={6}
          value={values.partial}
          onChange={(value) =>
            setValues((prev) => ({ ...prev, partial: value }))
          }
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Completely filled</h3>
        <InputOTP
          maxLength={6}
          value={values.full}
          onChange={(value) => setValues((prev) => ({ ...prev, full: value }))}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled</h3>
        <InputOTP maxLength={6} value={values.disabled} disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesExample />,
};
