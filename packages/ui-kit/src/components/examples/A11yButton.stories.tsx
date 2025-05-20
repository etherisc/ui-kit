import type { Meta, StoryObj } from '@storybook/react';
import { A11yButton } from './A11yButton';

const meta = {
    title: 'Examples/A11yButton',
    component: A11yButton,
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'button-name', enabled: true },
                    { id: 'aria-valid-attr-value', enabled: true },
                ],
            },
        },
    },
    argTypes: {
        startIcon: { control: false },
        endIcon: { control: false },
    },
} satisfies Meta<typeof A11yButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with text
 */
export const Default: Story = {
    args: {
        children: 'Click Me',
        variant: 'default',
    },
};

/**
 * Icon-only button with aria-label
 */
export const IconOnly: Story = {
    args: {
        ariaLabel: 'Close dialog',
        children: '×',
        variant: 'outline',
    },
};

/**
 * Button with start icon and accessible name
 */
export const WithStartIcon: Story = {
    args: {
        children: 'Download',
        startIcon: (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 1C7.77614 1 8 1.22386 8 1.5V10.2929L11.1464 7.14645C11.3417 6.95118 11.6583 6.95118 11.8536 7.14645C12.0488 7.34171 12.0488 7.65829 11.8536 7.85355L7.85355 11.8536C7.75979 11.9473 7.63261 12 7.5 12C7.36739 12 7.24021 11.9473 7.14645 11.8536L3.14645 7.85355C2.95118 7.65829 2.95118 7.34171 3.14645 7.14645C3.34171 6.95118 3.65829 6.95118 3.85355 7.14645L7 10.2929V1.5C7 1.22386 7.22386 1 7.5 1Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
        ),
        variant: 'default',
    },
};

/**
 * Toggle button with aria-pressed state
 */
export const ToggleButton: Story = {
    args: {
        children: 'Mute Audio',
        isToggle: true,
        isPressed: true,
        ariaLabel: 'Mute audio',
    },
};

/**
 * Dropdown button with aria-expanded
 */
export const DropdownButton: Story = {
    args: {
        children: 'Menu',
        ariaExpanded: false,
        ariaControls: 'dropdown-menu',
        endIcon: (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
        ),
    },
};

/**
 * Button with description
 */
export const WithDescription: Story = {
    render: () => (
        <div>
            <p id="desc-delete" className="text-sm mb-2">
                This action permanently removes the item and cannot be undone.
            </p>
            <A11yButton
                variant="destructive"
                ariaDescribedBy="desc-delete"
            >
                Delete Item
            </A11yButton>
        </div>
    ),
}; 