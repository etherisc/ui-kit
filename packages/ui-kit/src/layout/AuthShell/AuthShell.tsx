import React from 'react';
import { cn } from '@/utils/cn';
import { AuthShellProps } from './types';

/**
 * AuthShell is a layout component for authentication-related pages like login, signup, and password reset.
 * It provides a centered container with optional logo and footer slots.
 */
export const AuthShell: React.FC<AuthShellProps> = ({
    logo,
    children,
    footer,
    className,
    width = 'md',
}) => {
    const containerWidthClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
    }[width];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div
                className={cn(
                    'w-full flex flex-col items-center p-6 rounded-lg shadow-md bg-card text-card-foreground',
                    containerWidthClass,
                    className
                )}
            >
                {logo && (
                    <div className="flex justify-center mb-6 w-full">
                        {logo}
                    </div>
                )}

                <div className="w-full">
                    {children}
                </div>

                {footer && (
                    <div className="mt-6 w-full text-center text-sm text-muted-foreground">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

AuthShell.displayName = 'AuthShell'; 