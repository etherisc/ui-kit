import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Button } from "../button";

const meta: Meta<typeof Switch> = {
  title: "UI Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Whether the switch is checked",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the switch is disabled",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

const ControlledExample = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        id="controlled-switch"
      />
      <label htmlFor="controlled-switch" className="text-sm">
        {checked ? "Enabled" : "Disabled"}
      </label>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <label htmlFor="notifications" className="text-sm font-medium">
          Email notifications
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="marketing" defaultChecked />
        <label htmlFor="marketing" className="text-sm font-medium">
          Marketing emails
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="security" disabled />
        <label
          htmlFor="security"
          className="text-sm font-medium text-muted-foreground"
        >
          Security alerts (required)
        </label>
      </div>
    </div>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <label htmlFor="airplane-mode" className="text-sm font-medium">
            Airplane Mode
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Turn off all wireless connections
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch id="wifi" defaultChecked />
          <label htmlFor="wifi" className="text-sm font-medium">
            Wi-Fi
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Connect to available wireless networks
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch id="bluetooth" />
          <label htmlFor="bluetooth" className="text-sm font-medium">
            Bluetooth
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Connect to bluetooth devices
        </p>
      </div>
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Preferences</h3>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <label className="text-base font-medium">Email Notifications</label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about your account activity.
            </p>
          </div>
          <Switch defaultChecked={false} />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <label className="text-base font-medium">Marketing Emails</label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
          <Switch defaultChecked={true} />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <label className="text-base font-medium">Security Alerts</label>
            <p className="text-sm text-muted-foreground">
              Receive alerts about your account security.
            </p>
          </div>
          <Switch defaultChecked={true} />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <label className="text-base font-medium">Analytics</label>
            <p className="text-sm text-muted-foreground">
              Help us improve our service by sharing anonymous usage data.
            </p>
          </div>
          <Switch defaultChecked={false} />
        </div>
      </div>

      <Button>Save preferences</Button>
    </div>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch className="h-4 w-8 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4" />
        <label className="text-sm">Small switch</label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch />
        <label className="text-sm">Default switch</label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch className="h-7 w-14 [&>span]:h-6 [&>span]:w-6 [&>span]:data-[state=checked]:translate-x-7" />
        <label className="text-sm">Large switch</label>
      </div>
    </div>
  ),
};

const InteractionStatesExample = () => {
  const [states, setStates] = React.useState({
    basic: false,
    focused: false,
    disabled: false,
    disabledChecked: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={states.basic}
          onCheckedChange={(checked) =>
            setStates((prev) => ({ ...prev, basic: checked }))
          }
        />
        <label className="text-sm">Basic switch</label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={states.focused}
          onCheckedChange={(checked) =>
            setStates((prev) => ({ ...prev, focused: checked }))
          }
          className="focus:ring-2 focus:ring-primary"
        />
        <label className="text-sm">Focus ring visible</label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch disabled checked={states.disabled} />
        <label className="text-sm text-muted-foreground">
          Disabled unchecked
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch disabled checked={states.disabledChecked} />
        <label className="text-sm text-muted-foreground">
          Disabled checked
        </label>
      </div>
    </div>
  );
};

export const InteractionStates: Story = {
  render: () => <InteractionStatesExample />,
};
