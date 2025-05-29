import * as React from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup>, 'children'> {
    /** Label text displayed above the radio group */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
    /** Options for the radio group */
    options: RadioOption[];
    /** CSS class name */
    className?: string;
    /** Unique ID for the radio group */
    id?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        { label, description, error, className, options, disabled, id, ...props },
        ref
    ) => {
        // Generate a unique ID if none is provided
        const generatedId = React.useId();
        // Use provided id or fall back to generated one
        const groupId = id || generatedId;

        // Create IDs for associated elements
        const descriptionId = description ? `${groupId}-description` : undefined;
        const errorId = error ? `${groupId}-error` : undefined;

        // Combine aria-describedby values
        const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

        return (
            <div className={className} ref={ref}>
                {label && (
                    <label
                        id={`${groupId}-label`}
                        className="mb-2 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <ShadcnRadioGroup
                    className={cn('flex flex-col space-y-2', error ? 'text-destructive-foreground' : '')}
                    disabled={disabled}
                    id={groupId}
                    aria-labelledby={label ? `${groupId}-label` : undefined}
                    aria-describedby={ariaDescribedBy}
                    {...props}
                >
                    {options.map((option) => {
                        const optionId = `${groupId}-${option.value}`;
                        return (
                            <div className="flex items-center space-x-2" key={option.value}>
                                <RadioGroupItem
                                    id={optionId}
                                    value={option.value}
                                    disabled={option.disabled || disabled}
                                    className={error ? 'border-destructive' : ''}
                                    aria-label={option.label}
                                />
                                <label
                                    htmlFor={optionId}
                                    className={cn(
                                        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                                        (option.disabled || disabled) && 'opacity-70 cursor-not-allowed'
                                    )}
                                >
                                    {option.label}
                                </label>
                            </div>
                        );
                    })}
                </ShadcnRadioGroup>
                {description && !error && (
                    <p
                        id={descriptionId}
                        className="mt-1 text-xs text-muted-foreground"
                    >
                        {description}
                    </p>
                )}
                {error && (
                    <p
                        id={errorId}
                        className="mt-1 text-xs text-destructive-foreground"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

RadioGroup.displayName = 'RadioGroup'; 