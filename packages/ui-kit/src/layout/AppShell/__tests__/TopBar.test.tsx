import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopBar } from '../TopBar';

describe('TopBar', () => {
    it('renders with logo only', () => {
        const logoText = 'Test Logo';
        render(
            <TopBar
                logo={<div data-testid="logo">{logoText}</div>}
            />
        );

        const logoElement = screen.getByTestId('logo');
        expect(logoElement).toBeInTheDocument();
        expect(logoElement).toHaveTextContent(logoText);

        // Navigation and user actions sections should not be rendered
        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('renders with navigation items', () => {
        render(
            <TopBar
                logo={<div data-testid="logo">Logo</div>}
                navigationItems={<div data-testid="nav-items">Navigation Items</div>}
            />
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('nav-items')).toBeInTheDocument();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders with user actions', () => {
        render(
            <TopBar
                logo={<div data-testid="logo">Logo</div>}
                userActions={<div data-testid="user-actions">User Actions</div>}
            />
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('user-actions')).toBeInTheDocument();
    });

    it('renders with all sections', () => {
        render(
            <TopBar
                logo={<div data-testid="logo">Logo</div>}
                navigationItems={<div data-testid="nav-items">Navigation Items</div>}
                userActions={<div data-testid="user-actions">User Actions</div>}
            />
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('nav-items')).toBeInTheDocument();
        expect(screen.getByTestId('user-actions')).toBeInTheDocument();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const customClass = 'custom-top-bar';
        render(
            <TopBar
                className={customClass}
                logo={<div data-testid="logo">Logo</div>}
            />
        );

        const header = screen.getByRole('banner');
        expect(header).toHaveClass(customClass);
    });

    it('has correct ARIA attributes', () => {
        render(
            <TopBar
                logo={<div>Logo</div>}
                navigationItems={<div>Nav</div>}
            />
        );

        const header = screen.getByRole('banner');
        expect(header).toHaveAttribute('aria-label', 'Top navigation bar');

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('is not fixed when fixed prop is false', () => {
        render(
            <TopBar
                fixed={false}
                logo={<div>Logo</div>}
            />
        );

        const header = screen.getByRole('banner');
        expect(header).not.toHaveClass('sticky');
    });
}); 