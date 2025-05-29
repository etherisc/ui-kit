import React from 'react';
import { cn } from '../../utils/cn';

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
    /**
     * Optional additional className for the header
     */
    className?: string;
    /**
     * Optional prop to make the TopBar fixed at the top of the viewport
     */
    fixed?: boolean;
}

/**
 * TopBar - Header component for the AppShell layout
 * 
 * Height scales responsively:
 * - Desktop: 64px
 * - Tablet: 56px
 * - Mobile: 48px
 */
export const TopBar: React.FC<TopBarProps> = ({
    logo,
    navigationItems,
    userActions,
    className,
    fixed = true,
}) => {
    return (
        <header
            className={cn(
                "w-full bg-background border-b border-border",
                "h-16 md:h-14 sm:h-12", // Height: 64px/56px/48px
                "flex items-center justify-between",
                "px-4 md:px-3 sm:px-2",
                fixed && "sticky top-0 z-40",
                className
            )}
            role="banner"
            aria-label="Top navigation bar"
        >
            {/* Logo section - fixed width between 220-260px */}
            {logo && (
                <div className={cn(
                    "flex-shrink-0",
                    "w-[260px] md:w-[240px] sm:w-[220px]"
                )}>
                    {logo}
                </div>
            )}

            {/* Navigation section */}
            {navigationItems && (
                <nav
                    className="flex-grow flex items-center justify-center"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    {navigationItems}
                </nav>
            )}

            {/* User actions section */}
            {userActions && (
                <div className="flex-shrink-0 flex items-center gap-2">
                    {userActions}
                </div>
            )}
        </header>
    );
};

TopBar.displayName = 'TopBar'; 