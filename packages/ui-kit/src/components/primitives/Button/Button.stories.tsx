import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";

const meta: Meta<typeof Button> = {
  title: "Form Controls/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

const I18nButtonExample = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation();
  return <Button variant="default">{t(translationKey)}</Button>;
};

export const I18nSubmit: Story = {
  render: () => <I18nButtonExample translationKey="button.submit" />,
  parameters: {
    docs: {
      description: {
        story:
          'Button with internationalized "Submit" text. Switch locale in toolbar to see German translation.',
      },
    },
  },
};

export const I18nCancel: Story = {
  render: () => <I18nButtonExample translationKey="button.cancel" />,
  parameters: {
    docs: {
      description: {
        story:
          'Button with internationalized "Cancel" text. Switch locale in toolbar to see German translation.',
      },
    },
  },
};

export const I18nSave: Story = {
  render: () => <I18nButtonExample translationKey="button.save" />,
  parameters: {
    docs: {
      description: {
        story:
          'Button with internationalized "Save" text. Switch locale in toolbar to see German translation.',
      },
    },
  },
};

export const I18nLogin: Story = {
  render: () => <I18nButtonExample translationKey="button.login" />,
  parameters: {
    docs: {
      description: {
        story:
          'Button with internationalized "Login" text. Switch locale in toolbar to see German translation.',
      },
    },
  },
};
