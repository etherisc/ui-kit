import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta = {
    title: 'Components/TextInput',
    component: TextInput,
    args: {
        placeholder: 'Type here',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        label: 'First name',
    },
};

export const Error: Story = {
    args: {
        label: 'Email',
        error: 'Invalid email',
    },
}; 