import React from 'react';
import { useFormContext, Controller, FieldValues, Path } from 'react-hook-form';
import { FormGroup, FormGroupProps } from './FormGroup';

export type FieldWrapperProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>;
    render: (props: {
        field: {
            onChange: (...event: unknown[]) => void;
            onBlur: () => void;
            value: unknown;
            name: string;
            ref: React.Ref<unknown>;
        };
        fieldState: {
            invalid: boolean;
            isTouched: boolean;
            isDirty: boolean;
            error?: {
                type: string;
                message?: string;
            };
        };
    }) => React.ReactElement;
} & Omit<FormGroupProps, 'children'>;

/**
 * A wrapper component for form fields to be used with React Hook Form
 */
export function FieldWrapper<
    TFieldValues extends FieldValues = FieldValues
>({
    name,
    label,
    htmlFor = name as string,
    render,
    required,
    ...formGroupProps
}: FieldWrapperProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormGroup
                    label={label}
                    htmlFor={htmlFor}
                    error={fieldState.error?.message}
                    required={required}
                    {...formGroupProps}
                >
                    {render({ field, fieldState })}
                </FormGroup>
            )}
        />
    );
} 