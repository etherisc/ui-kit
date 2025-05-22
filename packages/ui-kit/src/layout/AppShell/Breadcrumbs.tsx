import React from 'react';

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
}

/**
 * Breadcrumbs - Navigation breadcrumb trail component
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    items,
    separator = '/',
}) => {
    return (
        <nav aria-label="Breadcrumb" className="breadcrumbs">
            <ol>
                {items.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className={item.isActive ? 'active' : ''}
                    >
                        {index > 0 && <span className="separator">{separator}</span>}
                        {item.href && !item.isActive ? (
                            <a href={item.href}>{item.label}</a>
                        ) : (
                            <span aria-current={item.isActive ? 'page' : undefined}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

Breadcrumbs.displayName = 'Breadcrumbs'; 