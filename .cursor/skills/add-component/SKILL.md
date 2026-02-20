---
name: add-component
description: Add a new UI component to the ui-kit package following project conventions. Use when creating a new component, wrapping a Shadcn primitive, or adding a feedback/layout/form component.
---

# Add Component to UI Kit

## Directory Structure

Create under `packages/ui-kit/src/components/<category>/<ComponentName>/`:

```
ComponentName/
├── index.ts              # Re-exports
├── ComponentName.tsx     # Implementation
├── ComponentName.test.tsx # Tests
└── ComponentName.stories.tsx # (optional) Storybook story
```

Categories: `primitives`, `form`, `feedback`, `data-display`, `layout`, `ui`, `brand`.

## Implementation Checklist

1. **Create component file** (`ComponentName.tsx`):

   - Named export only (no default exports)
   - Export prop interface with JSDoc
   - Use `cn()` from `../../../lib/utils` for class merging
   - Use Shadcn CSS variables (e.g. `bg-primary`, `text-foreground`) -- never hardcoded colors
   - Wrap Shadcn primitives from `../../ui/` when applicable

2. **Create barrel export** (`index.ts`):

   ```typescript
   export { ComponentName } from "./ComponentName";
   export type { ComponentNameProps } from "./ComponentName";
   ```

3. **Register in parent barrel** -- add `export * from './ComponentName';` to the category's `index.ts`

4. **Write tests** (`ComponentName.test.tsx`):

   - Render test, prop tests, accessibility check with axe-core if applicable
   - Use `vitest` + `@testing-library/react`

5. **Verify**: Run `pnpm lint && pnpm test && pnpm build` from workspace root

## Key Conventions

- No `import React from 'react'` -- use `import * as React from 'react'` only if needed
- Colors via CSS variables only: `bg-background`, `text-muted-foreground`, `border-input`
- No DaisyUI classes -- this project uses Shadcn-native theming
- Tailwind classes only inside ui-kit, never exposed via public API
