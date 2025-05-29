import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const TestForm = ({ children }: { children: React.ReactNode }) => {
    const schema = z.object({
        name: z.string()
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: ''
        }
    });

    return <FormProvider {...form}>{children}</FormProvider>;
};

describe('TextField', () => {
    it('renders with label and placeholder', () => {
        render(
            <TestForm>
                <TextField
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                />
            </TestForm>
        );

        expect(screen.getByText('Full Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    });

    it('renders as required when required prop is true', () => {
        render(
            <TestForm>
                <TextField
                    name="name"
                    label="Full Name"
                    required
                />
            </TestForm>
        );

        const requiredIndicator = screen.getByText('*');
        expect(requiredIndicator).toBeInTheDocument();
        expect(requiredIndicator).toHaveClass('text-error');
    });
}); 