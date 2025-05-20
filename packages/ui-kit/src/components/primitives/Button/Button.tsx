import React from 'react';
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, intent = 'default', size = 'default', loading = false, disabled, children, ...props },
        ref,
    ) => {
        // Map our intent to Shadcn's variant system
        const variant: ShadcnButtonProps['variant'] =
            intent === 'danger'
                ? 'destructive'
                : intent === 'primary'
                    ? 'default'
                    : intent === 'secondary'
                        ? 'secondary'
                        : intent === 'outline'
                            ? 'outline'
                            : intent === 'ghost'
                                ? 'ghost'
                                : intent === 'link'
                                    ? 'link'
                                    : 'default';

        return (
            <ShadcnButton
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    'transition-colors',
                    loading && 'loading',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className,
                )}
                disabled={disabled || loading}
                {...props}
            >
                {children}
            </ShadcnButton>
        );
    },
);

Button.displayName = 'Button'; 