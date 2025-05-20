import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
    it('renders with placeholder', () => {
        render(<NumberInput placeholder="Enter number" />);
        expect(screen.getByPlaceholderText('Enter number')).toBeInTheDocument();
    });

    it('shows label', () => {
        render(<NumberInput label="Age" />);
        expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('shows error message', () => {
        render(<NumberInput error="Invalid number" />);
        expect(screen.getByText('Invalid number')).toBeInTheDocument();
    });

    it('renders with min, max and step attributes', () => {
        render(<NumberInput min={0} max={100} step={5} data-testid="number-input" />);
        const input = screen.getByTestId('number-input');
        expect(input).toHaveAttribute('min', '0');
        expect(input).toHaveAttribute('max', '100');
        expect(input).toHaveAttribute('step', '5');
    });
}); 