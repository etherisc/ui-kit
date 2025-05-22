import { ReactNode } from 'react';
import { BreadcrumbItem } from './Breadcrumbs';
import { NavItem } from './SideNav';

/**
 * Props for the AppShell component
 */
export interface AppShellProps {
    /**
     * Main content to render in the AppShell
     */
    children: ReactNode;

    /**
     * Optional logo to display in the TopBar
     */
    logo?: ReactNode;

    /**
     * Optional navigation items for the TopBar
     */
    topNavItems?: ReactNode;

    /**
     * Optional user actions to display in the TopBar
     */
    userActions?: ReactNode;

    /**
     * Optional navigation items for the SideNav
     */
    sideNavItems?: NavItem[];

    /**
     * Optional breadcrumb items to display above content
     */
    breadcrumbs?: BreadcrumbItem[];

    /**
     * Whether the SideNav should be initially collapsed
     * @default false
     */
    initialCollapsed?: boolean;

    /**
     * Whether content should be fixed width (max-width: 960px)
     * @default false
     */
    fixedWidth?: boolean;

    /**
     * Optional custom header to display above content
     */
    contentHeader?: ReactNode;

    /**
     * Optional custom footer to display below content
     */
    contentFooter?: ReactNode;
} 