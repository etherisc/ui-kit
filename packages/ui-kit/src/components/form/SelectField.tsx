import { FieldValues, Path } from 'react-hook-form';
import { Select, SelectProps } from '../primitives/Select/Select';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

export type SelectFieldProps<TFieldValues extends FieldValues> =
    Omit<SelectProps, 'name' | 'value' | 'onValueChange'> &
    Omit<FieldWrapperProps<TFieldValues>, 'render'> & {
        name: Path<TFieldValues>;
    };

/**
 * SelectField component that integrates Select with React Hook Form
 */
export function SelectField<TFieldValues extends FieldValues>({
    name,
    label,
    required,
    options,
    ...props
}: SelectFieldProps<TFieldValues>) {
    return (
        <FieldWrapper
            name={name}
            label={label}
            required={required}
            render={({ field, fieldState }) => (
                <Select
                    {...props}
                    error={fieldState.error?.message || ''}
                    value={field.value as string}
                    onValueChange={field.onChange}
                    name={field.name}
                    options={options}
                />
            )}
        />
    );
} 