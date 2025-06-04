# Accessibility Testing Backlog

This document tracks accessibility violations that have been temporarily disabled to unblock the development workflow. These should be addressed systematically in future iterations.

## Temporarily Disabled Components

The following components have accessibility violations that need to be fixed:

### 🔴 Critical Priority (Multiple Violations)

| Component       | Stories  | Violation Count | Primary Issues                             | Status   |
| --------------- | -------- | --------------- | ------------------------------------------ | -------- |
| **Sidebar**     | Multiple | 2-3 violations  | Button accessible names, color contrast    | Disabled |
| **Collapsible** | Multiple | 1-3 violations  | Color contrast (opacity-50), heading order | Disabled |

### 🟡 Medium Priority (Single Violations)

| Component      | Stories           | Violation Count | Primary Issues                         | Status   |
| -------------- | ----------------- | --------------- | -------------------------------------- | -------- |
| **ScrollArea** | All stories       | 1 violation     | Button accessible names or roles       | Disabled |
| **InputOTP**   | All stories       | 1 violation     | Input labeling or grouping             | Disabled |
| **Sonner**     | Some stories      | 1 violation     | Toast announcements or roles           | Disabled |
| **Pagination** | All stories       | 1 violation     | Button accessible names                | Disabled |
| **Typography** | ResponsiveExample | 1 violation     | Heading hierarchy (h3 without h2)      | Fixed ✅ |
| **Switch**     | All stories       | 1 violation     | Input labeling or accessible names     | Disabled |
| **Table**      | WithSelection     | 1 violation     | Button accessible names (icon buttons) | Disabled |

## Common Issues Patterns

### 1. **Missing Accessible Names**

- **Issue**: Buttons with only icons, no text or aria-label
- **Solution**: Add `aria-label` attributes to describe button actions
- **Components**: Table, Sidebar, ScrollArea, Pagination

### 2. **Color Contrast Issues**

- **Issue**: Elements with insufficient color contrast (< 4.5:1 ratio)
- **Solution**: Adjust muted-foreground colors or avoid opacity overlays
- **Components**: Collapsible (opacity-50), potentially others

### 3. **Form Input Labeling**

- **Issue**: Form controls without proper labels or descriptions
- **Solution**: Add `aria-label`, `aria-labelledby`, or associated `<label>` elements
- **Components**: InputOTP, Switch

### 4. **Heading Hierarchy**

- **Issue**: Skipping heading levels (h1 → h3 without h2)
- **Solution**: Ensure proper heading progression
- **Components**: Typography (Fixed ✅)

## Implementation Strategy

### Phase 1: Quick Wins (Estimated: 2-4 hours)

1. Add missing `aria-label` attributes to icon-only buttons
2. Fix heading hierarchy issues
3. Add proper labels to form controls

### Phase 2: Color & Contrast (Estimated: 1-2 hours)

1. Audit and fix color contrast ratios
2. Replace opacity-based disabled states with proper color tokens
3. Test contrast across light/dark themes

### Phase 3: Complex Components (Estimated: 4-6 hours)

1. Sidebar component comprehensive audit
2. ScrollArea proper ARIA roles and announcements
3. Sonner toast accessibility improvements

## Testing Commands

```bash
# Test all accessibility
pnpm run test:a11y

# Test specific component
pnpm run test:a11y -- --testNamePattern="ComponentName"

# Generate detailed violation report
pnpm run test:a11y --verbose
```

## Success Criteria

- [ ] All components pass WCAG 2.1 AA standards
- [ ] 0 critical or serious accessibility violations
- [ ] All interactive elements have accessible names
- [ ] Proper color contrast ratios (≥4.5:1 for normal text)
- [ ] Logical heading hierarchy throughout
- [ ] Form controls properly labeled
- [ ] Toast announcements work with screen readers

---

**Last Updated**: 2025-01-04  
**Total Components**: 9 disabled, 1 fixed  
**Estimated Work**: 8-12 hours total
