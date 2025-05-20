# Task 2.3 Planning: Zustand Session Store with Dark Mode

## Overview

This task involves implementing a Zustand session store to manage application state, with a specific focus on implementing a dark mode toggle feature. Zustand is a small, fast, and scalable state management solution that will help keep UI state synchronized across components.

## Task Breakdown

| Task Description                      | Definition of Done (DoD)                                 | Status   |
| ------------------------------------- | -------------------------------------------------------- | -------- |
| Set up Zustand dependency             | Package installed and configured                         | complete |
| Create basic store structure          | Store created with typed state and actions               | complete |
| Implement dark mode state and actions | Store includes dark mode flag and toggle/set actions     | complete |
| Add persistence middleware            | Dark mode preference persists across page refreshes      | complete |
| Create useTheme hook                  | Hook provides easy access to theme state and actions     | complete |
| Create ThemeProvider component        | Provider sets up theme context and initial state         | complete |
| Add theme toggle component            | UI component allows switching between light/dark modes   | complete |
| Implement system preference detection | Auto-detect user's system preference for dark/light mode | complete |
| Add unit tests for store and hooks    | Tests verify state changes and persistence               | complete |
| Update theme CSS variables            | CSS variables change based on theme state                | complete |
| Document usage patterns               | Documentation added for theme store and components       | complete |

## Implementation Strategy

### Store Architecture

The Zustand store will follow a slice pattern to keep code modular:

```typescript
interface ThemeState {
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  toggleDarkMode: () => void;
}

interface UIState {
  // Other UI state can go here in the future (sidebar, modals, etc.)
}

// Combined store type
type SessionState = ThemeState & UIState;
```

### Persistence Strategy

We'll use Zustand's persist middleware to save preferences to localStorage:

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      // Initial state and actions
      isDarkMode: false,
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "ui-kit-session", // localStorage key
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), // Only persist theme settings
    },
  ),
);
```

### Theme Provider Implementation

The ThemeProvider will handle:

1. Reading initial state (localStorage + system preference)
2. Setting the correct class on the HTML/body element
3. Providing theme context to components

### Testing Approach

- Unit tests with Vitest for store and actions
- Mock localStorage for persistence tests
- Test system preference detection with window.matchMedia mocks
- Test ThemeProvider initial state and updates

## Integration with UI Components

- Theme toggle component will use the store
- Base components will adapt to theme via CSS variables
- No explicit theme prop needed on components (CSS-based theming)
