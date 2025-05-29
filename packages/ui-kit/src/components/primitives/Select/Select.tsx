import * as React from 'react';
import { cn } from '@/lib/utils';
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnSelect>, 'children'> {
    /** Label text displayed above the select */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks select as invalid */
    error?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Options to display in the dropdown */
    options: SelectOption[];
    /** CSS class name */
    className?: string;
    /** Unique ID for the select element */
    id?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            label,
            description,
            error,
            className,
            placeholder,
            options,
            value,
            onValueChange,
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        // Generate a unique ID if none is provided
        const generatedId = React.useId();
        // Use provided id or fall back to generated one
        const selectId = id || generatedId;

        // Create IDs for associated elements
        const descriptionId = description ? `${selectId}-description` : undefined;
        const errorId = error ? `${selectId}-error` : undefined;

        // Combine aria-describedby values
        const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

        return (
            <div className={className} ref={ref}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <ShadcnSelect
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    {...props}
                >
                    <SelectTrigger
                        id={selectId}
                        className={cn(
                            error ? 'border-destructive text-destructive-foreground' : '',
                            'w-full'
                        )}
                        aria-describedby={ariaDescribedBy}
                        aria-label={!label ? `Select ${placeholder || ''}` : undefined}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
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

Select.displayName = 'Select'; 