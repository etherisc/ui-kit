import type { Meta, StoryObj } from '@storybook/react';
import { ContentWrapper } from './ContentWrapper';

const meta = {
    title: 'Layout/ContentWrapper',
    component: ContentWrapper,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ContentWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <div className="p-4 border border-dashed border-gray-300 rounded min-h-[200px] flex items-center justify-center">
                <p>Main Content Area</p>
            </div>
        ),
    },
};

export const WithBreadcrumbs: Story = {
    args: {
        children: (
            <div className="p-4 border border-dashed border-gray-300 rounded min-h-[200px] flex items-center justify-center">
                <p>Main Content Area</p>
            </div>
        ),
        breadcrumbs: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Laptops', isActive: true },
        ],
    },
};

export const WithFixedWidth: Story = {
    args: {
        children: (
            <div className="p-4 border border-dashed border-gray-300 rounded min-h-[200px] flex items-center justify-center">
                <p>Fixed Width Content (max-width: 960px)</p>
            </div>
        ),
        fixed: true,
    },
};

export const WithHeaderAndFooter: Story = {
    args: {
        children: (
            <div className="p-4 border border-dashed border-gray-300 rounded min-h-[200px] flex items-center justify-center">
                <p>Main Content Area</p>
            </div>
        ),
        header: (
            <div className="border-b border-dashed border-gray-300 p-4">
                <h2 className="text-xl font-semibold">Content Header</h2>
            </div>
        ),
        footer: (
            <div className="border-t border-dashed border-gray-300 p-4">
                <p className="text-sm text-gray-500">Content Footer</p>
            </div>
        ),
    },
};

export const Complete: Story = {
    args: {
        children: (
            <div className="p-4 border border-dashed border-gray-300 rounded min-h-[200px] flex items-center justify-center">
                <p>Main Content Area</p>
            </div>
        ),
        breadcrumbs: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Laptops', isActive: true },
        ],
        header: (
            <div className="border-b border-dashed border-gray-300 p-4">
                <h2 className="text-xl font-semibold">Content Header</h2>
            </div>
        ),
        footer: (
            <div className="border-t border-dashed border-gray-300 p-4">
                <p className="text-sm text-gray-500">Content Footer</p>
            </div>
        ),
        fixed: true,
    },
}; 