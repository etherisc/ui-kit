import React from 'react';

/**
 * Navigation item structure for SideNav
 */
export interface NavItem {
    /**
     * Unique identifier for the item
     */
    id: string;
    /**
     * Display label for the item
     */
    label: string;
    /**
     * Icon element to display next to the label
     */
    icon?: React.ReactNode;
    /**
     * URL to navigate to when item is clicked
     */
    href?: string;
    /**
     * Whether the item is currently active
     */
    isActive?: boolean;
    /**
     * Optional callback when item is clicked
     */
    onClick?: () => void;
    /**
     * Optional children items for nested navigation
     */
    children?: NavItem[];
}

/**
 * SideNav component props
 */
export interface SideNavProps {
    /**
     * Array of navigation items to display
     */
    items?: NavItem[];
    /**
     * Whether the navigation is collapsed (icon-only mode)
     */
    collapsed?: boolean;
    /**
     * Callback when collapse state changes
     */
    onCollapseToggle?: (collapsed: boolean) => void;
}

/**
 * SideNav - Sidebar navigation component for the AppShell layout
 */
export const SideNav: React.FC<SideNavProps> = ({
    items = [],
    collapsed = false,
    onCollapseToggle,
}) => {
    return (
        <aside className="side-nav">
            {/* Toggle button for collapsing the sidebar */}
            <button
                className="collapse-toggle"
                onClick={() => onCollapseToggle?.(!collapsed)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {/* Toggle icon will go here */}
            </button>

            {/* Navigation items */}
            <nav className="nav-items">
                {/* Items will be rendered here */}
                {items.length > 0 && (
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                {/* Item content will be implemented here */}
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </aside>
    );
};

SideNav.displayName = 'SideNav'; 