import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
    it('renders with label', () => {
        render(<Checkbox label="Accept terms" />);
        expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders in checked state', () => {
        render(<Checkbox checked={true} data-testid="checkbox" />);
        const checkbox = screen.getByTestId('checkbox');
        expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('renders in disabled state', () => {
        render(<Checkbox disabled data-testid="checkbox" />);
        const checkbox = screen.getByTestId('checkbox');
        expect(checkbox).toBeDisabled();
    });

    it('shows error message', () => {
        render(<Checkbox error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('shows description text', () => {
        render(<Checkbox description="You must accept the terms to continue" />);
        expect(screen.getByText('You must accept the terms to continue')).toBeInTheDocument();
    });
}); 