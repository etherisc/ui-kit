# CSS Architecture & Cascade Documentation

## Overview

The ui-kit uses a **three-layer CSS architecture** that provides bulletproof theming with
multiple fallback levels. This document explains how the stylesheets interact and how to avoid conflicts.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CSS CASCADE FLOW                        │
├─────────────────────────────────────────────────────────────┤
│ 1. DaisyUI Variables   → --p, --b1, --bc (Source Tokens)   │
│ 2. theme.css           → Dynamic Bridge with Fallbacks     │
│ 3. globals.css         → Tailwind + Hardcoded Fallbacks    │
│ 4. Tailwind Classes    → border, bg-background             │
│ 5. Components          → Consistent Theme Variables         │
└─────────────────────────────────────────────────────────────┘
```

## 📁 File Structure & Responsibilities

### `src/theme/theme.css` - Dynamic Bridge

**Role**: Maps DaisyUI design tokens to Shadcn variables with fallbacks

**Contains**:

- ✅ Dynamic variable mappings: `--border: hsl(var(--b2, 0 0% 90%))`
- ✅ Light/dark mode selectors: `:root` and `.dark`
- ✅ Semantic Shadcn naming: `--primary`, `--background`, `--border`

**Does NOT Contain**:

- ❌ Tailwind directives (`@tailwind`, `@apply`)
- ❌ Base element styles (`*`, `body`)
- ❌ Hardcoded final fallbacks

### `src/styles/globals.css` - Foundation & Safety Net

**Role**: Tailwind setup and hardcoded fallback values

**Contains**:

- ✅ Tailwind imports: `@tailwind base`, `@components`, `@utilities`
- ✅ theme.css import: `@import "../theme/theme.css"`
- ✅ Hardcoded fallbacks in `@layer base`
- ✅ Base element styles and utilities

**Does NOT Contain**:

- ❌ DaisyUI variable mappings
- ❌ Dynamic `var()` fallbacks
- ❌ Component-specific styles

## 🔄 CSS Cascade Flow

### 1. Normal Operation (DaisyUI Present)

```css
/* DaisyUI provides tokens */
:root {
  --b2: 210 40% 90%;
}

/* theme.css maps with fallback */
:root {
  --border: hsl(var(--b2, 0 0% 90%));
}
/* Result: --border = hsl(210 40% 90%) */

/* globals.css @layer base defines static fallback */
@layer base {
  :root {
    --border: 0 0% 89.8%;
  }
}
/* Not used because theme.css already defined it */

/* Component uses theme variable */
.border {
  border-color: hsl(var(--border));
}
/* Result: hsl(210 40% 90%) - themed color! */
```

### 2. Fallback Operation (DaisyUI Missing)

```css
/* DaisyUI tokens missing */
/* :root { --b2: undefined; } */

/* theme.css fallback activates */
:root {
  --border: hsl(var(--b2, 0 0% 90%));
}
/* Result: --border = hsl(0 0% 90%) */

/* globals.css @layer base still available as backup */
@layer base {
  :root {
    --border: 0 0% 89.8%;
  }
}
/* Not needed because theme.css fallback worked */

/* Component gets fallback color */
.border {
  border-color: hsl(var(--border));
}
/* Result: hsl(0 0% 90%) - fallback color! */
```

### 3. Emergency Fallback (theme.css Import Fails)

```css
/* theme.css import fails completely */
/* @import "../theme/theme.css"; ← FAILED */

/* Only globals.css fallbacks remain */
@layer base {
  :root {
    --border: 0 0% 89.8%;
  }
}
/* Result: --border = 0 0% 89.8% */

/* Component gets emergency fallback */
.border {
  border-color: hsl(var(--border));
}
/* Result: hsl(0 0% 89.8%) - emergency fallback! */
```

## 🎯 Variable Naming Strategy

### DaisyUI Source Tokens (Input)

```css
--p     /* Primary color */
--b1    /* Background level 1 */
--b2    /* Background level 2 */
--bc    /* Base content (text) */
```

### Shadcn Semantic Variables (Output)

```css
--primary       /* Mapped from --p */
--background    /* Mapped from --b1 */
--border        /* Mapped from --b2 */
--foreground    /* Mapped from --bc */
```

### Component Usage

```css
/* ✅ Use semantic names in components */
.card {
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
}

/* ❌ Never use DaisyUI tokens directly */
.card {
  background: hsl(var(--b1)); /* NO! */
}
```

## ⚠️ Conflict Prevention Rules

### Import Order (CRITICAL)

```css
/* globals.css - NEVER change this order! */
@import "../theme/theme.css"; /* ← MUST BE FIRST */
@tailwind base; /* ← Static fallbacks */
@tailwind components;
@tailwind utilities;
```

### Variable Definition Rules

#### theme.css - Dynamic Variables Only

```css
/* ✅ Correct: Dynamic with fallback */
--border: hsl(var(--b2, 0 0% 90%));

/* ❌ Wrong: Hardcoded value */
--border: 0 0% 90%;

/* ❌ Wrong: No fallback */
--border: hsl(var(--b2));
```

#### globals.css - Static Variables Only

```css
/* ✅ Correct: Hardcoded in @layer base */
@layer base {
  :root {
    --border: 0 0% 89.8%;
  }
}

/* ❌ Wrong: Dynamic fallback */
@layer base {
  :root {
    --border: hsl(var(--b2, 0 0% 90%));
  }
}
```

### Layer Usage Rules

```css
/* ✅ theme.css: NO @layer directives */
:root {
  --border: hsl(var(--b2, 0 0% 90%));
}

/* ✅ globals.css: Use @layer base for static fallbacks */
@layer base {
  :root {
    --border: 0 0% 89.8%;
  }
}
```

## 🧪 Testing Strategy

### 1. Test With DaisyUI

```css
/* Simulate DaisyUI present */
:root {
  --b2: 210 40% 85%;
}
/* Expected: Components use themed color */
```

### 2. Test Without DaisyUI

```css
/* Comment out DaisyUI or remove it */
/* :root { --b2: 210 40% 85%; } */
/* Expected: Components use theme.css fallbacks */
```

### 3. Test Without theme.css

```css
/* Comment out theme import */
/* @import "../theme/theme.css"; */
/* Expected: Components use globals.css fallbacks */
```

### 4. Visual Tests

- **Light mode**: Backgrounds should be bright (90%+ lightness)
- **Dark mode**: Backgrounds should be dark (15%- lightness)
- **Borders**: Should NEVER be black (`hsl()` = black)
- **Text**: Should have sufficient contrast

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Black Borders

**Cause**: Missing fallback in variable definition

```css
/* ❌ Problematic */
--border: hsl(var(--b2)); /* → hsl() = black when --b2 missing */

/* ✅ Solution */
--border: hsl(var(--b2, 0 0% 90%)); /* → fallback prevents black */
```

### Pitfall 2: Variable Conflicts

**Cause**: Defining same variable in multiple places with different values

```css
/* ❌ Problematic */
/* theme.css */
--border: hsl(var(--b2, 0 0% 90%));

/* globals.css (not in @layer) */
--border: 0 0% 85%; /* Conflicts! */

/* ✅ Solution */
/* theme.css */
--border: hsl(var(--b2, 0 0% 90%));

/* globals.css (in @layer base) */
@layer base {
  --border: 0 0% 89.8%; /* Lower specificity */
}
```

### Pitfall 3: Import Order Issues

**Cause**: Wrong import order breaks cascade

```css
/* ❌ Problematic */
@tailwind base;
@import "../theme/theme.css"; /* Too late! */

/* ✅ Solution */
@import "../theme/theme.css"; /* First! */
@tailwind base;
```

## 🔍 Debugging CSS Variables

### Browser DevTools

1. **Inspect Element** → Computed Styles
2. Look for CSS variable values
3. Check if they resolve to expected colors
4. Use `hsl()` = black as indicator of missing fallbacks

### CSS Custom Property Trace

```css
/* Add temporary debugging */
.debug-border {
  border: 10px solid var(--border);
  background: var(--background);
  color: var(--foreground);
}
```

### Console Commands

```javascript
// Check variable values
getComputedStyle(document.documentElement).getPropertyValue("--border");

// Check if DaisyUI variables exist
getComputedStyle(document.documentElement).getPropertyValue("--b2");
```

## 📋 Maintenance Checklist

When modifying CSS architecture:

- [ ] ✅ Maintain import order in globals.css
- [ ] ✅ All theme.css variables have fallbacks
- [ ] ✅ globals.css uses @layer base for static fallbacks
- [ ] ✅ No DaisyUI tokens used directly in components
- [ ] ✅ Test with/without DaisyUI loaded
- [ ] ✅ Test light/dark mode switching
- [ ] ✅ No black borders in any scenario
- [ ] ✅ Variable naming follows Shadcn conventions
- [ ] ✅ Documentation updated for new variables

---

**Remember**: The goal is **bulletproof theming** where borders are never black and components always look good, regardless of whether DaisyUI is loaded or theme switching works perfectly.
