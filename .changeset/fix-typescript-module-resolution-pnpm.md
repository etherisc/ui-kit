---
"@etherisc/ui-kit": patch
---

**CRITICAL FIX: Resolve TypeScript Module Resolution Issue with Radix UI Dependencies in pnpm Projects**

## Problem Fixed (Issue #46)

Fixed **HIGH priority** TypeScript compilation failures for pnpm users due to module resolution issues with externalized Radix UI dependencies.

### Root Cause

- pnpm's symlink structure + TypeScript module resolution = broken Radix UI dependency resolution
- TypeScript declarations contained external imports like `import * as SelectPrimitive from '@radix-ui/react-select'`
- pnpm couldn't resolve these imports due to its cache-based symlink structure
- This broke TypeScript compilation for **all** pnpm users

### Solution Applied

**Moved all Radix UI packages to peer dependencies** to ensure proper module resolution:

```json
{
  "peerDependencies": {
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7"
    // ... all Radix UI packages
  },
  "peerDependenciesMeta": {
    // All marked as optional for tree-shaking
  }
}
```

### Impact

✅ **pnpm projects can now use TypeScript compilation**  
✅ **All package managers (npm, yarn, pnpm) supported**  
✅ **Zero breaking changes** - runtime functionality unchanged  
✅ **Proper dependency tree** - consumers install Radix UI directly  
✅ **Better tree-shaking** - only used components included

### Migration Required

Users will need to install Radix UI peer dependencies:

```bash
pnpm add @radix-ui/react-select @radix-ui/react-checkbox
# Or let pnpm auto-install peer deps
```

This ensures that TypeScript can resolve all module imports correctly in pnpm projects.
