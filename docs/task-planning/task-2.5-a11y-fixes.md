# Task 2.5 - Accessibility Fixes

## Overview

Based on the accessibility test results, we need to address several accessibility issues in our components to make the UI-Kit fully accessible. The goal is to ensure that all components pass the accessibility tests and the CI pipeline can run without errors.

## Issues Identified

From the test results, we have identified the following main accessibility issues:

1. **Checkbox Component**: All checkbox variants have `button-name` violations - Critical

   - Issue: Buttons (checkbox role) do not have discernible text
   - Components affected: All checkbox variants
   - Status: FIXED ✅ - Added proper aria-label attributes and ID associations

2. **Select Component**: Select trigger has `button-name` violations - Critical

   - Issue: Buttons (combobox role) do not have discernible text
   - Components affected: All select variants
   - Status: FIXED ✅ - Added proper aria-label attributes and ID associations

3. **RadioGroup Component**: Radio buttons have `button-name` violations - Critical

   - Issue: Buttons (radio role) do not have discernible text
   - Components affected: All radio group variants
   - Status: FIXED ✅ - Added proper aria-label attributes and ID associations

4. **ThemeToggle Component**: React maximum update depth exceeded errors

   - Issue: Infinite rendering loop in the ThemeToggle stories
   - Components affected: ThemeToggle and ThemeProvider stories
   - Status: FIXED ✅ - Created mock hook for testing and dependency injection

5. **Example Pages**: Color contrast issues - Serious
   - Issue: Insufficient contrast between foreground and background colors
   - Components affected: Example/Page stories

## Tasks

| Task Description                           | DoD (Definition of Done)                                                       | Status      |
| ------------------------------------------ | ------------------------------------------------------------------------------ | ----------- |
| Fix Checkbox button-name violations        | Checkbox component passes accessibility tests with no button-name violations   | Complete ✅ |
| Fix Select button-name violations          | Select component passes accessibility tests with no button-name violations     | Complete ✅ |
| Fix RadioGroup button-name violations      | RadioGroup component passes accessibility tests with no button-name violations | Complete ✅ |
| Fix ThemeToggle infinite update loop       | ThemeToggle stories render without errors                                      | Complete ✅ |
| Fix color contrast issues in example pages | Example pages pass contrast testing                                            | Open        |
| Verify all fixes with test-storybook:ci    | All tests pass with no accessibility violations                                | Open        |

## Implementation Plan

### 1. ✅ Fix Checkbox Component

The checkbox component needed proper accessible names. This was achieved by:

- Adding appropriate aria-label attributes for checkboxes without visible text labels
- Ensuring ID association between checkboxes and their labels using React.useId()
- Properly associating description and error text with the checkboxes

### 2. ✅ Fix Select Component

The Select component needed proper accessible names. This was achieved by:

- Adding appropriate aria-label attributes for the select trigger when no label is present
- Ensuring ID association between select triggers and their labels using React.useId()
- Properly connecting description and error messages using aria-describedby

### 3. ✅ Fix RadioGroup Component

The RadioGroup component needed proper accessible names. This was achieved by:

- Adding unique IDs for each radio button option using generatedId + option value
- Creating proper label associations using htmlFor/id pairs
- Adding aria-label to each RadioGroupItem for screen readers
- Properly connecting the group label, description and error messages using aria-labelledby and aria-describedby

### 4. ✅ Fix ThemeToggle Component

The ThemeToggle component's stories had infinite update loops that were addressed by:

- Creating a mock useTheme hook (useThemeMock) with stable state management
- Making the ThemeToggle component accept an optional useThemeHook prop for dependency injection
- Updating stories to use the mock hook instead of the real one
- Breaking circular dependencies between story rendering and theme state updates

### 5. Fix Color Contrast Issues

For the example page components with contrast issues:

- Update the color palette to meet WCAG 2.1 AA contrast requirements (minimum 4.5:1 for normal text)
- Replace problematic color combinations
- Exclude example components from test if they are intentionally showing poor practices

## Testing Methodology

We've created a script to test individual components for accessibility:

- `pnpm test:component "ComponentName"` - Tests a specific component for accessibility violations
- This script starts Storybook if not already running and runs axe-core tests on the specified stories

## Conclusion

We've made excellent progress fixing the accessibility issues, with the Checkbox, Select, RadioGroup, and ThemeToggle components now passing all tests. We'll continue addressing the remaining components to ensure the entire UI-Kit meets accessibility standards.
