import * as React from 'react';
import { Input } from '@/components/ui/input';

export interface NumberInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
    /** Label text displayed above the input */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
    /** Minimum value allowed */
    min?: number;
    /** Maximum value allowed */
    max?: number;
    /** Step value for incrementing/decrementing */
    step?: number;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        { label, description, error, className, min, max, step = 1, ...props },
        ref
    ) => {
        return (
            <div className={className}>
                {label && (
                    <label
                        htmlFor={props.id}
                        className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <Input
                    ref={ref}
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    aria-invalid={!!error}
                    className={error ? 'border-destructive text-destructive-foreground' : ''}
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

NumberInput.displayName = 'NumberInput'; 