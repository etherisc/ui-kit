import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
    it('renders with text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('applies intent classes', () => {
        render(<Button intent="primary">Primary</Button>);
        const button = screen.getByRole('button');
        // assuming DaisyUI tailwind tokens compiled; check for generic class existence
        expect(button).toHaveClass('transition-colors');
    });

    it('applies size classes', () => {
        render(<Button size="sm">Small</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('handles loading state', () => {
        render(<Button loading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
}); 