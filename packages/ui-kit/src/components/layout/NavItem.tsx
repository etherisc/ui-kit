import React from 'react';

/**
 * NavItem component props
 */
export interface NavItemProps {
    /**
     * Label text to display
     */
    label: string;
    /**
     * Optional icon to display
     */
    icon?: React.ReactNode;
    /**
     * Optional href for navigation
     */
    href?: string;
    /**
     * Whether item is active
     */
    isActive?: boolean;
    /**
     * Whether parent navigation is collapsed
     */
    isCollapsed?: boolean;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * Optional custom class name
     */
    className?: string;
}

/**
 * NavItem - Navigation item for use in SideNav
 */
export const NavItem: React.FC<NavItemProps> = ({
    label,
    icon,
    href,
    isActive = false,
    isCollapsed = false,
    onClick,
    className = '',
}) => {
    const itemContent = (
        <>
            {icon && <span className="nav-item-icon">{icon}</span>}
            {!isCollapsed && <span className="nav-item-label">{label}</span>}
        </>
    );

    return href ? (
        <a
            href={href}
            className={`nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''
                } ${className}`}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
        >
            {itemContent}
        </a>
    ) : (
        <button
            className={`nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''
                } ${className}`}
            onClick={onClick}
            type="button"
            aria-current={isActive ? 'page' : undefined}
        >
            {itemContent}
        </button>
    );
};

NavItem.displayName = 'NavItem'; 