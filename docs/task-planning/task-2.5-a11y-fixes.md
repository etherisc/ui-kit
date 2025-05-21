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
   - Status: FIXED ✅ - Improved contrast for links, SVG elements, and tip component

## Tasks

| Task Description                           | DoD (Definition of Done)                                                       | Status      |
| ------------------------------------------ | ------------------------------------------------------------------------------ | ----------- |
| Fix Checkbox button-name violations        | Checkbox component passes accessibility tests with no button-name violations   | Complete ✅ |
| Fix Select button-name violations          | Select component passes accessibility tests with no button-name violations     | Complete ✅ |
| Fix RadioGroup button-name violations      | RadioGroup component passes accessibility tests with no button-name violations | Complete ✅ |
| Fix ThemeToggle infinite update loop       | ThemeToggle stories render without errors                                      | Complete ✅ |
| Fix ThemeProvider infinite update loop     | ThemeProvider stories render without errors                                    | Complete ✅ |
| Fix color contrast issues in example pages | Example pages pass contrast testing                                            | Complete ✅ |
| Verify all fixes with test-storybook:ci    | All tests pass with no accessibility violations                                | Complete ✅ |

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

### 5. ✅ Fix ThemeProvider Component

The ThemeProvider's stories also had infinite update loops, which we fixed by:

- Extending the ThemeProvider component to accept an optional useThemeHook prop
- Using the useThemeMock hook in stories to avoid infinite updates
- Ensuring both ThemeProvider and ThemeToggle components in the stories use the same mock hook instance
- Restructuring stories to use the render function instead of args.children

### 6. ✅ Fix Color Contrast Issues

We've fixed the color contrast issues in example pages by:

- Improving contrast of links by using a darker blue (#0a6bb8 instead of #1ea7fd)
- Adding a high-contrast class for strong text with darker blue (#085394) and higher font-weight (800)
- Enhancing the tip component's contrast with a darker green text (#2e7a1a) on light background
- Darkening the SVG icon color from #999 to #666 for better visibility
- All example pages now pass accessibility contrast testing

## Testing Methodology

We've created a script to test individual components for accessibility:

- `pnpm test:component "ComponentName"` - Tests a specific component for accessibility violations
- This script starts Storybook if not already running and runs axe-core tests on the specified stories

## Conclusion

We've successfully fixed all the identified accessibility issues:

1. Added proper aria-labels and ID associations to form controls
2. Fixed infinite update loops in ThemeToggle and ThemeProvider components
3. Improved color contrast in example pages for better readability

All components now pass their individual accessibility tests, making the UI-Kit more inclusive and accessible to all users.
