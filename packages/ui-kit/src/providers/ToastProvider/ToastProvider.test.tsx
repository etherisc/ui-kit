import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToastContext } from './ToastProvider';

// Test component to access the toast context
function TestComponent() {
    const { toasts, addToast, removeToast } = useToastContext();

    return (
        <div>
            <div data-testid="toast-count">{toasts.length}</div>
            <button
                onClick={() => addToast({ title: 'Test Toast', variant: 'success' })}
                data-testid="add-toast"
            >
                Add Toast
            </button>
            <button
                onClick={() => addToast({ title: 'Test Toast', variant: 'success', duration: 100 })}
                data-testid="add-short-toast"
            >
                Add Short Toast
            </button>
            {toasts.map((toast) => (
                <div key={toast.id} data-testid={`toast-${toast.id}`}>
                    <span>{toast.title}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        data-testid={`remove-${toast.id}`}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}

describe('ToastProvider', () => {
    it('should provide toast context to children', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    });

    it('should add a toast when addToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        act(() => {
            screen.getByTestId('add-toast').click();
        });

        expect(screen.getByTestId('toast-count')).toHaveTextContent('1');
        expect(screen.getByText('Test Toast')).toBeInTheDocument();
    });

    it('should remove a toast when removeToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        // Add a toast first
        act(() => {
            screen.getByTestId('add-toast').click();
        });

        expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

        // Find the toast and remove it
        const toastElement = screen.getByText('Test Toast').closest('[data-testid^="toast-"]');
        const toastId = toastElement?.getAttribute('data-testid')?.replace('toast-', '');

        if (toastId) {
            act(() => {
                screen.getByTestId(`remove-${toastId}`).click();
            });
        }

        expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    });

    it('should auto-remove toast after duration', async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        act(() => {
            screen.getByTestId('add-short-toast').click();
        });

        expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

        // Wait for the toast to be removed automatically
        await new Promise(resolve => setTimeout(resolve, 150));

        expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    });

    it('should throw error when useToastContext is used outside provider', () => {
        // Suppress console.error for this test
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useToastContext must be used within a ToastProvider');

        consoleSpy.mockRestore();
    });
}); 