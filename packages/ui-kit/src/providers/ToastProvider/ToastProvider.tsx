import * as React from 'react';
import { useCallback, useContext, useReducer, type ReactNode } from 'react';
import { nanoid } from 'nanoid';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    duration?: number;
    onClose?: () => void;
}

export interface ToastOptions {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
    onClose?: () => void;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (options: ToastOptions) => string;
    removeToast: (id: string) => void;
    updateToast: (id: string, options: Partial<ToastOptions>) => void;
}

type ToastAction =
    | { type: 'ADD_TOAST'; toast: Toast }
    | { type: 'REMOVE_TOAST'; id: string }
    | { type: 'UPDATE_TOAST'; id: string; options: Partial<ToastOptions> };

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
    switch (action.type) {
        case 'ADD_TOAST':
            return [...state, action.toast];
        case 'REMOVE_TOAST':
            return state.filter((toast) => toast.id !== action.id);
        case 'UPDATE_TOAST':
            return state.map((toast) =>
                toast.id === action.id
                    ? { ...toast, ...action.options }
                    : toast
            );
        default:
            return state;
    }
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({
    children,
    defaultDuration = 5000,
}: {
    children: ReactNode;
    defaultDuration?: number;
}) {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const removeToast = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_TOAST', id });
    }, []);

    const addToast = useCallback(
        (options: ToastOptions) => {
            const id = nanoid();
            const toast: Toast = {
                id,
                title: options.title,
                description: options.description,
                variant: options.variant || 'info',
                duration: options.duration || defaultDuration,
                onClose: options.onClose,
            };

            dispatch({ type: 'ADD_TOAST', toast });

            if (toast.duration !== Infinity) {
                setTimeout(() => {
                    removeToast(id);
                }, toast.duration);
            }

            return id;
        },
        [defaultDuration, removeToast]
    );

    const updateToast = useCallback((id: string, options: Partial<ToastOptions>) => {
        dispatch({ type: 'UPDATE_TOAST', id, options });
    }, []);

    const value = {
        toasts,
        addToast,
        removeToast,
        updateToast,
    };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
}

export function useToastContext(): ToastContextValue {
    const context = useContext(ToastContext);

    if (context === undefined) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }

    return context;
}

export default ToastProvider; 