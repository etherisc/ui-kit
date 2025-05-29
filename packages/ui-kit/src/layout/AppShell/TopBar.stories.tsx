import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { Logo } from '../../components/layout/Logo';
import { HeaderActionIcon } from '../../components/layout/HeaderActionIcon';
import { Button } from '../../components/primitives/Button/Button';
import { ThemeToggle } from '../../components/primitives/ThemeToggle/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

// Icons
import { BellIcon, HelpCircleIcon, Settings } from 'lucide-react';

const meta: Meta<typeof TopBar> = {
    title: 'Layout/Navigation/TopBar',
    component: TopBar,
    parameters: {
        layout: 'fullscreen',
        // Disable interactions to prevent infinite loops
        chromatic: { disableSnapshot: false },
        a11y: { disable: false },
        actions: { disable: false },
        controls: { disable: false },
        interactions: { disable: true }
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopBar>;

// Example Logo
const LogoExample = () => (
    <Logo
        text="Insurance Platform"
        src="https://placekitten.com/32/32"
        alt="Company Logo"
        onClick={() => {/* no-op to prevent test recursion */ }}
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

// Example Action Icons - memoized to prevent recursion
const ActionIcons = () => (
    <div className="flex items-center gap-2">
        <HeaderActionIcon icon={<HelpCircleIcon />} label="Help" />
        <HeaderActionIcon icon={<BellIcon />} label="Notifications" badgeCount={3} />
        <HeaderActionIcon icon={<Settings />} label="Settings" />
        <ThemeToggle size="sm" />
    </div>
);

// Stories
export const Default: Story = {
    args: {
        logo: <LogoExample />,
        navigationItems: <NavItems />,
        userActions: (
            <>
                <ActionIcons />
                <UserMenu />
            </>
        ),
    },
    // Disable any play/interaction functions that might be causing recursion
    play: undefined,
    parameters: {
        interactions: { disable: true }
    }
};

export const LogoOnly: Story = {
    args: {
        logo: <LogoExample />,
    },
};

export const WithoutNavigation: Story = {
    args: {
        logo: <LogoExample />,
        userActions: (
            <>
                <ActionIcons />
                <UserMenu />
            </>
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
        interactions: { disable: true }
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
        interactions: { disable: true }
    },
};

export const NotFixed: Story = {
    args: {
        ...Default.args,
        fixed: false,
    },
    parameters: {
        interactions: { disable: true }
    }
}; 