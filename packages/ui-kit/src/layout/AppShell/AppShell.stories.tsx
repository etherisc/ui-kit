import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import { Logo } from '../../components/layout/Logo';
import { HeaderActionIcon } from '../../components/layout/HeaderActionIcon';
import { Button } from '../../components/primitives/Button/Button';
import { ThemeToggle } from '../../components/primitives/ThemeToggle/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    HomeIcon,
    UsersIcon,
    FileTextIcon,
    SettingsIcon,
    BellIcon,
    HelpCircleIcon,
    BarChartIcon
} from 'lucide-react';

import type { NavItem } from './SideNav';
import type { BreadcrumbItem } from './Breadcrumbs';

const meta: Meta<typeof AppShell> = {
    title: 'Layout/AppShell/AppShell',
    component: AppShell,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppShell>;

// Example Logo
const LogoExample = () => (
    <Logo
        text="Insurance Platform"
        src="https://placekitten.com/32/32"
        alt="Company Logo"
        onClick={() => console.log('Logo clicked')}
    />
);

// Example Nav Items
const NavItems = () => (
    <div className="flex items-center gap-4">
        <Button intent="ghost">Dashboard</Button>
        <Button intent="ghost">Policies</Button>
        <Button intent="ghost">Claims</Button>
        <Button intent="ghost">Reports</Button>
    </div>
);

// Example User Menu
const UserMenu = () => (
    <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
            <AvatarImage src="https://placekitten.com/100/100" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="hidden md:inline">John Doe</span>
    </div>
);

// Example Action Icons
const ActionIcons = () => (
    <div className="flex items-center gap-2">
        <HeaderActionIcon icon={<HelpCircleIcon />} label="Help" />
        <HeaderActionIcon icon={<BellIcon />} label="Notifications" badgeCount={3} />
        <HeaderActionIcon icon={<SettingsIcon />} label="Settings" />
        <ThemeToggle size="sm" />
    </div>
);

// Example side navigation items
const sideNavItems: NavItem[] = [
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
        ],
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: <BarChartIcon size={20} />,
        href: '/reports',
        isActive: false,
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon size={20} />,
        href: '/settings',
        isActive: false,
    },
];

// Example breadcrumbs
const breadcrumbsItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Customers', href: '/customers' },
    { label: 'John Smith', href: '/customers/123' },
    { label: 'Policy Details', isActive: true }
];

export const Default: Story = {
    args: {
        logo: <LogoExample />,
        navItems: sideNavItems,
        topNavItems: <NavItems />,
        userActions: (
            <>
                <ActionIcons />
                <UserMenu />
            </>
        ),
        breadcrumbs: breadcrumbsItems,
        children: (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
                <p className="mb-4">This is an example of the AppShell component with all features enabled.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-card p-4 rounded-md shadow">
                            <h2 className="font-bold mb-2">Card {i + 1}</h2>
                            <p>This is some sample content for card {i + 1}.</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
};

export const CollapsedSideNav: Story = {
    args: {
        ...Default.args,
        defaultCollapsed: true,
    },
};

export const FixedWidthContent: Story = {
    args: {
        ...Default.args,
        fixedWidth: true,
        children: (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Settings Page</h1>
                <p className="mb-4">This example demonstrates fixed-width content, useful for forms and settings pages.</p>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="font-medium">Username</label>
                        <input className="w-full p-2 border rounded" defaultValue="john.doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Email</label>
                        <input className="w-full p-2 border rounded" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Notification Preferences</label>
                        <select className="w-full p-2 border rounded">
                            <option>All notifications</option>
                            <option>Important only</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div className="pt-4">
                        <Button intent="primary">Save Changes</Button>
                    </div>
                </div>
            </div>
        ),
    },
};

export const Mobile: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const Tablet: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
}; 