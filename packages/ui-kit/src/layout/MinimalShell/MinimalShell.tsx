import React from 'react';
import { cn } from '../../utils/cn';
import { Logo } from '../../components/layout/Logo';

/**
 * MinimalShell component props
 */
export interface MinimalShellProps {
    /**
     * Main title
     */
    title: string;
    /**
     * Optional subtitle or description text
     */
    message?: string;
    /**
     * Optional main content to be displayed
     */
    children?: React.ReactNode;
    /**
     * Optional action buttons or links
     */
    actions?: React.ReactNode;
    /**
     * Optional image or icon to display
     */
    image?: React.ReactNode;
    /**
     * Optional logo element
     */
    logo?: React.ReactNode;
    /**
     * Optional additional CSS class name
     */
    className?: string;
}

/**
 * MinimalShell - Simple centered layout for error pages and simple screens
 * 
 * Features:
 * - Centered content with logo, title, message, and optional actions
 * - Useful for error pages (404, 500), maintenance screens, or simple layouts
 */
export const MinimalShell: React.FC<MinimalShellProps> = ({
    title,
    message,
    children,
    actions,
    image,
    logo,
    className,
}) => {
    return (
        <div className={cn(
            "min-h-screen flex flex-col items-center justify-center bg-background p-4",
            className
        )}>
            {/* Logo area */}
            <header className="mb-6">
                {logo || <Logo text="Company Name" />}
            </header>

            <main className="max-w-md w-full bg-card rounded-lg shadow-sm p-8 text-center">
                {/* Image/icon if provided */}
                {image && (
                    <div className="flex justify-center mb-4" aria-hidden="true">
                        {image}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-2xl font-bold mb-2">{title}</h1>

                {/* Message */}
                {message && (
                    <p className="text-muted-foreground mb-6">{message}</p>
                )}

                {/* Main content */}
                {children && (
                    <div className="my-4">
                        {children}
                    </div>
                )}

                {/* Action buttons */}
                {actions && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        {actions}
                    </div>
                )}
            </main>
        </div>
    );
};

MinimalShell.displayName = 'MinimalShell'; 