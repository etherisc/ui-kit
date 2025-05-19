import * as React from 'react';
import { Input as ShadcnInput, type InputProps as ShadcnInputProps } from '@/components/ui/input';

export interface TextInputProps extends ShadcnInputProps {
    /** Label text displayed above the input */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (
        { label, description, error, className, ...props },
        ref
    ) => {
        return (
            <div className={className}>
                {label && (
                    <label className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
                <ShadcnInput
                    ref={ref}
                    aria-invalid={!!error}
                    {...props}
                    className={error ? 'border-destructive text-destructive-foreground' : ''}
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