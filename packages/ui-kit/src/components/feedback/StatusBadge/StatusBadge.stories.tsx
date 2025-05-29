import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
    title: 'Feedback/StatusBadge',
    component: StatusBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info', 'pending', 'neutral'],
        },
        children: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Default',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Success',
    },
};

export const Error: Story = {
    args: {
        variant: 'error',
        children: 'Error',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Warning',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        children: 'Info',
    },
};

export const Pending: Story = {
    args: {
        variant: 'pending',
        children: 'Pending',
    },
};

export const Neutral: Story = {
    args: {
        variant: 'neutral',
        children: 'Neutral',
    },
};

export const LongText: Story = {
    args: {
        variant: 'info',
        children: 'This is a longer text that might wrap',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <StatusBadge variant="success">Success</StatusBadge>
            <StatusBadge variant="error">Error</StatusBadge>
            <StatusBadge variant="warning">Warning</StatusBadge>
            <StatusBadge variant="info">Info</StatusBadge>
            <StatusBadge variant="pending">Pending</StatusBadge>
            <StatusBadge variant="neutral">Neutral</StatusBadge>
        </div>
    ),
};

export const StatusExamples: Story = {
    render: () => (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                <div className="flex gap-2">
                    <StatusBadge variant="success">Delivered</StatusBadge>
                    <StatusBadge variant="info">In Transit</StatusBadge>
                    <StatusBadge variant="pending">Processing</StatusBadge>
                    <StatusBadge variant="error">Cancelled</StatusBadge>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">User Status</h3>
                <div className="flex gap-2">
                    <StatusBadge variant="success">Active</StatusBadge>
                    <StatusBadge variant="warning">Inactive</StatusBadge>
                    <StatusBadge variant="pending">Pending Verification</StatusBadge>
                    <StatusBadge variant="error">Suspended</StatusBadge>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Payment Status</h3>
                <div className="flex gap-2">
                    <StatusBadge variant="success">Paid</StatusBadge>
                    <StatusBadge variant="warning">Partial</StatusBadge>
                    <StatusBadge variant="pending">Pending</StatusBadge>
                    <StatusBadge variant="error">Failed</StatusBadge>
                </div>
            </div>
        </div>
    ),
}; 