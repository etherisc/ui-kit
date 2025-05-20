import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { NumberInputProps } from './types';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        { label, description, error, className, min, max, step = 1, ...props },
        ref
    ) => {
        return (
            <div className={className}>
                {label && (
                    <label className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                    {...props}
                    className={cn(
                        error ? 'border-destructive text-destructive-foreground' : '',
                        props.className
                    )}
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