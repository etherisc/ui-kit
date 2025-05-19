import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextInput } from './TextInput';

describe('TextInput', () => {
    it('renders with placeholder', () => {
        render(<TextInput placeholder="Hello" />);
        expect(screen.getByPlaceholderText('Hello')).toBeInTheDocument();
    });

    it('shows label', () => {
        render(<TextInput label="Email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('shows error message', () => {
        render(<TextInput error="Required" />);
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
}); 