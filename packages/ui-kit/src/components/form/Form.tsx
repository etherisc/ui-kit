import React from 'react';
import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

export interface FormProps<TFieldValues extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    form: UseFormReturn<TFieldValues>;
    children: React.ReactNode;
    onSubmit?: (data: TFieldValues) => void;
}

/**
 * Form component that provides form context using React Hook Form
 */
export function Form<TFieldValues extends FieldValues>({
    form,
    children,
    onSubmit,
    ...props
}: FormProps<TFieldValues>) {
    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} {...props}>
                {children}
            </form>
        </FormProvider>
    );
} 