import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { SideNav } from './SideNav';
import { ContentWrapper } from './ContentWrapper';
import { cn } from '../../utils/cn';
import type { NavItem } from './SideNav';
import type { BreadcrumbItem } from './Breadcrumbs';

/**
 * AppShell component props
 */
export interface AppShellProps {
    /**
     * The main content of the app
     */
    children?: React.ReactNode;
    /**
     * Optional logo element for the TopBar
     */
    logo?: React.ReactNode;
    /**
     * Optional array of navigation items for the SideNav
     */
    navItems?: NavItem[];
    /**
     * Optional navigation elements for the TopBar
     */
    topNavItems?: React.ReactNode;
    /**
     * Optional user actions for the TopBar
     */
    userActions?: React.ReactNode;
    /**
     * Optional breadcrumbs items for the ContentWrapper
     */
    breadcrumbs?: BreadcrumbItem[];
    /**
     * Whether the TopBar should be fixed at the top
     */
    fixedHeader?: boolean;
    /**
     * Whether the SideNav should be initially collapsed
     */
    defaultCollapsed?: boolean;
    /**
     * Optional additional className for the root element
     */
    className?: string;
    /**
     * Whether content should have a fixed width (max-width 960px)
     */
    fixedWidth?: boolean;
}

/**
 * AppShell component serves as the main layout for the application
 * Combines TopBar, SideNav, and ContentWrapper components
 */
export const AppShell: React.FC<AppShellProps> = ({
    children,
    logo,
    navItems = [],
    topNavItems,
    userActions,
    breadcrumbs,
    fixedHeader = true,
    defaultCollapsed = false,
    className,
    fixedWidth = false,
}) => {
    // State for sidebar collapsed state
    const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(defaultCollapsed);

    // Handle sidebar collapse toggle
    const handleCollapseToggle = (collapsed: boolean) => {
        setSideNavCollapsed(collapsed);
    };

    return (
        <div
            className={cn(
                "flex flex-col h-screen w-full bg-background",
                className
            )}
        >
            {/* TopBar */}
            <TopBar
                logo={logo}
                navigationItems={topNavItems}
                userActions={userActions}
                fixed={fixedHeader}
            />

            {/* Main content area with SideNav and ContentWrapper */}
            <div className="flex flex-1 overflow-hidden">
                {/* SideNav */}
                <SideNav
                    items={navItems}
                    collapsed={sideNavCollapsed}
                    onCollapseToggle={handleCollapseToggle}
                    persistCollapsed={true}
                />

                {/* ContentWrapper with children */}
                <ContentWrapper
                    breadcrumbs={breadcrumbs}
                    fixed={fixedWidth}
                >
                    {children}
                </ContentWrapper>
            </div>
        </div>
    );
};

AppShell.displayName = 'AppShell'; 