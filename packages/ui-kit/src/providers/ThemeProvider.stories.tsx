import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from '../components/primitives/ThemeToggle';
import React from 'react';

const meta: Meta<typeof ThemeProvider> = {
    title: 'Providers/ThemeProvider',
    component: ThemeProvider,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        syncWithSystemOnMount: {
            control: 'boolean',
            description: 'Whether to automatically sync with system preferences on mount',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
    args: {
        children: (
            <div className="flex flex-col p-8 bg-background text-foreground border border-border rounded-lg gap-4">
                <h2 className="text-xl font-semibold">Theme Provider Example</h2>
                <p className="max-w-md">
                    This component is wrapped in a ThemeProvider. The background and text colors will
                    automatically adjust based on the current theme.
                </p>
                <div className="flex items-center gap-2">
                    <span>Toggle theme:</span>
                    <ThemeToggle />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-primary text-primary-foreground rounded">Primary</div>
                    <div className="p-4 bg-secondary text-secondary-foreground rounded">Secondary</div>
                    <div className="p-4 bg-accent text-accent-foreground rounded">Accent</div>
                    <div className="p-4 bg-destructive text-destructive-foreground rounded">Destructive</div>
                </div>
            </div>
        ),
    },
};

export const DisableSystemSync: Story = {
    args: {
        syncWithSystemOnMount: false,
        children: (
            <div className="flex flex-col p-8 bg-background text-foreground border border-border rounded-lg gap-4">
                <h2 className="text-xl font-semibold">Manual Theme Control</h2>
                <p>
                    This provider does not automatically sync with system preferences.
                    It will use the value from localStorage or the default theme.
                </p>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        ),
    },
}; 