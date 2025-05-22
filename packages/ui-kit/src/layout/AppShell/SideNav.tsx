import React, { useEffect, useState } from 'react';
import { NavItem as NavItemComponent } from '../../components/layout/NavItem';
import { cn } from '../../utils/cn';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

// Local storage key for persisting collapsed state
const SIDENAV_COLLAPSED_KEY = 'ui-kit-sidenav-collapsed';

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
    /**
     * Whether this is a group/section header
     */
    isGroup?: boolean;
    /**
     * Whether a group is expanded (for groups with children)
     */
    isExpanded?: boolean;
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
    /**
     * Optional CSS class name
     */
    className?: string;
    /**
     * Whether to persist collapsed state in localStorage
     */
    persistCollapsed?: boolean;
    /**
     * Optional data-testid for testing
     */
    'data-testid'?: string;
}

/**
 * SideNav - Sidebar navigation component for the AppShell layout
 * 
 * Features:
 * - Collapsible to 64px icon-only rail
 * - Supports nested navigation up to 3 levels deep
 * - Persists collapsed state in localStorage
 * - Fully keyboard navigable
 * - ARIA compliant
 */
export const SideNav: React.FC<SideNavProps> = ({
    items = [],
    collapsed: controlledCollapsed,
    onCollapseToggle,
    className,
    persistCollapsed = true,
    'data-testid': dataTestId,
}) => {
    // Use internal state if not controlled externally
    const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false);

    // Determine if component is controlled or uncontrolled
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

    // Load collapsed state from localStorage on mount
    useEffect(function loadCollapsedState() {
        if (!isControlled && persistCollapsed) {
            try {
                const savedState = localStorage.getItem(SIDENAV_COLLAPSED_KEY);
                if (savedState !== null) {
                    setInternalCollapsed(savedState === 'true');
                }
            } catch (e) {
                console.error('Error loading SideNav collapsed state from localStorage', e);
            }
        }

        // No cleanup needed as we're just reading from localStorage once
        return () => { };
    }, [isControlled, persistCollapsed]);

    // Handle collapse toggle
    const handleCollapseToggle = () => {
        const newCollapsed = !collapsed;

        // Update internal state if uncontrolled
        if (!isControlled) {
            setInternalCollapsed(newCollapsed);

            // Persist to localStorage if enabled
            if (persistCollapsed) {
                try {
                    localStorage.setItem(SIDENAV_COLLAPSED_KEY, String(newCollapsed));
                } catch (e) {
                    console.error('Error saving SideNav collapsed state to localStorage', e);
                }
            }
        }

        // Call external handler if provided
        onCollapseToggle?.(newCollapsed);
    };

    // Render navigation items recursively
    const renderItems = (navItems: NavItem[], level = 0, parentId?: string) => {
        // Use appropriate ARIA roles based on level
        const listRole = level === 0 ? "menu" : "menu";
        const listId = `nav-list-${parentId || 'root'}`;

        return (
            <ul
                className={cn(
                    "list-none p-0 m-0 w-full",
                    level === 1 && "pl-6",
                    level === 2 && "pl-10"
                )}
                role={listRole}
                id={listId}
                aria-label={level === 0 ? "Main navigation" : `Submenu for ${parentId}`}
            >
                {navItems.map((item) => {
                    const itemId = `nav-item-${item.id}`;
                    const hasSubmenu = Boolean(item.children?.length);
                    const submenuId = hasSubmenu ? `nav-list-${item.id}` : undefined;

                    return (
                        <li key={item.id} role="none" className="w-full">
                            <NavItemComponent
                                icon={item.icon}
                                label={item.label}
                                href={item.href}
                                isActive={item.isActive}
                                onClick={item.onClick}
                                isExpanded={!collapsed && item.isExpanded}
                                isCollapsed={collapsed}
                                hasChildren={hasSubmenu}
                                onToggle={hasSubmenu ? () => {
                                    // This would be handled by parent component
                                    // that manages item.isExpanded state
                                    console.log('Toggle item', item.id);
                                } : undefined}
                                aria-controls={submenuId}
                                id={itemId}
                                role={level === 0 ? "menuitem" : "menuitem"}
                            />

                            {/* Render children if they exist and either the item is expanded or this is a non-collapsible group */}
                            {item.children && item.children.length > 0 && (
                                (!collapsed && item.isExpanded) || (item.isGroup && !collapsed) ? (
                                    renderItems(item.children, level + 1, item.id)
                                ) : null
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <aside
            className={cn(
                "flex flex-col h-full bg-background border-r border-border",
                collapsed ? "w-16" : "w-[260px] md:w-[240px] sm:w-[220px]",
                "transition-width duration-200 ease-in-out",
                className
            )}
            aria-label="Main navigation sidebar"
            data-testid={dataTestId}
        >
            {/* Toggle button for collapsing the sidebar */}
            <div className="p-2 flex justify-center">
                <button
                    className={cn(
                        "flex items-center justify-center h-10 w-10",
                        "rounded-full text-foreground hover:bg-accent hover:text-accent-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        "transition-colors"
                    )}
                    onClick={handleCollapseToggle}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-expanded={!collapsed}
                    type="button"
                >
                    {collapsed ? <ChevronRightIcon size={18} aria-hidden="true" /> : <ChevronLeftIcon size={18} aria-hidden="true" />}
                </button>
            </div>

            {/* Navigation items */}
            <nav
                className="flex-grow overflow-y-auto px-3"
                aria-label="Sidebar navigation"
            >
                <h2 className="sr-only">Sidebar navigation</h2>
                {items.length > 0 ? renderItems(items) : (
                    <div className="text-foreground/80 text-center py-4" role="region" aria-labelledby="empty-nav-message">
                        <span id="empty-nav-message" className="text-sm">No navigation items</span>
                    </div>
                )}
            </nav>
        </aside>
    );
};

SideNav.displayName = 'SideNav'; 