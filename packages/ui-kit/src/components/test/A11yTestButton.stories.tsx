import type { Meta, StoryObj } from '@storybook/react';
import { A11yTestButton } from './A11yTestButton';

const meta: Meta<typeof A11yTestButton> = {
    title: 'Test/A11yTestButton',
    component: A11yTestButton,
    parameters: {
        // No a11y parameters to ensure it's tested
    }
};

export default meta;
type Story = StoryObj<typeof A11yTestButton>;

export const Default: Story = {
    args: {}
}; 