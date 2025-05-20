import { ReactNode, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export interface ThemeProviderProps {
    /**
     * The content to render within the theme provider
     */
    children: ReactNode;

    /**
     * Whether to automatically sync with system preferences on mount
     * @default true
     */
    syncWithSystemOnMount?: boolean;
}

/**
 * Provider component that sets up theme context and handles theme initialization
 * Automatically detects system preferences and applies theme classes to the document
 */
export function ThemeProvider({
    children,
    syncWithSystemOnMount = true,
}: ThemeProviderProps) {
    const { isDarkMode, syncWithSystemPreference } = useTheme();

    // Initialize theme based on system preferences if enabled
    useEffect(() => {
        if (syncWithSystemOnMount) {
            syncWithSystemPreference();
        }
    }, [syncWithSystemOnMount, syncWithSystemPreference]);

    return (
        <div className={isDarkMode ? 'dark' : 'light'} data-theme={isDarkMode ? 'dark' : 'light'}>
            {children}
        </div>
    );
} 