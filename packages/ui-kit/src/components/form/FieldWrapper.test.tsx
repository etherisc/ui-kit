import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FieldWrapper } from './FieldWrapper';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const TestForm = ({ children }: { children: React.ReactNode }) => {
    const form = useForm({
        defaultValues: {
            testField: ''
        }
    });

    return <FormProvider {...form}>{children}</FormProvider>;
};

describe('FieldWrapper', () => {
    it('renders the provided field component', () => {
        render(
            <TestForm>
                <FieldWrapper
                    name="testField"
                    label="Test Field"
                    render={({ field }) => (
                        <input
                            data-testid="test-input"
                            value={field.value as string}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                        />
                    )}
                />
            </TestForm>
        );

        expect(screen.getByTestId('test-input')).toBeInTheDocument();
        expect(screen.getByText('Test Field')).toBeInTheDocument();
    });

    it('renders error message when field has error', () => {
        const schema = z.object({
            testField: z.string().min(1, 'This field is required')
        });

        const TestFormWithValidation = () => {
            const form = useForm({
                resolver: zodResolver(schema),
                defaultValues: {
                    testField: ''
                },
                mode: 'onChange'
            });

            // Set error manually for testing
            form.setError('testField', {
                type: 'manual',
                message: 'This field is required'
            });

            return (
                <FormProvider {...form}>
                    <FieldWrapper
                        name="testField"
                        label="Test Field"
                        render={({ field }) => (
                            <input
                                data-testid="test-input"
                                value={field.value as string}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                            />
                        )}
                    />
                </FormProvider>
            );
        };

        render(<TestFormWithValidation />);

        // Use queryByTestId to verify error is displayed
        expect(screen.getByTestId('test-input')).toBeInTheDocument();
        // Use getAllByText to handle multiple elements with the same text
        const errorElements = screen.getAllByText('This field is required');
        expect(errorElements.length).toBeGreaterThan(0);
    });

    it('passes required prop to FormGroup', () => {
        render(
            <TestForm>
                <FieldWrapper
                    name="testField"
                    label="Required Field"
                    required={true}
                    render={({ field }) => (
                        <input
                            data-testid="test-input"
                            value={field.value as string}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                        />
                    )}
                />
            </TestForm>
        );

        const requiredIndicator = screen.getByText('*');
        expect(requiredIndicator).toBeInTheDocument();
        expect(requiredIndicator).toHaveClass('text-error');
    });
}); 