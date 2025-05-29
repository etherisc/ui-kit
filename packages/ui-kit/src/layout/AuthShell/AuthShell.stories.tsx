import type { Meta, StoryObj } from '@storybook/react';
import { AuthShell } from './AuthShell';
import { Button } from '@/components/primitives/Button';

const meta: Meta<typeof AuthShell> = {
    title: 'Layout/Shells/AuthShell',
    component: AuthShell,
    parameters: {
        layout: 'fullscreen',
        a11y: {
            disable: false,
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthShell>;

// Sample logo component for the stories
const Logo = () => (
    <div className="text-3xl font-bold text-primary">
        <span className="tracking-tighter">Brand</span>
        <span className="text-accent">Logo</span>
    </div>
);

// Basic login form for the stories
const LoginForm = () => (
    <div className="space-y-4">
        <div className="text-xl font-semibold text-center mb-6">Sign in to your account</div>
        <div className="space-y-2">
            <label className="block text-sm font-medium">Email address</label>
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
        </div>
        <div className="pt-2">
            <Button className="w-full">Sign In</Button>
        </div>
    </div>
);

/**
 * Default AuthShell with logo and login form
 */
export const Default: Story = {
    args: {
        logo: <Logo />,
        children: <LoginForm />,
        width: 'md',
    },
};

/**
 * AuthShell with logo, login form, and footer text
 */
export const WithFooter: Story = {
    args: {
        logo: <Logo />,
        children: <LoginForm />,
        footer: (
            <div>
                <p>Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a></p>
                <p className="mt-2">© 2023 BrandName. All rights reserved.</p>
            </div>
        ),
        width: 'md',
    },
};

/**
 * Small variant of the AuthShell
 */
export const Small: Story = {
    args: {
        logo: <Logo />,
        children: <LoginForm />,
        width: 'sm',
    },
};

/**
 * Large variant of the AuthShell
 */
export const Large: Story = {
    args: {
        logo: <Logo />,
        children: <LoginForm />,
        width: 'lg',
    },
}; 