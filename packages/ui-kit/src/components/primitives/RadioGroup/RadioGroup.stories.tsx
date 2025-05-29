import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
];

const meta = {
    title: 'Form Controls/RadioGroup',
    component: RadioGroup,
    args: {
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
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        label: 'Select an option',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Select an option',
        description: 'Choose the best option for you',
    },
};

export const WithError: Story = {
    args: {
        label: 'Select an option',
        error: 'This field is required',
    },
};

export const WithValue: Story = {
    args: {
        label: 'Select an option',
        value: 'option1',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Select an option',
        disabled: true,
    },
}; 