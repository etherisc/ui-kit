import { render, screen, fireEvent } from '@testing-library/react';
import { SideNav, NavItem } from '../SideNav';
import { HomeIcon, SettingsIcon } from 'lucide-react';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key: string) => {
            delete store[key];
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Sample navigation items for testing
const mockNavItems: NavItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: <HomeIcon data-testid="home-icon" />,
        href: '/home',
        isActive: true,
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon data-testid="settings-icon" />,
        href: '/settings',
    },
    {
        id: 'group',
        label: 'Group',
        isGroup: true,
        children: [
            {
                id: 'child1',
                label: 'Child Item',
                href: '/child',
            },
        ],
    },
];

describe('SideNav', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorageMock.clear();
    });

    it('renders with navigation items', () => {
        render(<SideNav items={mockNavItems} data-testid="sidenav" />);

        // Check that navigation items are rendered
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Group')).toBeInTheDocument();
        expect(screen.getByText('Child Item')).toBeInTheDocument();

        // Check for icons
        expect(screen.getByTestId('home-icon')).toBeInTheDocument();
        expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
    });

    it('renders in collapsed state when collapsed prop is true', () => {
        render(<SideNav items={mockNavItems} collapsed={true} data-testid="sidenav" />);

        // In collapsed state, the aside element should have the w-16 class
        const sideNavs = document.querySelectorAll('aside');
        const sideNav = sideNavs[0];
        expect(sideNav).toHaveClass('w-16');

        // Not have the expanded width class
        expect(sideNav).not.toHaveClass('w-[260px]');
    });

    it('calls onCollapseToggle when toggle button is clicked', () => {
        const mockToggle = vi.fn();
        render(<SideNav items={mockNavItems} onCollapseToggle={mockToggle} data-testid="sidenav" />);

        // Find and click the toggle button
        const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });
        fireEvent.click(toggleButton);

        // Check that the toggle function was called
        expect(mockToggle).toHaveBeenCalledWith(true);
    });

    it('persists collapsed state to localStorage when persistCollapsed is true', () => {
        const { rerender } = render(<SideNav items={mockNavItems} persistCollapsed={true} data-testid="sidenav" />);

        // Initially collapsed state should be false
        expect(localStorageMock.getItem('ui-kit-sidenav-collapsed')).toBeNull();

        // Find and click the toggle button to collapse
        const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });
        fireEvent.click(toggleButton);

        // Check that collapsed state was saved to localStorage
        expect(localStorageMock.getItem('ui-kit-sidenav-collapsed')).toBe('true');

        // Rerender with new collapsed state to simulate a page reload
        rerender(<SideNav items={mockNavItems} persistCollapsed={true} data-testid="sidenav" />);

        // Should have loaded the collapsed state from localStorage
        const sideNavs = document.querySelectorAll('aside');
        const sideNav = sideNavs[0];
        expect(sideNav).toHaveClass('w-16');
    });

    it('displays the correct toggle button icon based on collapsed state', () => {
        const { rerender } = render(<SideNav items={mockNavItems} collapsed={false} data-testid="sidenav" />);

        // When expanded, should show collapse (left) icon
        const leftChevron = document.querySelector('svg path[d="m15 18-6-6 6-6"]');
        expect(leftChevron).not.toBeNull();

        // Rerender in collapsed state
        rerender(<SideNav items={mockNavItems} collapsed={true} data-testid="sidenav" />);

        // When collapsed, should show expand (right) icon
        const rightChevron = document.querySelector('svg path[d="m9 18 6-6-6-6"]');
        expect(rightChevron).not.toBeNull();
    });

    it('renders empty state correctly when no items are provided', () => {
        render(<SideNav items={[]} data-testid="sidenav" />);

        // SideNav should be rendered but without any navigation items
        const sideNavs = document.querySelectorAll('aside');
        const sideNav = sideNavs[0];
        expect(sideNav).toBeInTheDocument();

        // No list items should be rendered
        const listItems = sideNav.querySelectorAll('li');
        expect(listItems.length).toBe(0);
    });
}); 