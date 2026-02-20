# Design Tokens Reference

All CSS variables are defined in `src/styles/globals.css`.
The ui-kit uses the **Shadcn Slate** base palette with a **blue-500 primary** override.

Tokens use `hsl()` values in `:root` / `.dark` and are mapped to Tailwind v4
via a `@theme inline` block that creates `--color-*` and `--radius-*` aliases.

## Compatibility

These tokens follow the standard [Shadcn/ui theming convention](https://ui.shadcn.com/docs/theming).
Community themes from tools like [tweakcn](https://tweakcn.com/) can be dropped in directly.

## Core Tokens

| Token                  | Light                 | Dark                  | Description     |
| ---------------------- | --------------------- | --------------------- | --------------- |
| `--background`         | `hsl(0 0% 100%)`      | `hsl(222.2 84% 4.9%)` | Page background |
| `--foreground`         | `hsl(222.2 84% 4.9%)` | `hsl(210 40% 98%)`    | Default text    |
| `--card`               | `hsl(0 0% 100%)`      | `hsl(222.2 84% 4.9%)` | Card surface    |
| `--card-foreground`    | `hsl(222.2 84% 4.9%)` | `hsl(210 40% 98%)`    | Card text       |
| `--popover`            | `hsl(0 0% 100%)`      | `hsl(222.2 84% 4.9%)` | Popover surface |
| `--popover-foreground` | `hsl(222.2 84% 4.9%)` | `hsl(210 40% 98%)`    | Popover text    |

## Brand Tokens

| Token                      | Light                    | Dark                     | Description                           |
| -------------------------- | ------------------------ | ------------------------ | ------------------------------------- |
| `--primary`                | `hsl(217.2 91.2% 59.8%)` | `hsl(213.1 93.9% 67.8%)` | Primary actions (blue-500 / blue-400) |
| `--primary-foreground`     | `hsl(0 0% 100%)`         | `hsl(222.2 84% 4.9%)`    | Text on primary                       |
| `--secondary`              | `hsl(210 40% 96.1%)`     | `hsl(217 30% 25%)`       | Secondary surfaces                    |
| `--secondary-foreground`   | `hsl(222.2 47.4% 11.2%)` | `hsl(210 40% 98%)`       | Text on secondary                     |
| `--accent`                 | `hsl(210 40% 96.1%)`     | `hsl(217.2 32.6% 17.5%)` | Accent/highlight                      |
| `--accent-foreground`      | `hsl(222.2 47.4% 11.2%)` | `hsl(210 40% 98%)`       | Text on accent                        |
| `--muted`                  | `hsl(210 40% 96.1%)`     | `hsl(217.2 32.6% 17.5%)` | Muted backgrounds                     |
| `--muted-foreground`       | `hsl(215.4 16.3% 46.9%)` | `hsl(215 20.2% 65.1%)`   | Subdued text                          |
| `--destructive`            | `hsl(0 84.2% 60.2%)`     | `hsl(0 72% 51%)`         | Destructive actions                   |
| `--destructive-foreground` | `hsl(210 40% 98%)`       | `hsl(0 0% 100%)`         | Text on destructive                   |

## Status Tokens

| Token                  | Light               | Dark                | Description     |
| ---------------------- | ------------------- | ------------------- | --------------- |
| `--success`            | `hsl(152 82% 39%)`  | `hsl(152 90% 55%)`  | Success (green) |
| `--success-foreground` | `hsl(0 0% 100%)`    | `hsl(0 0% 0%)`      | Text on success |
| `--warning`            | `hsl(38 92% 50%)`   | `hsl(42 100% 65%)`  | Warning (amber) |
| `--warning-foreground` | `hsl(0 0% 100%)`    | `hsl(0 0% 0%)`      | Text on warning |
| `--error`              | `hsl(0 84% 60%)`    | `hsl(0 100% 68%)`   | Error (red)     |
| `--error-foreground`   | `hsl(0 0% 100%)`    | `hsl(0 0% 100%)`    | Text on error   |
| `--info`               | `hsl(210 100% 52%)` | `hsl(210 100% 70%)` | Info (blue)     |
| `--info-foreground`    | `hsl(0 0% 100%)`    | `hsl(0 0% 0%)`      | Text on info    |

## UI Tokens

| Token      | Light                    | Dark                   | Description        |
| ---------- | ------------------------ | ---------------------- | ------------------ |
| `--border` | `hsl(214.3 31.8% 91.4%)` | `hsl(215 20% 50%)`     | Border color       |
| `--input`  | `hsl(214.3 31.8% 91.4%)` | `hsl(215 20% 50%)`     | Input border       |
| `--ring`   | `hsl(217.2 91.2% 59.8%)` | `hsl(224.3 76.3% 48%)` | Focus ring         |
| `--radius` | `0.5rem`                 | `0.5rem`               | Border radius base |

## Chart Tokens

| Token       | Light              | Dark               |
| ----------- | ------------------ | ------------------ |
| `--chart-1` | `hsl(12 76% 61%)`  | `hsl(220 70% 50%)` |
| `--chart-2` | `hsl(173 58% 39%)` | `hsl(160 60% 45%)` |
| `--chart-3` | `hsl(197 37% 24%)` | `hsl(30 80% 55%)`  |
| `--chart-4` | `hsl(43 74% 66%)`  | `hsl(280 65% 60%)` |
| `--chart-5` | `hsl(27 87% 67%)`  | `hsl(340 75% 55%)` |

## Shadow Tokens

| Token               | Light        | Dark         | Description               |
| ------------------- | ------------ | ------------ | ------------------------- |
| `--shadow-color`    | `220 3% 15%` | `220 40% 2%` | Shadow base color         |
| `--shadow-strength` | `1%`         | `4%`         | Shadow opacity multiplier |
| `--shadow-sm`       | —            | —            | Small shadow              |
| `--shadow`          | —            | —            | Default shadow            |
| `--shadow-md`       | —            | —            | Medium shadow             |
| `--shadow-lg`       | —            | —            | Large shadow              |

## Tailwind v4 Theme Mappings

The `@theme inline` block maps semantic tokens to Tailwind utility classes.
These are **not** standalone values — they reference the tokens above via `var()`.

### Color mappings (`--color-*`)

| Alias                            | Source                          |
| -------------------------------- | ------------------------------- |
| `--color-background`             | `var(--background)`             |
| `--color-foreground`             | `var(--foreground)`             |
| `--color-card`                   | `var(--card)`                   |
| `--color-card-foreground`        | `var(--card-foreground)`        |
| `--color-popover`                | `var(--popover)`                |
| `--color-popover-foreground`     | `var(--popover-foreground)`     |
| `--color-primary`                | `var(--primary)`                |
| `--color-primary-foreground`     | `var(--primary-foreground)`     |
| `--color-secondary`              | `var(--secondary)`              |
| `--color-secondary-foreground`   | `var(--secondary-foreground)`   |
| `--color-muted`                  | `var(--muted)`                  |
| `--color-muted-foreground`       | `var(--muted-foreground)`       |
| `--color-accent`                 | `var(--accent)`                 |
| `--color-accent-foreground`      | `var(--accent-foreground)`      |
| `--color-destructive`            | `var(--destructive)`            |
| `--color-destructive-foreground` | `var(--destructive-foreground)` |
| `--color-success`                | `var(--success)`                |
| `--color-success-foreground`     | `var(--success-foreground)`     |
| `--color-warning`                | `var(--warning)`                |
| `--color-warning-foreground`     | `var(--warning-foreground)`     |
| `--color-error`                  | `var(--error)`                  |
| `--color-error-foreground`       | `var(--error-foreground)`       |
| `--color-info`                   | `var(--info)`                   |
| `--color-info-foreground`        | `var(--info-foreground)`        |
| `--color-border`                 | `var(--border)`                 |
| `--color-input`                  | `var(--input)`                  |
| `--color-ring`                   | `var(--ring)`                   |
| `--color-chart-1`                | `var(--chart-1)`                |
| `--color-chart-2`                | `var(--chart-2)`                |
| `--color-chart-3`                | `var(--chart-3)`                |
| `--color-chart-4`                | `var(--chart-4)`                |
| `--color-chart-5`                | `var(--chart-5)`                |

### Radius mappings (`--radius-*`)

| Alias         | Source                      |
| ------------- | --------------------------- |
| `--radius-lg` | `var(--radius)`             |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
