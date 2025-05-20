import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RadioGroup } from './RadioGroup';

const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
];

describe('RadioGroup', () => {
    it('renders with label', () => {
        render(<RadioGroup label="Choose an option" options={mockOptions} />);
        expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('renders all options', () => {
        render(<RadioGroup options={mockOptions} />);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders with selected value', () => {
        render(<RadioGroup value="option1" options={mockOptions} />);
        // Get all radio buttons and find the one that's checked
        const radioButtons = screen.getAllByRole('radio');
        const checkedRadio = radioButtons.find(radio => radio.getAttribute('data-state') === 'checked');
        expect(checkedRadio).not.toBeNull();
        expect(checkedRadio).toHaveAttribute('value', 'option1');
    });

    it('shows error message', () => {
        render(<RadioGroup error="Please select an option" options={mockOptions} />);
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('shows description text', () => {
        render(<RadioGroup description="Select one of the options" options={mockOptions} />);
        expect(screen.getByText('Select one of the options')).toBeInTheDocument();
    });

    it('renders in disabled state', () => {
        render(<RadioGroup disabled options={mockOptions} />);
        const radioButtons = screen.getAllByRole('radio');
        radioButtons.forEach(radio => {
            expect(radio).toBeDisabled();
        });
    });
}); 