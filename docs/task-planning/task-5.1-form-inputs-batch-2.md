# Task 5.1 - Form Inputs Batch 2

## Overview

Implement the second batch of form input components: DatePicker, DateRangePicker, SliderInput, SpinnerInput, ComboBox, and TextArea. These components should follow the established patterns from the first batch of form inputs and integrate seamlessly with React Hook Form and Zod validation.

## Definition of Done (DoD)

Unit + a11y tests (≥90% coverage) & Storybook stories demonstrate disabled/error variants.

## Task Breakdown

| Task Description                 | DoD                                                                                                                                                                                                                                 | Status   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **1. DatePicker Component**      | Component renders correctly, accepts date values, integrates with React Hook Form, has unit tests (≥90% coverage), Storybook story with disabled/error variants, passes axe-core a11y tests                                         | Open     |
| **2. DateRangePicker Component** | Component renders correctly, accepts start/end date values, validates date ranges, integrates with React Hook Form, has unit tests (≥90% coverage), Storybook story with disabled/error variants, passes axe-core a11y tests        | Open     |
| **3. SliderInput Component**     | Component renders correctly, accepts min/max/step values, integrates with React Hook Form, has unit tests (≥90% coverage), Storybook story with disabled/error variants, passes axe-core a11y tests                                 | Open     |
| **4. SpinnerInput Component**    | Component renders correctly, accepts numeric values with increment/decrement controls, integrates with React Hook Form, has unit tests (≥90% coverage), Storybook story with disabled/error variants, passes axe-core a11y tests    | Open     |
| **5. ComboBox Component**        | Component renders correctly, supports search/filter functionality, accepts options array, integrates with React Hook Form, has unit tests (≥90% coverage), Storybook story with disabled/error variants, passes axe-core a11y tests | Open     |
| **6. TextArea Component**        | Component renders correctly, supports multiline text input, accepts rows/cols props, integrates with React Hook Form, has unit tests (≥90% coverage), Storybook story with disabled/error variants, passes axe-core a11y tests      | Complete |
| **7. Update Component Exports**  | All new components are properly exported from barrel files (src/components/index.ts and src/index.ts)                                                                                                                               | Open     |
| **8. Integration Testing**       | All components work together in a comprehensive form example, form validation works correctly with Zod schemas                                                                                                                      | Open     |
| **9. Documentation Updates**     | Components are documented with proper JSDoc comments, Storybook stories include comprehensive documentation                                                                                                                         | Open     |
| **10. Final Testing & Coverage** | Overall test coverage is ≥90%, all axe-core a11y tests pass, no linting errors, build process completes successfully                                                                                                                | Open     |

## Technical Requirements

### Component Structure

- Follow the established pattern from existing form components (Button, TextInput, etc.)
- Place components in `src/components/primitives/[ComponentName]/`
- Each component should have:
  - `index.ts` (main component export)
  - `[ComponentName].tsx` (component implementation)
  - `[ComponentName].test.tsx` (unit tests)
  - `[ComponentName].stories.tsx` (Storybook stories)

### Integration Requirements

- All components must integrate with React Hook Form using `forwardRef`
- Support for Zod validation schemas
- Consistent error handling and display
- Support for disabled states
- Proper TypeScript typing

### Accessibility Requirements

- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### Testing Requirements

- Unit tests with Vitest
- Accessibility tests with axe-core
- Storybook interaction tests where applicable
- Test coverage ≥90%

## Dependencies

- React Hook Form (already installed)
- Zod (already installed)
- DaisyUI components as base (already configured)
- Tailwind CSS for styling (already configured)
- Date handling library (may need to install date-fns or similar for DatePicker components)

## Applicable Cursor Rules

### Component Implementation Rules (components)

The following mandatory rules from the `components` cursor rule must be followed:

#### Directory & File Layout

- **One component = one directory** inside `src/components/primitives/[ComponentName]/`
- Each directory must contain:
  - `index.ts` (re-export)
  - `<Component>.tsx` (main implementation)
  - `<Component>.stories.tsx` (Storybook stories)
  - `<Component>.test.tsx` (unit tests)

#### Styling & Theme Contract

- **Use utility classes only** inside ui-kit components
- **No inline colors** - always reference CSS variables like `bg-[hsl(var(--primary))]` or DaisyUI utilities
- Use `clsx` + `tailwind-merge` helper from `ui-kit/utils/classMerge.ts`
- Prefer semantic wrapper props over styling props (e.g., `intent="danger"` vs `className="bg-red-500"`)

#### Component Pattern

- Wrap Shadcn components where appropriate
- Create custom prop API instead of re-exporting Shadcn props directly
- Add `displayName` for devtools readability
- Use `forwardRef` for React Hook Form integration

#### Testing Requirements

- Unit tests with Vitest in `<Component>.test.tsx`
- Coverage target ≥90% per sprint requirements
- Accessibility tests with axe-core must pass

#### Storybook Requirements

- Each story must include Canvas demo and ArgsTable
- Add `parameters = { a11y: { disable: false } }` for accessibility testing

#### Export Requirements

- **No default exports** for components
- Add exports to `src/components/index.ts` and `src/index.ts` barrel files
- Each new component requires a Changeset file

#### PR Checklist (must be completed)

1. ✅ Component written under correct folder structure
2. ✅ Tailwind classes refer to CSS vars / DaisyUI tokens
3. ✅ Storybook stories with ArgsTable
4. ✅ Vitest unit test + axe-core pass
5. ✅ Added export to barrel files
6. ✅ Changeset file committed
7. ✅ PR passes lint, test, build in CI

## Notes

- Ensure consistency with existing form components in terms of styling and behavior
- Consider using shadcn/ui components as a base where appropriate
- Follow the established design token system
- Maintain compatibility with both light and dark themes
- All components must follow the mandatory cursor rules above
