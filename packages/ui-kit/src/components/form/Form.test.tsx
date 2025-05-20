import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Form } from './Form';
import { z } from 'zod';
import { useForm } from './useForm';

describe('Form', () => {
    it('renders children correctly', () => {
        // Define schema
        const schema = z.object({
            name: z.string(),
        });

        // Create a test component that uses the Form component
        const FormTest = () => {
            const form = useForm(schema, { name: 'John' });
            return (
                <Form form={form}>
                    <div data-testid="form-child">Form Child</div>
                </Form>
            );
        };

        render(<FormTest />);
        expect(screen.getByTestId('form-child')).toBeInTheDocument();
    });

    it('renders with form props', () => {
        // Define schema
        const schema = z.object({
            name: z.string(),
        });

        // Create a test component
        const FormTest = () => {
            const form = useForm(schema, { name: 'John' });
            return (
                <Form form={form} className="test-class" data-testid="test-form">
                    <button type="submit">Submit</button>
                </Form>
            );
        };

        render(<FormTest />);
        const formElement = screen.getByTestId('test-form');

        // Check if form renders with correct props
        expect(formElement).toHaveClass('test-class');
        expect(formElement.tagName.toLowerCase()).toBe('form');
    });
}); 