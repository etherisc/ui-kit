import { render, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';
import { vi } from 'vitest';
import { useTheme } from '../../../../hooks/useTheme';

// Mock the useTheme hook
vi.mock('../../../../hooks/useTheme', () => ({
    useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
    const mockToggleDarkMode = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Default mock implementation
        (useTheme as jest.Mock).mockReturnValue({
            isDarkMode: false,
            toggleDarkMode: mockToggleDarkMode,
        });
    });

    it('renders correctly in light mode', () => {
        const { container } = render(<ThemeToggle />);

        // In light mode, it should show the moon icon (to switch to dark)
        const button = container.querySelector('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('renders correctly in dark mode', () => {
        // Mock dark mode
        (useTheme as jest.Mock).mockReturnValue({
            isDarkMode: true,
            toggleDarkMode: mockToggleDarkMode,
        });

        const { container } = render(<ThemeToggle />);

        // In dark mode, it should show the sun icon (to switch to light)
        const button = container.querySelector('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    });

    it('calls toggleDarkMode when clicked', () => {
        const { container } = render(<ThemeToggle />);

        const button = container.querySelector('button');
        fireEvent.click(button!);

        expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
    });

    it('calls onToggle prop with the new state when clicked', () => {
        const mockOnToggle = vi.fn();
        const { container } = render(<ThemeToggle onToggle={mockOnToggle} />);

        // Starting in light mode, clicking should pass true (new dark mode state)
        const button = container.querySelector('button');
        fireEvent.click(button!);

        expect(mockOnToggle).toHaveBeenCalledWith(true);
    });

    it('applies size classes correctly', () => {
        // Small size
        const { container: smallContainer } = render(<ThemeToggle size="sm" />);
        const smallButton = smallContainer.querySelector('button');
        expect(smallButton).toHaveClass('h-8 w-8');

        // Medium size
        const { container: mediumContainer } = render(<ThemeToggle size="md" />);
        const mediumButton = mediumContainer.querySelector('button');
        expect(mediumButton).toHaveClass('h-10 w-10');

        // Large size
        const { container: largeContainer } = render(<ThemeToggle size="lg" />);
        const largeButton = largeContainer.querySelector('button');
        expect(largeButton).toHaveClass('h-12 w-12');
    });

    it('applies custom className', () => {
        const { container } = render(<ThemeToggle className="test-class" />);
        const button = container.querySelector('button');
        expect(button).toHaveClass('test-class');
    });
}); 