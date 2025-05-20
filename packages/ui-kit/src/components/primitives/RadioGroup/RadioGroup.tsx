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
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        { label, description, error, className, options, disabled, ...props },
        ref
    ) => {
        return (
            <div className={className} ref={ref}>
                {label && (
                    <label className="mb-2 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
                <ShadcnRadioGroup
                    className={cn('flex flex-col space-y-2', error ? 'text-destructive-foreground' : '')}
                    disabled={disabled}
                    {...props}
                >
                    {options.map((option) => (
                        <div className="flex items-center space-x-2" key={option.value}>
                            <RadioGroupItem
                                value={option.value}
                                disabled={option.disabled || disabled}
                                className={error ? 'border-destructive' : ''}
                            />
                            <label
                                className={cn(
                                    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                                    (option.disabled || disabled) && 'opacity-70 cursor-not-allowed'
                                )}
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </ShadcnRadioGroup>
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

RadioGroup.displayName = 'RadioGroup'; 