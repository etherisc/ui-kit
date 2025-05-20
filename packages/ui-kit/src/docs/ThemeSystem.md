# Theme System

The UI Kit includes a powerful theming system built on Zustand state management, with support for:

- Light and dark modes
- System preference detection
- Persistence across page loads
- Easy integration with components

## Basic Usage

Wrap your application with the `ThemeProvider` component:

```tsx
import { ThemeProvider } from "@org/ui-kit";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Adding the Theme Toggle

Use the `ThemeToggle` component to allow users to switch between themes:

```tsx
import { ThemeToggle } from "@org/ui-kit";

function Header() {
  return (
    <header>
      <nav>
        {/* Other elements */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

## Accessing Theme State

You can access theme state and actions in any component using the `useTheme` hook:

```tsx
import { useTheme } from "@org/ui-kit";

function MyComponent() {
  const { isDarkMode, toggleDarkMode, setDarkMode } = useTheme();

  return (
    <div>
      <p>Current theme: {isDarkMode ? "Dark" : "Light"}</p>
      <button onClick={() => setDarkMode(true)}>Set Dark</button>
      <button onClick={() => setDarkMode(false)}>Set Light</button>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
}
```

## Advanced: System Preference Detection

The `useTheme` hook provides a way to sync with system preferences:

```tsx
import { useTheme } from "@org/ui-kit";

function ThemeSettings() {
  const { isDarkMode, systemPrefersDark, syncWithSystemPreference } =
    useTheme();

  return (
    <div>
      <p>System preference: {systemPrefersDark ? "Dark" : "Light"}</p>
      <button onClick={syncWithSystemPreference}>Use System Settings</button>
    </div>
  );
}
```

## CSS Variables

The theme system automatically sets CSS variables based on the current theme. You can use these variables in your stylesheets:

```css
.my-element {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

## Available CSS Variables

| Variable               | Light Mode        | Dark Mode                  |
| ---------------------- | ----------------- | -------------------------- |
| --background           | Light background  | Dark background            |
| --foreground           | Dark text         | Light text                 |
| --card                 | Light card bg     | Dark card bg               |
| --card-foreground      | Dark card text    | Light card text            |
| --border               | Light border      | Dark border                |
| --primary              | Primary color     | Primary color (darker)     |
| --primary-foreground   | Text on primary   | Text on primary (darker)   |
| --secondary            | Secondary color   | Secondary color (darker)   |
| --secondary-foreground | Text on secondary | Text on secondary (darker) |
| --accent               | Accent color      | Accent color (darker)      |
| --accent-foreground    | Text on accent    | Text on accent (darker)    |

For a complete list of CSS variables, see the `theme.css` file.
