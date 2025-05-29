import type { Meta, StoryObj } from '@storybook/react';
import { HeaderActionIcon } from './HeaderActionIcon';

const meta = {
    title: 'Layout/Navigation/HeaderActionIcon',
    component: HeaderActionIcon,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
    },
    args: {
        label: 'Notifications',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
        ),
    },
} satisfies Meta<typeof HeaderActionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBadge: Story = {
    args: {
        badgeCount: 5,
    },
};

export const WithHighBadgeCount: Story = {
    args: {
        badgeCount: 123,
    },
};

export const PrimaryVariant: Story = {
    args: {
        variant: 'default',
    },
};

export const DestructiveVariant: Story = {
    args: {
        variant: 'destructive',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
        ),
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}; 