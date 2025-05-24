import * as React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { type Toast as ToastType } from '../../../providers/ToastProvider/ToastProvider';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    toast: ToastType;
    onClose?: () => void;
}

export function Toast({ toast, onClose, className, ...props }: ToastProps) {
    const { title, description, variant = 'info' } = toast;

    const handleClose = React.useCallback(() => {
        onClose?.();
        toast.onClose?.();
    }, [onClose, toast]);

    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className={cn(
                'relative flex w-full max-w-sm flex-col gap-1 rounded-lg border p-4 shadow-lg',
                'animate-in slide-in-from-top-2',
                variant === 'success' && 'bg-[hsl(var(--success))] text-[hsl(var(--success-content))] border-[hsl(var(--success))]',
                variant === 'error' && 'bg-[hsl(var(--error))] text-[hsl(var(--error-content))] border-[hsl(var(--error))]',
                variant === 'warning' && 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-content))] border-[hsl(var(--warning))]',
                variant === 'info' && 'bg-[hsl(var(--info))] text-[hsl(var(--info-content))] border-[hsl(var(--info))]',
                className
            )}
            {...props}
        >
            <div className="flex items-start justify-between gap-2">
                <div>
                    {title && <div className="font-semibold">{title}</div>}
                    {description && <div className="mt-1 text-sm">{description}</div>}
                </div>
                <button
                    type="button"
                    onClick={handleClose}
                    className={cn(
                        'absolute right-2 top-2 rounded-md p-1',
                        'hover:bg-[hsl(var(--black)/0.1)] focus:outline-none focus:ring-2 focus:ring-offset-2',
                        'focus:ring-[hsl(var(--primary))] transition-colors'
                    )}
                    aria-label="Close toast"
                >
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

Toast.displayName = 'Toast';

export default Toast; 