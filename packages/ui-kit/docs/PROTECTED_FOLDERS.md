# Protected Folders Guide

This document outlines strategies to protect certain folders in the codebase from unintentional modifications, particularly third-party components like those from shadcn.

## Why Protect Folders?

There are certain directories in our codebase that should rarely or never be modified directly:

- Third-party components (e.g., `src/components/ui/` from shadcn)
- Generated code
- Core utilities that require careful consideration before changes

Accidental modifications to these can cause:

- Breaking changes
- Upgrade difficulties
- Unexpected regressions
- Accessibility issues

## Methods to Protect Folders

### 1. Git Attributes

You can use Git attributes to mark files as "do not modify" using the `export-ignore` attribute:

```bash
# In .gitattributes file
src/components/ui/* export-ignore
```

This doesn't prevent changes, but signals that these files should be treated specially.

### 2. ESLint Rules

Create custom ESLint rules that prevent modifications to specific directories:

```javascript
// In eslint.config.js
module.exports = {
  // ... other config
  rules: {
    "no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "src/components/ui",
            message:
              "⚠️ This directory contains shadcn components that should not be modified directly. Create wrapper components instead.",
          },
        ],
      },
    ],
  },
};
```

### 3. Git Hooks

Use pre-commit hooks to prevent commits that modify protected files:

```bash
#!/bin/sh
# In .husky/pre-commit

# Check if any shadcn components are being modified
if git diff --cached --name-only | grep -E "^src/components/ui/"; then
  echo "⛔ You're trying to modify shadcn components, which should not be changed directly."
  echo "🛠️ Create wrapper components instead or use the shadcn CLI to update components."
  exit 1
fi
```

### 4. Documentation & Naming Conventions

- Add README files in protected directories
- Use naming conventions that signal "do not modify" (e.g., `vendors/`, `third-party/`)
- Add comments at the top of files

```typescript
/**
 * ⚠️ DO NOT MODIFY DIRECTLY ⚠️
 *
 * This is a shadcn component. If changes are needed, use the shadcn CLI:
 * npx shadcn@latest add <component> --overwrite
 *
 * For custom functionality, create a wrapper component instead.
 */
```

### 5. Continuous Integration Checks

Add CI checks that fail if protected files are modified without proper approvals:

```yaml
# In GitHub workflow
- name: Check for unauthorized modifications
  run: |
    MODIFIED_PROTECTED=$(git diff --name-only origin/main | grep -E "^src/components/ui/")
    if [ -n "$MODIFIED_PROTECTED" ]; then
      echo "Protected files have been modified:"
      echo "$MODIFIED_PROTECTED"
      exit 1
    fi
```

## Best Practices for Working with Protected Components

1. **Use Composition**: Create wrapper components that add functionality rather than modifying base components.

2. **Use the CLI for Updates**: For shadcn components, always use the CLI to update:

   ```bash
   npx shadcn@latest add <component> --overwrite
   ```

3. **Document Extensions**: When extending functionality, document why and how you're extending it.

4. **Accessibility**: Ensure all extensions maintain or improve accessibility.

## Example: Extending vs. Modifying

### ❌ Don't modify directly:

```tsx
// Modifying shadcn's checkbox.tsx directly
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { "aria-label"?: string }
>((props, ref) => (/* ... */));
```

### ✅ Create wrapper components or use with proper patterns:

```tsx
// In your own component
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

## Update Process for Protected Components

If you absolutely need to update protected components, follow these steps:

1. Create an issue describing why the update is necessary
2. Get approval from the tech lead
3. Make the changes following the approved process (e.g., using the shadcn CLI)
4. Document the changes thoroughly
5. Add tests to verify functionality hasn't been broken
