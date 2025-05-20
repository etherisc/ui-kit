import type { Meta, StoryObj } from '@storybook/react';
import { A11yFormExamples } from './A11yFormExamples';

const meta = {
    title: 'Form/AccessibleExamples',
    component: A11yFormExamples,
    parameters: {
        layout: 'centered',
        // Run thorough accessibility tests on this component
        a11y: {
            config: {
                rules: [
                    // Ensure these critical rules are enabled
                    { id: 'button-name', enabled: true },
                    { id: 'label', enabled: true },
                    { id: 'aria-valid-attr-value', enabled: true },
                    { id: 'color-contrast', enabled: true },
                ],
            },
        },
    },
} satisfies Meta<typeof A11yFormExamples>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * This story demonstrates a form built with shadcn components 
 * and proper accessibility practices.
 * 
 * Key a11y features:
 * - All form controls have associated labels
 * - Descriptions use aria-describedby
 * - Proper semantic structure with fieldset/legend
 * - Explicit IDs for all interactive elements
 */
export const Default: Story = {}; 