import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from './Select';

const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
];

describe('Select', () => {
    it('shows label', () => {
        render(<Select label="Favorite Color" options={mockOptions} />);
        expect(screen.getByText('Favorite Color')).toBeInTheDocument();
    });

    it('shows placeholder', () => {
        render(<Select placeholder="Select a color" options={mockOptions} />);
        expect(screen.getByText('Select a color')).toBeInTheDocument();
    });

    it('shows error message', () => {
        render(<Select error="Please select a value" options={mockOptions} />);
        expect(screen.getByText('Please select a value')).toBeInTheDocument();
    });

    it('shows description text', () => {
        render(<Select description="Choose your favorite color" options={mockOptions} />);
        expect(screen.getByText('Choose your favorite color')).toBeInTheDocument();
    });
}); 