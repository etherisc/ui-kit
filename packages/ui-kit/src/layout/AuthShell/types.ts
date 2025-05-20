import { ReactNode } from 'react';

/**
 * Props for the AuthShell component
 */
export interface AuthShellProps {
    /**
     * Logo to display at the top of the auth shell
     */
    logo?: ReactNode;

    /**
     * Main content of the auth shell
     */
    children: ReactNode;

    /**
     * Optional footer content
     */
    footer?: ReactNode;

    /**
     * Optional additional class name for the container
     */
    className?: string;

    /**
     * Width of the auth container
     * @default 'md'
     */
    width?: 'sm' | 'md' | 'lg';
} 