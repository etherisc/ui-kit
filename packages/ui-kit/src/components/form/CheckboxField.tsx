import { FieldValues, Path } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '../primitives/Checkbox/Checkbox';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

export type CheckboxFieldProps<TFieldValues extends FieldValues> =
    Omit<CheckboxProps, 'name' | 'checked'> &
    Omit<FieldWrapperProps<TFieldValues>, 'render'> & {
        name: Path<TFieldValues>;
    };

/**
 * CheckboxField component that integrates Checkbox with React Hook Form
 */
export function CheckboxField<TFieldValues extends FieldValues>({
    name,
    label,
    required,
    ...props
}: CheckboxFieldProps<TFieldValues>) {
    return (
        <FieldWrapper
            name={name}
            label={label}
            required={required}
            render={({ field, fieldState }) => (
                <Checkbox
                    {...props}
                    error={fieldState.error?.message || ''}
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    name={field.name}
                />
            )}
        />
    );
} 