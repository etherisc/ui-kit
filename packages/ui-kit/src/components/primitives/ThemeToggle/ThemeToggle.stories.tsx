import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

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
    },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
    args: {},
};

export const Small: Story = {
    args: {
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
    },
};

export const CustomStyle: Story = {
    args: {
        className: 'bg-secondary text-secondary-content',
    },
};

export const WithCallback: Story = {
    args: {},
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