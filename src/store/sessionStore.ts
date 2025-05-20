import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    isDarkMode: boolean;
    setDarkMode: (isDark: boolean) => void;
    toggleDarkMode: () => void;
}

// The full session store type (can be extended with other state slices later)
type SessionState = ThemeState;

/**
 * Main session store using Zustand
 * Handles UI state that needs to persist across page refreshes
 */
export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            // Theme state
            isDarkMode: false,
            setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'ui-kit-session', // localStorage key
            partialize: (state) => ({ isDarkMode: state.isDarkMode }), // Only persist theme settings
        }
    )
);

// Selector hook for theme state only
export const useThemeState = () => useSessionStore(
    (state) => ({
        isDarkMode: state.isDarkMode,
        setDarkMode: state.setDarkMode,
        toggleDarkMode: state.toggleDarkMode,
    })
); 