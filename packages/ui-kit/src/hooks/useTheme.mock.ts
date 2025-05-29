import { useState, useCallback } from 'react';

/**
 * A mock implementation of the useTheme hook for testing purposes
 * This avoids the infinite update issues in the ThemeToggle component's stories
 */
export function useThemeMock() {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = useCallback(() => {
        setDarkMode(prevMode => !prevMode);
    }, []);

    // Mock the system preference hooks
    const [systemPrefersDark] = useState(false);

    // Mock the sync method
    const syncWithSystemPreference = useCallback(() => {
        setDarkMode(systemPrefersDark);
    }, [systemPrefersDark]);

    return {
        isDarkMode,
        setDarkMode,
        toggleDarkMode,
        systemPrefersDark,
        syncWithSystemPreference,
    };
} 