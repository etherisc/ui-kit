import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    /**
     * Optional variant for the button
     * @default 'ghost'
     */
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    /**
     * Whether the button is disabled
     * @default false
     */
    disabled?: boolean;
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
    variant = 'ghost',
    disabled = false,
}) => {
    return (
        <div className="relative">
            <Button
                variant={variant}
                size="icon"
                className={cn(
                    "h-10 w-10 rounded-full",
                    className
                )}
                onClick={onClick}
                aria-label={label}
                disabled={disabled}
            >
                {icon}
            </Button>

            {badgeCount !== undefined && badgeCount > 0 && (
                <span
                    className={cn(
                        "absolute -top-1 -right-1 flex items-center justify-center",
                        "h-5 min-w-5 rounded-full bg-destructive text-destructive-foreground",
                        "text-xs font-medium"
                    )}
                    aria-label={`${badgeCount} notifications`}
                >
                    {badgeCount > 99 ? '99+' : badgeCount}
                </span>
            )}
        </div>
    );
};

HeaderActionIcon.displayName = 'HeaderActionIcon';