import type { Meta, StoryObj } from '@storybook/react';
import { ContentWrapper } from './ContentWrapper';
import type { BreadcrumbItem } from './Breadcrumbs';

const meta: Meta<typeof ContentWrapper> = {
    title: 'Layout/AppShell/ContentWrapper',
    component: ContentWrapper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ height: '600px', border: '1px solid #e2e8f0' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ContentWrapper>;

// Example breadcrumbs
const breadcrumbsItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Customers', href: '/customers' },
    { label: 'John Smith', href: '/customers/123' },
    { label: 'Policy Details', isActive: true }
];

export const Default: Story = {
    args: {
        children: (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Content Title</h1>
                <p className="mb-4">This is the main content area of the ContentWrapper component.</p>
                <div className="border border-border p-4 rounded">
                    <p>Content goes here...</p>
                </div>
            </div>
        ),
    },
};

export const WithBreadcrumbs: Story = {
    args: {
        breadcrumbs: breadcrumbsItems,
        children: (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Content with Breadcrumbs</h1>
                <p className="mb-4">This example shows the ContentWrapper with breadcrumbs navigation.</p>
                <div className="border border-border p-4 rounded">
                    <p>Content goes here...</p>
                </div>
            </div>
        ),
    },
};

export const FixedWidth: Story = {
    args: {
        fixed: true,
        children: (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Fixed Width Content</h1>
                <p className="mb-4">This example demonstrates fixed-width content (max-width: 960px).</p>
                <div className="border border-border p-4 rounded">
                    <p>Content goes here...</p>
                </div>
            </div>
        ),
    },
};

export const WithHeaderAndFooter: Story = {
    args: {
        breadcrumbs: breadcrumbsItems,
        header: (
            <div className="bg-muted p-4">
                <h2 className="text-xl font-bold">Custom Header</h2>
            </div>
        ),
        footer: (
            <div className="bg-muted p-4 flex justify-between">
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Cancel</button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Save</button>
            </div>
        ),
        children: (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Content with Header & Footer</h1>
                <p className="mb-4">This example shows the ContentWrapper with custom header and footer content.</p>
                <div className="border border-border p-4 rounded">
                    <p>Content goes here...</p>
                </div>
            </div>
        ),
    },
}; 