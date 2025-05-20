import * as React from 'react';
import { cn } from '@/lib/utils';
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SelectProps } from './types';

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
            ...props
        },
        ref
    ) => {
        return (
            <div className={className} ref={ref}>
                {label && (
                    <label className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                        className={cn(
                            error ? 'border-destructive text-destructive-foreground' : '',
                            'w-full'
                        )}
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
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                )}
                {error && (
                    <p className="mt-1 text-xs text-destructive-foreground">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select'; 