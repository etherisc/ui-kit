import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { NavItem } from './NavItem';

describe('NavItem', () => {
    it('renders label', () => {
        render(<NavItem label="Dashboard" />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders as a button by default', () => {
        render(<NavItem label="Dashboard" />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as a link when href is provided', () => {
        render(<NavItem label="Dashboard" href="/dashboard" />);
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        render(<NavItem label="Dashboard" onClick={handleClick} />);

        await userEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('displays active state', () => {
        render(<NavItem label="Dashboard" isActive />);
        const item = screen.getByRole('button');
        expect(item).toHaveAttribute('aria-current', 'page');
    });

    it('displays icon when provided', () => {
        render(
            <NavItem
                label="Dashboard"
                icon={<span data-testid="test-icon">📊</span>}
            />
        );

        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('hides label when collapsed', () => {
        render(<NavItem label="Dashboard" isCollapsed />);
        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('shows title attribute when collapsed', () => {
        render(<NavItem label="Dashboard" isCollapsed />);
        expect(screen.getByRole('button')).toHaveAttribute('title', 'Dashboard');
    });

    it('calls onToggle when clicked with hasChildren', async () => {
        const handleToggle = vi.fn();
        render(
            <NavItem
                label="Settings"
                hasChildren
                onToggle={handleToggle}
            />
        );

        await userEvent.click(screen.getByRole('button'));
        expect(handleToggle).toHaveBeenCalledTimes(1);
    });

    it('displays expanded state when expanded', () => {
        render(
            <NavItem
                label="Settings"
                hasChildren
                isExpanded
            />
        );

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });
}); 