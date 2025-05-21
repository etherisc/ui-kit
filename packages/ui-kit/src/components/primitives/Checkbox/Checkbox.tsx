import * as React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof ShadcnCheckbox> {
    /** Label text displayed next to the checkbox */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
    /** CSS class name */
    className?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    (
        { label, description, error, className, disabled, id, ...props },
        ref
    ) => {
        // Always call React.useId unconditionally
        const generatedId = React.useId();
        // Use provided id or fall back to generated one
        const checkboxId = id || generatedId;

        // Ensure the checkbox has an accessible name
        const accessibilityProps = label
            ? {} // Label will provide the accessible name via htmlFor
            : { 'aria-label': props['aria-label'] || 'Checkbox' }; // Fallback accessible name

        return (
            <div className={cn('flex flex-col space-y-1', className)}>
                <div className="flex items-center space-x-2">
                    <ShadcnCheckbox
                        ref={ref}
                        id={checkboxId}
                        disabled={disabled}
                        {...accessibilityProps}
                        {...props}
                        className={cn(
                            error ? 'border-destructive text-destructive-foreground' : ''
                        )}
                    />
                    {label && (
                        <label
                            htmlFor={checkboxId}
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
                    <p
                        id={`${checkboxId}-description`}
                        className="text-xs text-muted-foreground"
                    >
                        {description}
                    </p>
                )}
                {error && (
                    <p
                        id={`${checkboxId}-error`}
                        className="text-xs text-destructive-foreground"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox'; 