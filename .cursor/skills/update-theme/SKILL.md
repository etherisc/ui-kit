---
name: update-theme
description: Update the design token theme or apply a community Shadcn theme. Use when changing colors, adding CSS variables, applying a tweakcn theme, or modifying light/dark mode tokens.
---

# Update Theme

## Architecture

Single source of truth: `packages/ui-kit/src/styles/globals.css`

- `:root` block = light mode tokens
- `.dark` block = dark mode tokens
- CSS variables use raw HSL channels: `--primary: 217.2 91.2% 59.8%;`
- `tailwind.config.js` wraps them: `primary: "hsl(var(--primary))"`

## Applying a Community Theme (e.g. from tweakcn.com)

1. Export the theme in **HSL** format (Tailwind v3 mode)
2. Replace the `:root` and `.dark` variable blocks in `globals.css`
3. Keep custom tokens that aren't in standard Shadcn: `--success`, `--warning`, `--error`, `--info`, `--shadow-*`, `--chart-*`
4. Update `TOKENS.md` if values changed

## Adding a New Token

1. Add the variable to both `:root` and `.dark` in `globals.css`
2. Add the Tailwind mapping in `tailwind.config.js` under `theme.extend.colors`
3. Document in `packages/ui-kit/src/theme/TOKENS.md`
4. Run `pnpm build` to verify

## Standard Token Names

Core: `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`

Status: `--success`, `--warning`, `--error`, `--info` (each with `-foreground`)

UI: `--border`, `--input`, `--ring`, `--radius`

All foreground tokens follow pattern: `--<name>-foreground`

## Dark Mode

Dark mode uses `class="dark"` on `<html>`. The `useTheme` hook in `src/hooks/useTheme.ts` handles toggling. Never use `data-theme` attributes.
