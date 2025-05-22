import React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

/**
 * ContentWrapper component props
 */
export interface ContentWrapperProps {
    /**
     * Content to display
     */
    children: React.ReactNode;
    /**
     * Optional breadcrumbs to display above content
     */
    breadcrumbs?: BreadcrumbItem[];
    /**
     * Whether the content should be fixed width (max-width: 960px)
     * @default false
     */
    fixed?: boolean;
    /**
     * Optional custom header content
     */
    header?: React.ReactNode;
    /**
     * Optional custom footer content
     */
    footer?: React.ReactNode;
    /**
     * Optional custom class name
     */
    className?: string;
    /**
     * Optional class name for the content area
     */
    contentClassName?: string;
}

/**
 * ContentWrapper - Main content area for page layouts
 */
export const ContentWrapper: React.FC<ContentWrapperProps> = ({
    children,
    breadcrumbs,
    fixed = false,
    header,
    footer,
    className,
    contentClassName,
}) => {
    return (
        <main
            className={cn(
                "h-full flex flex-col",
                className
            )}
        >
            {/* Breadcrumbs section */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="border-b">
                    <div className={cn(
                        fixed && "container--960 max-w-[960px] mx-auto px-6"
                    )}>
                        <Breadcrumbs items={breadcrumbs} truncate />
                    </div>
                </div>
            )}

            {/* Custom header if provided */}
            {header && (
                <div className={cn(
                    "content-header py-4",
                    fixed && "container--960 max-w-[960px] mx-auto px-6"
                )}>
                    {header}
                </div>
            )}

            {/* Main content */}
            <div
                className={cn(
                    "flex-grow overflow-auto",
                    fixed && "container--960 max-w-[960px] mx-auto px-6 py-6",
                    !fixed && "p-6",
                    contentClassName
                )}
            >
                {children}
            </div>

            {/* Custom footer if provided */}
            {footer && (
                <div className={cn(
                    "mt-auto py-4 border-t",
                    fixed && "container--960 max-w-[960px] mx-auto px-6"
                )}>
                    {footer}
                </div>
            )}
        </main>
    );
};

ContentWrapper.displayName = 'ContentWrapper'; 