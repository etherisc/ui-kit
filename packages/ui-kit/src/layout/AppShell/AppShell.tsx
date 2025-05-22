import React from 'react';

/**
 * AppShell component serves as the main layout for the application
 * Combines TopBar, SideNav, and ContentWrapper components
 */
export interface AppShellProps {
    children?: React.ReactNode;
}

/**
 * AppShell - Main layout component with TopBar, SideNav, and ContentWrapper
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
    return (
        <div className="app-shell">
            {/* TopBar will be implemented here */}
            {/* SideNav will be implemented here */}
            {/* ContentWrapper with children will be implemented here */}
            <div className="content">{children}</div>
        </div>
    );
};

AppShell.displayName = 'AppShell'; 