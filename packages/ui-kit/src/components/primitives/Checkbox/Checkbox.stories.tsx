import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
    title: 'Components/Form/Checkbox',
    component: Checkbox,
    argTypes: {
        label: { control: 'text' },
        description: { control: 'text' },
        error: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Accept terms and conditions',
    },
};

export const Checked: Story = {
    args: {
        label: 'Accept terms and conditions',
        checked: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Subscribe to newsletter',
        description: 'Receive weekly updates about our products',
    },
};

export const WithError: Story = {
    args: {
        label: 'Accept terms and conditions',
        error: 'This field is required',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Accept terms and conditions',
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: 'Accept terms and conditions',
        disabled: true,
        checked: true,
    },
}; 