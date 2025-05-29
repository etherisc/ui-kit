import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta = {
    title: 'Brand/Logo',
    component: Logo,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
    args: {
        text: 'Application Name',
    },
};

export const WithImage: Story = {
    args: {
        text: 'Application Name',
        src: 'https://via.placeholder.com/40',
        alt: 'Logo',
    },
};

export const WithCustomFallback: Story = {
    args: {
        text: 'Application Name',
        fallback: 'C',
    },
};

export const Clickable: Story = {
    args: {
        text: 'Application Name',
        onClick: () => alert('Logo clicked'),
    },
}; 