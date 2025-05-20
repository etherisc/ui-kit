import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
];

const meta = {
    title: 'Components/Form/Select',
    component: Select,
    args: {
        placeholder: 'Select an option',
        options,
    },
    argTypes: {
        label: { control: 'text' },
        description: { control: 'text' },
        error: { control: 'text' },
        disabled: { control: 'boolean' },
        value: { control: 'select', options: ['option1', 'option2', 'option3', 'option4'] },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        label: 'Favorite Color',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Favorite Color',
        description: 'Select your favorite color',
    },
};

export const WithError: Story = {
    args: {
        label: 'Favorite Color',
        error: 'Please select a color',
    },
};

export const WithValue: Story = {
    args: {
        label: 'Favorite Color',
        value: 'option1',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Favorite Color',
        disabled: true,
    },
}; 