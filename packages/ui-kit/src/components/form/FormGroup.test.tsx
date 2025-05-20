import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormGroup } from './FormGroup';

describe('FormGroup', () => {
    it('renders children correctly', () => {
        render(
            <FormGroup>
                <input data-testid="test-input" />
            </FormGroup>
        );

        expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
        const { getByText } = render(
            <FormGroup label="Test Label">
                <input />
            </FormGroup>
        );

        expect(getByText('Test Label')).toBeInTheDocument();
    });

    it('renders required indicator when required is true', () => {
        const { container } = render(
            <FormGroup label="Required Field" required={true}>
                <input />
            </FormGroup>
        );

        const requiredIndicator = container.querySelector('.text-error');
        expect(requiredIndicator).toBeInTheDocument();
        expect(requiredIndicator?.textContent).toBe('*');
    });

    it('renders error message when error is provided', () => {
        const errorMessage = 'This field is required';
        const { getByText } = render(
            <FormGroup error={errorMessage}>
                <input />
            </FormGroup>
        );

        expect(getByText(errorMessage)).toBeInTheDocument();
        expect(getByText(errorMessage)).toHaveClass('text-error');
    });

    it('renders description when provided and no error exists', () => {
        const description = 'Please enter your full name';
        const { getByText } = render(
            <FormGroup description={description}>
                <input />
            </FormGroup>
        );

        expect(getByText(description)).toBeInTheDocument();
    });

    it('prioritizes error over description when both are provided', () => {
        const description = 'Please enter your email';
        const error = 'Invalid email format';
        const { getByText, queryByText } = render(
            <FormGroup description={description} error={error}>
                <input />
            </FormGroup>
        );

        expect(getByText(error)).toBeInTheDocument();
        expect(queryByText(description)).not.toBeInTheDocument();
    });

    it('applies additional className prop correctly', () => {
        const { container } = render(
            <FormGroup className="test-class">
                <input />
            </FormGroup>
        );

        expect(container.firstChild).toHaveClass('test-class');
    });
}); 