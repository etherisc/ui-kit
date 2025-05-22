import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme state slice
export interface ThemeState {
    isDarkMode: boolean;
    setDarkMode: (isDark: boolean) => void;
    toggleDarkMode: () => void;
}

// Other UI state can be added here in the future
export interface UIState {
    // Reserved for future UI state

    __placeholder?: never; // Just a placeholder to make TS happy
}

// Combined store type
export type SessionState = ThemeState & UIState;

/**
 * Session store for managing application UI state
 * Uses persist middleware to save preferences to localStorage
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

// Export selectors for specific state slices
export const useThemeState = () => {
    const isDarkMode = useSessionStore((state) => state.isDarkMode);
    const setDarkMode = useSessionStore((state) => state.setDarkMode);
    const toggleDarkMode = useSessionStore((state) => state.toggleDarkMode);

    return {
        isDarkMode,
        setDarkMode,
        toggleDarkMode,
    } as const;
}; 