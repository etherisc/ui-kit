import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';

/**
 * Hook providing access to theme state and actions
 */
export function useTheme() {
    const { isDarkMode, setDarkMode, toggleDarkMode } = useSessionStore();
    const [systemPrefersDark, setSystemPrefersDark] = useState(false);

    // Update the document theme class whenever the dark mode changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Detect system color scheme preference
    useEffect(() => {
        // Check for system dark mode preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemPrefersDark(mediaQuery.matches);

        // Listen for changes in system preference
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemPrefersDark(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Sync with system preference
    const syncWithSystemPreference = () => {
        setDarkMode(systemPrefersDark);
    };

    return {
        isDarkMode,
        setDarkMode,
        toggleDarkMode,
        systemPrefersDark,
        syncWithSystemPreference,
    };
} 