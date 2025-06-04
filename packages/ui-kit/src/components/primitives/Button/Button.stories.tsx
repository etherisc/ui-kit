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
        "primary",
        "secondary",
        "outline",
        "ghost",
        "link",
        "danger",
      ],
      description: "The visual style of the button (recommended)",
    },
    intent: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "outline",
        "ghost",
        "link",
        "danger",
      ],
      description: "Deprecated: Use variant instead. Will be removed in v0.5.0",
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

export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    intent: "danger",
    children: "Danger Button",
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

// i18n Examples
const I18nButtonExample = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation();
  return <Button intent="primary">{t(translationKey)}</Button>;
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

// New variant examples (recommended approach)
export const VariantPrimary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button (variant)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary button using the new variant prop (recommended over intent).",
      },
    },
  },
};

export const VariantSecondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button (variant)",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary button using the new variant prop.",
      },
    },
  },
};

export const VariantDanger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button (variant)",
  },
  parameters: {
    docs: {
      description: {
        story: "Danger button using the new variant prop.",
      },
    },
  },
};
