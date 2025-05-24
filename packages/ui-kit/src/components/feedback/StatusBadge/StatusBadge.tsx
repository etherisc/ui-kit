import * as React from 'react';
import { cn } from '../../../lib/utils';

export type StatusBadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'pending' | 'neutral';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: StatusBadgeVariant;
    children: React.ReactNode;
}

export function StatusBadge({ variant = 'neutral', children, className, ...props }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                variant === 'success' && 'bg-[hsl(var(--success))] text-[hsl(var(--success-content))]',
                variant === 'error' && 'bg-[hsl(var(--error))] text-[hsl(var(--error-content))]',
                variant === 'warning' && 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-content))]',
                variant === 'info' && 'bg-[hsl(var(--info))] text-[hsl(var(--info-content))]',
                variant === 'pending' && 'bg-[hsl(var(--base-300))] text-[hsl(var(--base-content))]',
                variant === 'neutral' && 'bg-[hsl(var(--neutral))] text-[hsl(var(--neutral-content))]',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge; 