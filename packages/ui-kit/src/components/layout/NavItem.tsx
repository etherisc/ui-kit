import React from 'react';
import { cn } from '@/lib/utils';

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
    /**
     * Whether this is a parent item with children
     */
    hasChildren?: boolean;
    /**
     * Whether this item is expanded (if it has children)
     */
    isExpanded?: boolean;
    /**
     * Optional toggle handler for expanding/collapsing (if has children)
     */
    onToggle?: () => void;
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
    hasChildren = false,
    isExpanded = false,
    onToggle,
}) => {
    const baseClasses = cn(
        "flex items-center gap-3 px-3 py-2 w-full rounded-md transition-colors",
        "text-sm font-medium",
        isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground/70 hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2",
        className
    );

    const handleClick = (e: React.MouseEvent) => {
        if (hasChildren && onToggle) {
            e.preventDefault();
            onToggle();
        } else if (onClick) {
            onClick();
        }
    };

    const itemContent = (
        <>
            {icon && (
                <span className={cn(
                    "flex items-center justify-center",
                    isCollapsed ? "w-8 h-8" : "w-5 h-5"
                )}>
                    {icon}
                </span>
            )}

            {!isCollapsed && (
                <span className="flex-grow truncate">{label}</span>
            )}

            {hasChildren && !isCollapsed && (
                <span className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-90"
                )}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </span>
            )}
        </>
    );

    return href && !hasChildren ? (
        <a
            href={href}
            className={baseClasses}
            onClick={handleClick}
            aria-current={isActive ? 'page' : undefined}
            title={isCollapsed ? label : undefined}
        >
            {itemContent}
        </a>
    ) : (
        <button
            className={baseClasses}
            onClick={handleClick}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            aria-expanded={hasChildren ? isExpanded : undefined}
            title={isCollapsed ? label : undefined}
        >
            {itemContent}
        </button>
    );
};

NavItem.displayName = 'NavItem';