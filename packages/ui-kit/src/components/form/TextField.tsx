import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { TextInput, TextInputProps } from '../primitives/TextInput/TextInput';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

export type TextFieldProps<TFieldValues extends FieldValues> =
    Omit<TextInputProps, 'name'> &
    Omit<FieldWrapperProps<TFieldValues>, 'render'> & {
        name: Path<TFieldValues>;
    };

/**
 * TextField component that integrates TextInput with React Hook Form
 */
export function TextField<TFieldValues extends FieldValues>({
    name,
    label,
    required,
    ...props
}: TextFieldProps<TFieldValues>) {
    return (
        <FieldWrapper
            name={name}
            label={label}
            required={required}
            render={({ field, fieldState }) => (
                <TextInput
                    {...props}
                    id={name.toString()}
                    aria-invalid={fieldState.invalid}
                    error={fieldState.error?.message || ''}
                    value={field.value as string}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref as React.Ref<HTMLInputElement>}
                />
            )}
        />
    );
} 