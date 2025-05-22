import React from 'react';

/**
 * HeaderActionIcon component props
 */
export interface HeaderActionIconProps {
    /**
     * Icon element to display
     */
    icon: React.ReactNode;
    /**
     * Label for accessibility
     */
    label: string;
    /**
     * Optional callback when icon is clicked
     */
    onClick?: () => void;
    /**
     * Optional badge count to display
     */
    badgeCount?: number;
    /**
     * Optional custom class name
     */
    className?: string;
}

/**
 * HeaderActionIcon - Icon button for use in TopBar's action area
 */
export const HeaderActionIcon: React.FC<HeaderActionIconProps> = ({
    icon,
    label,
    onClick,
    badgeCount,
    className = '',
}) => {
    return (
        <button
            className={`header-action-icon ${className}`}
            onClick={onClick}
            aria-label={label}
            type="button"
        >
            {icon}
            {badgeCount !== undefined && badgeCount > 0 && (
                <span className="badge" aria-label={`${badgeCount} notifications`}>
                    {badgeCount}
                </span>
            )}
        </button>
    );
};

HeaderActionIcon.displayName = 'HeaderActionIcon'; 