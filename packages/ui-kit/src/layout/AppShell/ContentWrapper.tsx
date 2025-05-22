import React from 'react';
import { BreadcrumbItem } from './Breadcrumbs';

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
}

/**
 * ContentWrapper - Main content area for the AppShell layout
 */
export const ContentWrapper: React.FC<ContentWrapperProps> = ({
    children,
    breadcrumbs,
    fixed = false,
    header,
    footer,
}) => {
    return (
        <main className={`content-wrapper ${fixed ? 'fixed-width' : ''}`}>
            {/* Breadcrumbs section */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="breadcrumbs-container">
                    {/* Breadcrumbs component will be used here */}
                </div>
            )}

            {/* Custom header if provided */}
            {header && <div className="content-header">{header}</div>}

            {/* Main content */}
            <div className="content-body">{children}</div>

            {/* Custom footer if provided */}
            {footer && <div className="content-footer">{footer}</div>}
        </main>
    );
};

ContentWrapper.displayName = 'ContentWrapper'; 