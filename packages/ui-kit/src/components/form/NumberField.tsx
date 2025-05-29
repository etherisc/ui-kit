import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { NumberInput, NumberInputProps } from '../primitives/NumberInput/NumberInput';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

export type NumberFieldProps<TFieldValues extends FieldValues> =
    Omit<NumberInputProps, 'name'> &
    Omit<FieldWrapperProps<TFieldValues>, 'render'> & {
        name: Path<TFieldValues>;
    };

/**
 * NumberField component that integrates NumberInput with React Hook Form
 */
export function NumberField<TFieldValues extends FieldValues>({
    name,
    label,
    required,
    ...props
}: NumberFieldProps<TFieldValues>) {
    return (
        <FieldWrapper
            name={name}
            label={label}
            required={required}
            render={({ field, fieldState }) => (
                <NumberInput
                    {...props}
                    id={name.toString()}
                    aria-invalid={fieldState.invalid}
                    error={fieldState.error?.message || ''}
                    value={field.value as number | undefined}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref as React.Ref<HTMLInputElement>}
                />
            )}
        />
    );
} 