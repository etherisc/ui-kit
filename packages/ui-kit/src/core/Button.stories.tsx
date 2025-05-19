import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
    title: 'Core/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Button',
    },
} 