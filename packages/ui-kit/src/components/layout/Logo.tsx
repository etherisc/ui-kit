import React from 'react';

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
}

/**
 * Logo - Application logo component for TopBar
 */
export const Logo: React.FC<LogoProps> = ({
    src,
    alt = 'Logo',
    text,
    className = '',
}) => {
    return (
        <div className={`logo ${className}`}>
            {src && <img src={src} alt={alt} className="logo-image" />}
            {text && <span className="logo-text">{text}</span>}
        </div>
    );
};

Logo.displayName = 'Logo'; 