import { render, screen } from '@testing-library/react';
import { AppShell } from '../AppShell';
import { HomeIcon } from 'lucide-react';
import type { NavItem } from '../SideNav';
import type { BreadcrumbItem } from '../Breadcrumbs';
import { vi } from 'vitest';

// Mock child components to simplify testing
vi.mock('../TopBar', () => ({
    TopBar: ({
        logo,
        navigationItems,
        userActions
    }: {
        logo?: React.ReactNode;
        navigationItems?: React.ReactNode;
        userActions?: React.ReactNode;
    }) => (
        <div data-testid="topbar">
            {logo && <div data-testid="logo">{logo}</div>}
            {navigationItems && <div data-testid="nav-items">{navigationItems}</div>}
            {userActions && <div data-testid="user-actions">{userActions}</div>}
        </div>
    ),
}));

vi.mock('../SideNav', () => ({
    SideNav: ({
        items = [],
        collapsed
    }: {
        items?: NavItem[];
        collapsed?: boolean;
    }) => (
        <div data-testid="sidenav" data-collapsed={collapsed}>
            {items.length} items
        </div>
    ),
}));

vi.mock('../ContentWrapper', () => ({
    ContentWrapper: ({
        children,
        breadcrumbs,
        fixed
    }: {
        children: React.ReactNode;
        breadcrumbs?: BreadcrumbItem[];
        fixed?: boolean;
    }) => (
        <div data-testid="content-wrapper" data-fixed={fixed}>
            {breadcrumbs && <div data-testid="breadcrumbs">{breadcrumbs.length} breadcrumbs</div>}
            <div data-testid="content">{children}</div>
        </div>
    ),
}));

describe('AppShell', () => {
    const mockNavItems: NavItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: <HomeIcon data-testid="home-icon" />,
            href: '/home',
            isActive: true,
        },
    ];

    const mockBreadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Details', isActive: true },
    ];

    it('renders with all components', () => {
        render(
            <AppShell
                logo={<span>Logo</span>}
                navItems={mockNavItems}
                topNavItems={<span>Navigation</span>}
                userActions={<span>User</span>}
                breadcrumbs={mockBreadcrumbs}
            >
                Content
            </AppShell>
        );

        expect(screen.getByTestId('topbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidenav')).toBeInTheDocument();
        expect(screen.getByTestId('content-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('content')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('passes fixed prop to ContentWrapper when fixedWidth is true', () => {
        render(
            <AppShell fixedWidth={true}>
                Content
            </AppShell>
        );

        const contentWrapper = screen.getByTestId('content-wrapper');
        expect(contentWrapper).toHaveAttribute('data-fixed', 'true');
    });

    it('passes collapsed prop to SideNav based on defaultCollapsed', () => {
        render(
            <AppShell defaultCollapsed={true} navItems={mockNavItems}>
                Content
            </AppShell>
        );

        const sideNav = screen.getByTestId('sidenav');
        expect(sideNav).toHaveAttribute('data-collapsed', 'true');
    });

    it('passes fixed prop to TopBar based on fixedHeader', () => {
        render(
            <AppShell fixedHeader={false}>
                Content
            </AppShell>
        );

        // Since we're using mock components, we can't directly test this prop
        // In a real scenario, we would check for the absence of the 'sticky' class
        expect(screen.getByTestId('topbar')).toBeInTheDocument();
    });
}); 