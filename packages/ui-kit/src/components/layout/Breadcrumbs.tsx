import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb item structure
 */
export interface BreadcrumbItem {
    /**
     * Label to display for the breadcrumb
     */
    label: string;
    /**
     * URL to navigate to when breadcrumb is clicked
     */
    href?: string;
    /**
     * Whether this is the current/active breadcrumb
     */
    isActive?: boolean;
}

/**
 * Breadcrumbs component props
 */
export interface BreadcrumbsProps {
    /**
     * Array of breadcrumb items to display
     */
    items: BreadcrumbItem[];
    /**
     * Optional custom separator between breadcrumbs
     */
    separator?: React.ReactNode;
    /**
     * Optional custom class name
     */
    className?: string;
    /**
     * Whether to truncate middle items when there are too many
     * @default false
     */
    truncate?: boolean;
    /**
     * Maximum number of items to show when truncating
     * @default 3
     */
    maxVisibleItems?: number;
}

/**
 * Breadcrumbs - Navigation breadcrumb trail component
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    items,
    separator = '/',
    className = '',
    truncate = false,
    maxVisibleItems = 3,
}) => {
    const renderItems = () => {
        if (!truncate || items.length <= maxVisibleItems) {
            return items.map((item, index) => (
                <li key={`${item.label}-${index}`} className="flex items-center">
                    {index > 0 && (
                        <span
                            className="mx-2 text-muted-foreground"
                            aria-hidden="true"
                        >
                            {separator}
                        </span>
                    )}
                    {renderBreadcrumbItem(item)}
                </li>
            ));
        }

        // Truncate logic - show first item, ellipsis, and last items
        const firstItem = items[0];
        const lastItems = items.slice(-2);

        return (
            <>
                <li className="flex items-center">
                    {renderBreadcrumbItem(firstItem)}
                </li>
                <li className="flex items-center">
                    <span
                        className="mx-2 text-muted-foreground"
                        aria-hidden="true"
                    >
                        {separator}
                    </span>
                    <span className="text-muted-foreground">...</span>
                </li>
                {lastItems.map((item, index) => (
                    <li key={`${item.label}-last-${index}`} className="flex items-center">
                        <span
                            className="mx-2 text-muted-foreground"
                            aria-hidden="true"
                        >
                            {separator}
                        </span>
                        {renderBreadcrumbItem(item)}
                    </li>
                ))}
            </>
        );
    };

    const renderBreadcrumbItem = (item: BreadcrumbItem) => {
        if (item.href && !item.isActive) {
            return (
                <a
                    href={item.href}
                    className="hover:text-primary transition-colors"
                >
                    {item.label}
                </a>
            );
        }

        return (
            <span
                aria-current={item.isActive ? 'page' : undefined}
                className={item.isActive ? 'font-medium text-foreground' : 'text-muted-foreground'}
            >
                {item.label}
            </span>
        );
    };

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn(
                "h-10 flex items-center",
                className
            )}
        >
            <ol className="flex flex-wrap text-sm">
                {renderItems()}
            </ol>
        </nav>
    );
};

Breadcrumbs.displayName = 'Breadcrumbs'; 