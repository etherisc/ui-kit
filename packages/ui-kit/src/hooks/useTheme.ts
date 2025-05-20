import { useEffect, useState, useCallback, useRef } from 'react';
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
    const systemPrefInitialized = useRef(false);
    const isDarkModeRef = useRef(isDarkMode);

    // Update ref when isDarkMode changes
    useEffect(function updateDarkModeRef() {
        isDarkModeRef.current = isDarkMode;

        return function cleanupDarkModeRef() {
            // No cleanup needed for a simple ref update
        };
    }, [isDarkMode]);

    // Detect system preference - only run once to avoid infinite loops
    useEffect(function setupSystemPreference() {
        if (systemPrefInitialized.current) return;
        systemPrefInitialized.current = true;

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

    // Helper to sync with system preference - memoize the function
    const syncWithSystemPreference = useCallback(() => {
        setDarkMode(systemPrefersDark);
    }, [systemPrefersDark, setDarkMode]);

    // Set theme class on document
    useEffect(function applyThemeClass() {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        return function cleanupThemeClass() {
            // No cleanup needed for class modifications
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