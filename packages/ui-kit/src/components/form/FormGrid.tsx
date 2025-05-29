import React from 'react';
import { cn } from '../../lib/utils';

export interface FormGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

/**
 * FormGrid component for layout of form elements in a grid
 */
export function FormGrid({
    columns = 1,
    gap = 'md',
    className,
    children,
    ...props
}: FormGridProps) {
    const gapClass = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
    }[gap];

    const columnsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns];

    return (
        <div
            className={cn('grid', columnsClass, gapClass, className)}
            {...props}
        >
            {children}
        </div>
    );
} 