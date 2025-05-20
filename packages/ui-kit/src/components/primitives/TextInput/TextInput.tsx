import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface TextInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
    /** Label text displayed above the input */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
    /** Visual size of the input */
    size?: 'default' | 'sm' | 'lg';
    /** Optional CSS class name for the wrapper div */
    className?: string;
    /** Optional CSS class name for the input element */
    inputClassName?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            label,
            description,
            error,
            size = 'default',
            className,
            inputClassName,
            ...props
        },
        ref
    ) => {
        // Size classes for the input element
        let sizeClass = '';
        if (size === 'sm') {
            sizeClass = 'h-8 text-xs';
        } else if (size === 'lg') {
            sizeClass = 'h-10 text-base';
        }

        return (
            <div className={className}>
                {label && (
                    <label className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
                <Input
                    ref={ref}
                    aria-invalid={!!error}
                    className={cn(
                        sizeClass,
                        error ? 'border-destructive text-destructive-foreground' : '',
                        inputClassName
                    )}
                    {...props}
                />
                {description && !error && (
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                )}
                {error && (
                    <p className="mt-1 text-xs text-destructive-foreground">{error}</p>
                )}
            </div>
        );
    }
);
TextInput.displayName = 'TextInput'; 