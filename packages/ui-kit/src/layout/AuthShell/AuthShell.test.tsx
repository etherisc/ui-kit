import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthShell } from './AuthShell';

describe('AuthShell', () => {
    it('renders children content', () => {
        render(
            <AuthShell>
                <div data-testid="test-content">Test Content</div>
            </AuthShell>
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders logo when provided', () => {
        render(
            <AuthShell
                logo={<div data-testid="test-logo">Brand Logo</div>}
            >
                <div>Test Content</div>
            </AuthShell>
        );

        expect(screen.getByTestId('test-logo')).toBeInTheDocument();
        expect(screen.getByText('Brand Logo')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
        render(
            <AuthShell
                footer={<div data-testid="test-footer">Footer Content</div>}
            >
                <div>Test Content</div>
            </AuthShell>
        );

        expect(screen.getByTestId('test-footer')).toBeInTheDocument();
        expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies width class based on width prop', () => {
        const { container, rerender } = render(
            <AuthShell width="sm">
                <div>Test Content</div>
            </AuthShell>
        );

        // Check for small width class
        expect(container.querySelector('.max-w-sm')).toBeInTheDocument();

        // Re-render with medium width
        rerender(
            <AuthShell width="md">
                <div>Test Content</div>
            </AuthShell>
        );

        // Check for medium width class
        expect(container.querySelector('.max-w-md')).toBeInTheDocument();

        // Re-render with large width
        rerender(
            <AuthShell width="lg">
                <div>Test Content</div>
            </AuthShell>
        );

        // Check for large width class
        expect(container.querySelector('.max-w-lg')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
        const { container } = render(
            <AuthShell className="custom-class">
                <div>Test Content</div>
            </AuthShell>
        );

        const authShellContainer = container.querySelector('.custom-class');
        expect(authShellContainer).toBeInTheDocument();
    });
}); 