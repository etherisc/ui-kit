import { ReactNode, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

// Define the shape of the useTheme hook return value
type UseThemeHook = ReturnType<typeof useTheme>;

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

    /**
     * Hook to use for theme state (for testing purposes)
     * @internal
     */
    useThemeHook?: () => UseThemeHook;
}

/**
 * Provider component that sets up theme context and handles theme initialization
 * Automatically detects system preferences and applies theme classes to the document
 */
export function ThemeProvider({
    children,
    syncWithSystemOnMount = true,
    useThemeHook = useTheme,
}: ThemeProviderProps) {
    const { isDarkMode, syncWithSystemPreference } = useThemeHook();

    // Initialize theme based on system preferences if enabled
    useEffect(function setupSystemSync() {
        if (syncWithSystemOnMount) {
            syncWithSystemPreference();
        }

        // Return cleanup function
        return function cleanupSystemSync() {
            // This is a no-op, but included to comply with our ESLint rule
            // In a real-world scenario, you might want to perform cleanup tasks
        };
    }, [syncWithSystemOnMount, syncWithSystemPreference]);

    return (
        <div className={isDarkMode ? 'dark' : 'light'} data-theme={isDarkMode ? 'dark' : 'light'}>
            {children}
        </div>
    );
} 