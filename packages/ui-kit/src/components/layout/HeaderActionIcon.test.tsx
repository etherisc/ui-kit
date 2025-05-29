import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeaderActionIcon } from './HeaderActionIcon';

describe('HeaderActionIcon', () => {
    it('renders icon and label', () => {
        render(
            <HeaderActionIcon
                icon={<span data-testid="test-icon">🔔</span>}
                label="Notifications"
            />
        );

        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Notifications');
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(
            <HeaderActionIcon
                icon={<span>🔔</span>}
                label="Notifications"
                onClick={handleClick}
            />
        );

        screen.getByRole('button').click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('displays badge count when provided', () => {
        render(
            <HeaderActionIcon
                icon={<span>🔔</span>}
                label="Notifications"
                badgeCount={5}
            />
        );

        const badge = screen.getByText('5');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveAttribute('aria-label', '5 notifications');
    });

    it('caps badge count at 99+', () => {
        render(
            <HeaderActionIcon
                icon={<span>🔔</span>}
                label="Notifications"
                badgeCount={100}
            />
        );

        expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('does not display badge when count is 0', () => {
        render(
            <HeaderActionIcon
                icon={<span>🔔</span>}
                label="Notifications"
                badgeCount={0}
            />
        );

        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('is disabled when disabled prop is true', () => {
        render(
            <HeaderActionIcon
                icon={<span>🔔</span>}
                label="Notifications"
                disabled={true}
            />
        );

        expect(screen.getByRole('button')).toBeDisabled();
    });
}); 