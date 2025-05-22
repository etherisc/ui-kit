import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideNav, NavItem } from './SideNav';
import { HomeIcon, LayersIcon, SettingsIcon, UsersIcon, BarChartIcon, FileTextIcon } from 'lucide-react';

const meta: Meta<typeof SideNav> = {
    title: 'Layout/AppShell/SideNav',
    component: SideNav,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'light',
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ height: '600px', width: '300px', border: '1px solid #e2e8f0' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof SideNav>;

// Example items with nested navigation
const navItems: NavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <HomeIcon size={20} />,
        href: '/dashboard',
        isActive: true,
    },
    {
        id: 'customers',
        label: 'Customers',
        icon: <UsersIcon size={20} />,
        href: '/customers',
        isActive: false,
    },
    {
        id: 'policies',
        label: 'Policies',
        icon: <FileTextIcon size={20} />,
        isExpanded: true,
        children: [
            {
                id: 'active-policies',
                label: 'Active Policies',
                href: '/policies/active',
                isActive: false,
            },
            {
                id: 'pending-policies',
                label: 'Pending Approval',
                href: '/policies/pending',
                isActive: false,
            },
            {
                id: 'expired-policies',
                label: 'Expired',
                href: '/policies/expired',
                isActive: false,
            },
        ],
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: <BarChartIcon size={20} />,
        isExpanded: false,
        children: [
            {
                id: 'sales-reports',
                label: 'Sales Reports',
                href: '/reports/sales',
                isActive: false,
            },
            {
                id: 'claims-reports',
                label: 'Claims Reports',
                href: '/reports/claims',
                isActive: false,
            },
        ],
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon size={20} />,
        href: '/settings',
        isActive: false,
    },
    {
        id: 'system',
        label: 'System',
        icon: <LayersIcon size={20} />,
        isGroup: true,
        children: [
            {
                id: 'users',
                label: 'Users & Permissions',
                href: '/system/users',
                isActive: false,
            },
            {
                id: 'audit',
                label: 'Audit Logs',
                href: '/system/audit',
                isActive: false,
            },
        ],
    },
];

export const Default: Story = {
    args: {
        items: navItems,
        collapsed: false,
    },
};

export const Collapsed: Story = {
    args: {
        items: navItems,
        collapsed: true,
    },
};

export const WithPersistence: Story = {
    args: {
        items: navItems,
        persistCollapsed: true,
    },
};

export const FewItems: Story = {
    args: {
        items: navItems.slice(0, 3),
    },
};

export const NoItems: Story = {
    args: {
        items: [],
    },
}; 