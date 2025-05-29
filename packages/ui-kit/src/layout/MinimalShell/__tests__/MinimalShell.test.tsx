import { render, screen } from '@testing-library/react';
import { MinimalShell } from '../MinimalShell';
import { vi } from 'vitest';

// Mock the Logo component
vi.mock('../../../components/layout/Logo', () => ({
    Logo: ({ text }: { text: string }) => <div data-testid="logo">{text}</div>,
}));

describe('MinimalShell', () => {
    it('renders title correctly', () => {
        render(<MinimalShell title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders message when provided', () => {
        render(<MinimalShell title="Test Title" message="Test Message" />);
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('renders custom image when provided', () => {
        render(
            <MinimalShell
                title="Test Title"
                image={<div data-testid="custom-image">Custom Image</div>}
            />
        );
        expect(screen.getByTestId('custom-image')).toBeInTheDocument();
    });

    it('renders actions when provided', () => {
        render(
            <MinimalShell
                title="Test Title"
                actions={<button data-testid="action-button">Action</button>}
            />
        );
        expect(screen.getByTestId('action-button')).toBeInTheDocument();
    });

    it('renders children when provided', () => {
        render(
            <MinimalShell title="Test Title">
                <div data-testid="child-content">Child Content</div>
            </MinimalShell>
        );
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('renders custom logo when provided', () => {
        render(
            <MinimalShell
                title="Test Title"
                logo={<div data-testid="custom-logo">Custom Logo</div>}
            />
        );
        expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
    });

    it('renders default logo when no custom logo is provided', () => {
        render(<MinimalShell title="Test Title" />);
        expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
        const { container } = render(
            <MinimalShell title="Test Title" className="custom-class" />
        );
        // Check if the root div contains the custom class
        expect(container.firstChild).toHaveClass('custom-class');
    });
}); 