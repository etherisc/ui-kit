import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

/**
 * Logo component props
 */
export interface LogoProps {
    /**
     * Optional source URL for the logo image
     */
    src?: string;
    /**
     * Optional alt text for the logo image
     */
    alt?: string;
    /**
     * Optional text to display next to the logo
     */
    text?: string;
    /**
     * Optional class name for custom styling
     */
    className?: string;
    /**
     * Optional fallback initials if image fails to load
     */
    fallback?: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Logo - Application logo component for TopBar
 */
export const Logo: React.FC<LogoProps> = ({
    src,
    alt = 'Logo',
    text,
    fallback,
    className = '',
    onClick,
}) => {
    // Generate fallback from text if not provided
    const displayFallback = fallback || (text ? text.charAt(0).toUpperCase() : 'A');

    return (
        <div
            className={cn(
                "flex items-center gap-3 h-full min-w-[220px] max-w-[260px]",
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <Avatar className="h-10 w-10 border border-border">
                {src ? (
                    <AvatarImage src={src} alt={alt} />
                ) : null}
                <AvatarFallback className="bg-primary text-primary-foreground">
                    {displayFallback}
                </AvatarFallback>
            </Avatar>

            {text && (
                <span className="font-semibold text-lg truncate">
                    {text}
                </span>
            )}
        </div>
    );
};

Logo.displayName = 'Logo';