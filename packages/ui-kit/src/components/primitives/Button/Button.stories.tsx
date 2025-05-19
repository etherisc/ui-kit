import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    args: {
        children: 'Button',
    },
    argTypes: {
        intent: {
            control: { type: 'select' },
            options: ['default', 'primary', 'secondary', 'danger', 'outline', 'ghost', 'link'],
        },
        size: {
            control: { type: 'select' },
            options: ['default', 'sm', 'lg', 'icon'],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { intent: 'primary' },
};

export const Secondary: Story = {
    args: { intent: 'secondary' },
};

export const Danger: Story = {
    args: { intent: 'danger' },
}; 