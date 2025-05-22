import React from 'react';

/**
 * MinimalShell component props
 */
export interface MinimalShellProps {
    /**
     * Title to display
     */
    title?: string;
    /**
     * Message/description to display
     */
    message?: string;
    /**
     * Optional image/illustration to display
     */
    image?: React.ReactNode;
    /**
     * Optional action buttons
     */
    actions?: React.ReactNode;
    /**
     * Optional additional content
     */
    children?: React.ReactNode;
}

/**
 * MinimalShell - Simple page shell for error pages, maintenance screens, etc.
 */
export const MinimalShell: React.FC<MinimalShellProps> = ({
    title,
    message,
    image,
    actions,
    children,
}) => {
    return (
        <div className="minimal-shell">
            <div className="minimal-shell-content">
                {image && <div className="minimal-shell-image">{image}</div>}

                {title && <h1 className="minimal-shell-title">{title}</h1>}

                {message && <p className="minimal-shell-message">{message}</p>}

                {actions && <div className="minimal-shell-actions">{actions}</div>}

                {children && <div className="minimal-shell-children">{children}</div>}
            </div>
        </div>
    );
};

MinimalShell.displayName = 'MinimalShell'; 