import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { useThemeMock } from '../../../hooks/useTheme.mock';

// Simplify the stories by using our mock hook
const meta: Meta<typeof ThemeToggle> = {
    title: 'Components/Primitives/ThemeToggle',
    component: ThemeToggle,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },
            description: 'Size of the toggle button',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        onToggle: {
            action: 'toggled',
            description: 'Callback when theme is toggled',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
        // Hide the internal prop from the docs
        useThemeHook: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// Define common props to avoid repetition
const commonProps = {
    useThemeHook: useThemeMock
};

export const Default: Story = {
    args: {
        ...commonProps
    }
};

export const Small: Story = {
    args: {
        ...commonProps,
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        ...commonProps,
        size: 'lg'
    }
};

export const CustomStyle: Story = {
    args: {
        ...commonProps,
        className: 'bg-secondary text-secondary-content'
    }
};

export const WithCallback: Story = {
    args: {
        ...commonProps
    },
    render: (args) => (
        <ThemeToggle
            {...args}
            onToggle={(isDark) => {
                console.log(`Theme toggled to ${isDark ? 'dark' : 'light'} mode`);
                args.onToggle?.(isDark);
            }}
        />
    ),
}; 