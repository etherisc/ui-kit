import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
    title: 'Layout/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Laptops', isActive: true },
        ],
    },
};

export const WithCustomSeparator: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Laptops', isActive: true },
        ],
        separator: '→',
    },
};

export const LongPath: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Electronics', href: '#' },
            { label: 'Computers', href: '#' },
            { label: 'Laptops', href: '#' },
            { label: 'Gaming Laptops', isActive: true },
        ],
    },
};

export const LongPathTruncated: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Electronics', href: '#' },
            { label: 'Computers', href: '#' },
            { label: 'Laptops', href: '#' },
            { label: 'Gaming Laptops', isActive: true },
        ],
        truncate: true,
        maxVisibleItems: 3,
    },
}; 