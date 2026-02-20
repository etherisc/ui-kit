# Design Tokens Reference

All CSS variables are defined in `src/styles/globals.css`.
The ui-kit uses the **Shadcn Slate** base palette with a **blue-500 primary** override.

Tokens use raw HSL channels (e.g. `222.2 84% 4.9%`).
`tailwind.config.js` wraps them with `hsl()` for Tailwind utility classes.

## Compatibility

These tokens follow the standard [Shadcn/ui theming convention](https://ui.shadcn.com/docs/theming).
Community themes from tools like [tweakcn](https://tweakcn.com/) can be dropped in directly.

## Core Tokens

| Token                  | Light            | Dark             | Description     |
| ---------------------- | ---------------- | ---------------- | --------------- |
| `--background`         | `0 0% 100%`      | `222.2 84% 4.9%` | Page background |
| `--foreground`         | `222.2 84% 4.9%` | `210 40% 98%`    | Default text    |
| `--card`               | `0 0% 100%`      | `222.2 84% 4.9%` | Card surface    |
| `--card-foreground`    | `222.2 84% 4.9%` | `210 40% 98%`    | Card text       |
| `--popover`            | `0 0% 100%`      | `222.2 84% 4.9%` | Popover surface |
| `--popover-foreground` | `222.2 84% 4.9%` | `210 40% 98%`    | Popover text    |

## Brand Tokens

| Token                      | Light               | Dark                | Description                           |
| -------------------------- | ------------------- | ------------------- | ------------------------------------- |
| `--primary`                | `217.2 91.2% 59.8%` | `213.1 93.9% 67.8%` | Primary actions (blue-500 / blue-400) |
| `--primary-foreground`     | `0 0% 100%`         | `222.2 84% 4.9%`    | Text on primary                       |
| `--secondary`              | `210 40% 96.1%`     | `217.2 32.6% 17.5%` | Secondary surfaces                    |
| `--secondary-foreground`   | `222.2 47.4% 11.2%` | `210 40% 98%`       | Text on secondary                     |
| `--accent`                 | `210 40% 96.1%`     | `217.2 32.6% 17.5%` | Accent/highlight                      |
| `--accent-foreground`      | `222.2 47.4% 11.2%` | `210 40% 98%`       | Text on accent                        |
| `--muted`                  | `210 40% 96.1%`     | `217.2 32.6% 17.5%` | Muted backgrounds                     |
| `--muted-foreground`       | `215.4 16.3% 46.9%` | `215 20.2% 65.1%`   | Subdued text                          |
| `--destructive`            | `0 84.2% 60.2%`     | `0 62.8% 30.6%`     | Destructive actions                   |
| `--destructive-foreground` | `210 40% 98%`       | `210 40% 98%`       | Text on destructive                   |

## Status Tokens

| Token                  | Light               | Dark                | Description                       |
| ---------------------- | ------------------- | ------------------- | --------------------------------- |
| `--success`            | `142.1 76.2% 36.3%` | `142.1 70.6% 45.3%` | Success (green-600 / green-500)   |
| `--success-foreground` | `0 0% 100%`         | `0 0% 100%`         | Text on success                   |
| `--warning`            | `40.6 96.1% 40.4%`  | `47.9 95.8% 53.1%`  | Warning (yellow-600 / yellow-500) |
| `--warning-foreground` | `0 0% 100%`         | `0 0% 0%`           | Text on warning                   |
| `--error`              | `0 72.2% 50.6%`     | `0 84.2% 60.2%`     | Error (red-600 / red-500)         |
| `--error-foreground`   | `0 0% 100%`         | `0 0% 100%`         | Text on error                     |
| `--info`               | `217.2 91.2% 59.8%` | `213.1 93.9% 67.8%` | Info (matches primary)            |
| `--info-foreground`    | `0 0% 100%`         | `0 0% 100%`         | Text on info                      |

## UI Tokens

| Token      | Light               | Dark                | Description        |
| ---------- | ------------------- | ------------------- | ------------------ |
| `--border` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Border color       |
| `--input`  | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Input border       |
| `--ring`   | `217.2 91.2% 59.8%` | `224.3 76.3% 48%`   | Focus ring         |
| `--radius` | `0.5rem`            | `0.5rem`            | Border radius base |

## Chart Tokens

| Token       | Light         | Dark          |
| ----------- | ------------- | ------------- |
| `--chart-1` | `12 76% 61%`  | `220 70% 50%` |
| `--chart-2` | `173 58% 39%` | `160 60% 45%` |
| `--chart-3` | `197 37% 24%` | `30 80% 55%`  |
| `--chart-4` | `43 74% 66%`  | `280 65% 60%` |
| `--chart-5` | `27 87% 67%`  | `340 75% 55%` |

## Shadow Tokens

| Token               | Light        | Dark         | Description               |
| ------------------- | ------------ | ------------ | ------------------------- |
| `--shadow-color`    | `220 3% 15%` | `220 40% 2%` | Shadow base color         |
| `--shadow-strength` | `1%`         | `4%`         | Shadow opacity multiplier |
| `--shadow-sm`       | —            | —            | Small shadow              |
| `--shadow`          | —            | —            | Default shadow            |
| `--shadow-md`       | —            | —            | Medium shadow             |
| `--shadow-lg`       | —            | —            | Large shadow              |
