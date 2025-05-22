import React from 'react';

/**
 * TopBar component for the AppShell layout
 * Contains logo, navigation, and user actions
 */
export interface TopBarProps {
    /**
     * Optional logo element to display on the left side
     */
    logo?: React.ReactNode;
    /**
     * Optional navigation elements to display in the center
     */
    navigationItems?: React.ReactNode;
    /**
     * Optional user actions to display on the right side
     */
    userActions?: React.ReactNode;
}

/**
 * TopBar - Header component for the AppShell layout
 */
export const TopBar: React.FC<TopBarProps> = ({
    logo,
    navigationItems,
    userActions,
}) => {
    return (
        <header className="top-bar">
            {/* Logo section */}
            {logo && <div className="logo-container">{logo}</div>}

            {/* Navigation section */}
            {navigationItems && (
                <nav className="navigation-container">{navigationItems}</nav>
            )}

            {/* User actions section */}
            {userActions && <div className="user-actions">{userActions}</div>}
        </header>
    );
};

TopBar.displayName = 'TopBar'; 