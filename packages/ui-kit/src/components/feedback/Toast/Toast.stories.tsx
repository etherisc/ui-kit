import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Toast } from './Toast';
import { ToastProvider } from '../../../providers/ToastProvider';
import { type Toast as ToastType } from '../../../providers/ToastProvider/ToastProvider';

const meta: Meta<typeof Toast> = {
    title: 'Components/Feedback/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        toast: {
            control: 'object',
        },
        onClose: {
            action: 'onClose',
        },
    },
    decorators: [
        (Story) => (
            <ToastProvider>
                <div className="w-96">
                    <Story />
                </div>
            </ToastProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseToast: ToastType = {
    id: 'story-toast',
    title: 'Toast Title',
    description: 'This is a toast description that provides additional context.',
    variant: 'info',
    duration: 5000,
};

export const Default: Story = {
    args: {
        toast: baseToast,
    },
};

export const Success: Story = {
    args: {
        toast: {
            ...baseToast,
            variant: 'success',
            title: 'Success!',
            description: 'Your action was completed successfully.',
        },
    },
};

export const Error: Story = {
    args: {
        toast: {
            ...baseToast,
            variant: 'error',
            title: 'Error',
            description: 'Something went wrong. Please try again.',
        },
    },
};

export const Warning: Story = {
    args: {
        toast: {
            ...baseToast,
            variant: 'warning',
            title: 'Warning',
            description: 'Please review your input before proceeding.',
        },
    },
};

export const Info: Story = {
    args: {
        toast: {
            ...baseToast,
            variant: 'info',
            title: 'Information',
            description: 'Here is some useful information for you.',
        },
    },
};

export const WithoutDescription: Story = {
    args: {
        toast: {
            ...baseToast,
            title: 'Simple Toast',
            description: undefined,
        },
    },
};

export const LongContent: Story = {
    args: {
        toast: {
            ...baseToast,
            title: 'This is a very long toast title that might wrap to multiple lines',
            description: 'This is a very long description that demonstrates how the toast component handles longer content and whether it wraps properly within the container boundaries.',
        },
    },
};

function InteractiveToastDemo() {
    const [toasts, setToasts] = React.useState<ToastType[]>([]);

    const addToast = (variant: ToastType['variant'], title: string, description?: string) => {
        const newToast: ToastType = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            variant,
            duration: 5000,
        };
        setToasts(prev => [...prev, newToast]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => addToast('success', 'Success!', 'Operation completed successfully')}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Add Success Toast
                </button>
                <button
                    onClick={() => addToast('error', 'Error!', 'Something went wrong')}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Add Error Toast
                </button>
                <button
                    onClick={() => addToast('warning', 'Warning!', 'Please be careful')}
                    className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    Add Warning Toast
                </button>
                <button
                    onClick={() => addToast('info', 'Info', 'Here is some information')}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Info Toast
                </button>
            </div>
            <div className="space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export const Interactive: Story = {
    render: () => <InteractiveToastDemo />,
}; 