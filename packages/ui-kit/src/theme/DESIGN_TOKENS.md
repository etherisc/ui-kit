# Design Tokens

This document provides an overview of the design tokens used in the UI-Kit. These tokens serve as the foundation for the theming system, bridging DaisyUI and Shadcn UI.

## Color Tokens

### Base Colors

| Token                      | DaisyUI Variable  | Description                         |
| -------------------------- | ----------------- | ----------------------------------- |
| `--primary`                | `hsl(var(--p))`   | Primary brand color                 |
| `--primary-foreground`     | `hsl(var(--pc))`  | Text color for primary elements     |
| `--secondary`              | `hsl(var(--s))`   | Secondary color                     |
| `--secondary-foreground`   | `hsl(var(--sc))`  | Text color for secondary elements   |
| `--accent`                 | `hsl(var(--a))`   | Accent color for highlights         |
| `--accent-foreground`      | `hsl(var(--ac))`  | Text color for accent elements      |
| `--destructive`            | `hsl(var(--er))`  | Error/destructive action color      |
| `--destructive-foreground` | `hsl(var(--erc))` | Text color for destructive elements |

### UI Element Colors

| Token                  | DaisyUI Variable                    | Description              |
| ---------------------- | ----------------------------------- | ------------------------ |
| `--background`         | `hsl(var(--b1))` / `hsl(var(--n))`  | Page background color    |
| `--foreground`         | `hsl(var(--bc))` / `hsl(var(--nc))` | Main text color          |
| `--card`               | `hsl(var(--b1))` / `hsl(var(--n))`  | Card background color    |
| `--card-foreground`    | `hsl(var(--bc))` / `hsl(var(--nc))` | Card text color          |
| `--popover`            | `hsl(var(--b1))` / `hsl(var(--n))`  | Popover background color |
| `--popover-foreground` | `hsl(var(--bc))` / `hsl(var(--nc))` | Popover text color       |

### Border and Input Colors

| Token      | DaisyUI Variable                    | Description                |
| ---------- | ----------------------------------- | -------------------------- |
| `--border` | `hsl(var(--b2))` / `hsl(var(--b3))` | Border color               |
| `--input`  | `hsl(var(--b2))` / `hsl(var(--b3))` | Input element border color |
| `--ring`   | `hsl(var(--p))`                     | Focus ring color           |

### Status Colors

| Token                  | DaisyUI Variable  | Description                |
| ---------------------- | ----------------- | -------------------------- |
| `--success`            | `hsl(var(--su))`  | Success/confirmation color |
| `--success-foreground` | `hsl(var(--suc))` | Text on success elements   |
| `--warning`            | `hsl(var(--wa))`  | Warning color              |
| `--warning-foreground` | `hsl(var(--wac))` | Text on warning elements   |
| `--info`               | `hsl(var(--in))`  | Information color          |
| `--info-foreground`    | `hsl(var(--inc))` | Text on info elements      |

## Other Design Tokens

### Border Radius

| Token      | Value    | Description        |
| ---------- | -------- | ------------------ |
| `--radius` | `0.5rem` | Base border radius |

### Shadows

| Token               | Value                | Description                         |
| ------------------- | -------------------- | ----------------------------------- |
| `--shadow-color`    | `220 3% 15%` (light) | Color used for shadow calculations  |
|                     | `220 40% 2%` (dark)  | Darker in dark mode                 |
| `--shadow-strength` | `1%` (light)         | Opacity strength for shadow effects |
|                     | `4%` (dark)          | Stronger in dark mode               |
| `--shadow-sm`       | Calculated value     | Small shadow                        |
| `--shadow`          | Calculated value     | Default shadow                      |
| `--shadow-md`       | Calculated value     | Medium shadow                       |
| `--shadow-lg`       | Calculated value     | Large shadow                        |

## Theme Switching

The UI-Kit supports both light and dark themes. In dark mode, background and foreground colors are adjusted to provide appropriate contrast.

### Light Mode (Default)

In light mode, backgrounds use `--b1` (base-100) colors from DaisyUI, which are typically lighter shades.

### Dark Mode

Dark mode is activated by adding the `dark` class to the document's root element. In dark mode:

- Backgrounds use `--n` (neutral) colors
- Text uses `--nc` (neutral-content) colors
- Elements have increased contrast for better visibility

## Usage

Import the theme CSS in your application:

```tsx
import "@org/ui-kit/theme/theme.css";
```

To toggle between themes:

```tsx
import { toggleTheme } from "@org/ui-kit";

// In a button click handler:
onClick = { toggleTheme };
```

To initialize theme based on user preference:

```tsx
import { initializeTheme } from "@org/ui-kit";

// In your app initialization:
useEffect(() => {
  initializeTheme();
}, []);
```
