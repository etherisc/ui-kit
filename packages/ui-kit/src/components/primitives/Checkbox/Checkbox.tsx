import * as React from 'react';
import { cn } from '@/utils/cn';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';
import { CheckboxProps } from './types';

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    (
        { label, description, error, className, disabled, ...props },
        ref
    ) => {
        return (
            <div className={cn('flex flex-col space-y-1', className)}>
                <div className="flex items-center space-x-2">
                    <ShadcnCheckbox
                        ref={ref}
                        disabled={disabled}
                        {...props}
                        className={cn(
                            error ? 'border-destructive text-destructive-foreground' : ''
                        )}
                    />
                    {label && (
                        <label
                            className={cn(
                                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                                disabled && 'opacity-70 cursor-not-allowed'
                            )}
                        >
                            {label}
                        </label>
                    )}
                </div>
                {description && !error && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
                {error && (
                    <p className="text-xs text-destructive-foreground">{error}</p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox'; 