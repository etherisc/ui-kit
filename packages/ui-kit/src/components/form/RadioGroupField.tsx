import { FieldValues, Path } from 'react-hook-form';
import { RadioGroup, RadioGroupProps } from '../primitives/RadioGroup/RadioGroup';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

export type RadioGroupFieldProps<TFieldValues extends FieldValues> =
    Omit<RadioGroupProps, 'name' | 'value' | 'onValueChange'> &
    Omit<FieldWrapperProps<TFieldValues>, 'render'> & {
        name: Path<TFieldValues>;
    };

/**
 * RadioGroupField component that integrates RadioGroup with React Hook Form
 */
export function RadioGroupField<TFieldValues extends FieldValues>({
    name,
    label,
    required,
    options,
    ...props
}: RadioGroupFieldProps<TFieldValues>) {
    return (
        <FieldWrapper
            name={name}
            label={label}
            required={required}
            render={({ field, fieldState }) => (
                <RadioGroup
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