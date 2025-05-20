import type { Meta, StoryObj } from '@storybook/react';
import { A11yViolatingForm } from './A11yViolatingForm';

const meta: Meta<typeof A11yViolatingForm> = {
    title: 'Test/A11yViolatingForm',
    component: A11yViolatingForm,
    parameters: {
        // No a11y parameters - should trigger violations in CI
    }
};

export default meta;
type Story = StoryObj<typeof A11yViolatingForm>;

export const Default: Story = {
    args: {}
}; 