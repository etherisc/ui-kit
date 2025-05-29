import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';

type A11yButtonProps = ButtonProps & {
    /**
     * Aria label for better accessibility - use this when button only contains icons
     * or when the button text is not descriptive enough
     */
    ariaLabel?: string;

    /**
     * ID of an element that describes this button for accessibility
     */
    ariaDescribedBy?: string;

    /**
     * ID of an element that labels this button for accessibility
     */
    ariaLabelledBy?: string;

    /**
     * Button is expanded (for use with dropdowns, modals, etc.)
     */
    ariaExpanded?: boolean;

    /**
     * Controls element ID (for use with dropdowns, modals, etc.)
     */
    ariaControls?: string;

    /**
     * Optional icon to display before the button text
     */
    startIcon?: React.ReactNode;

    /**
     * Optional icon to display after the button text
     */
    endIcon?: React.ReactNode;

    /**
     * Whether the button is being used as a toggle
     */
    isToggle?: boolean;

    /**
     * Whether the button is in "pressed" state (for toggles)
     */
    isPressed?: boolean;
};

/**
 * A11yButton is a wrapper around the core Button component
 * that adds additional accessibility features without modifying
 * the core component.
 */
export function A11yButton({
    children,
    className,
    ariaLabel,
    ariaDescribedBy,
    ariaLabelledBy,
    ariaExpanded,
    ariaControls,
    startIcon,
    endIcon,
    isToggle,
    isPressed,
    ...props
}: A11yButtonProps) {
    return (
        <Button
            className={cn('flex items-center', className)}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-labelledby={ariaLabelledBy}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            aria-pressed={isToggle ? isPressed : undefined}
            role={isToggle ? 'button' : undefined}
            {...props}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </Button>
    );
} 