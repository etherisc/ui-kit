import { useEffect, useState } from 'react';
import { useThemeState } from '../store/sessionStore';

/**
 * Hook that provides access to theme state and utilities
 * Enhances the basic Zustand store with:
 * - System theme preference detection
 * - Helper methods for common theme operations
 */
export function useTheme() {
    const { isDarkMode, setDarkMode, toggleDarkMode } = useThemeState();
    const [systemPrefersDark, setSystemPrefersDark] = useState(false);

    // Detect system preference
    useEffect(function setupSystemPreference() {
        // Check for system dark mode preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemPrefersDark(mediaQuery.matches);

        // Listen for changes in system preference
        const handler = (event: MediaQueryListEvent) => {
            setSystemPrefersDark(event.matches);
        };

        mediaQuery.addEventListener('change', handler);
        return function cleanupSystemPreference() {
            mediaQuery.removeEventListener('change', handler);
        };
    }, []);

    // Helper to sync with system preference
    const syncWithSystemPreference = () => {
        setDarkMode(systemPrefersDark);
    };

    // Set theme class on document
    useEffect(function applyThemeClass() {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Cleanup function to remove theme class if component unmounts
        return function cleanupThemeClass() {
            // This is a no-op in this case, but we include it to comply with our ESLint rule
            // In a real-world scenario, you might want to restore the previous theme
        };
    }, [isDarkMode]);

    return {
        isDarkMode,
        setDarkMode,
        toggleDarkMode,
        systemPrefersDark,
        syncWithSystemPreference,
    };
} 