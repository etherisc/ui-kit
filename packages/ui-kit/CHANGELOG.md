# @etherisc/ui-kit

## 0.2.0

### Patch Changes

- fix: ensure Select component is properly exported with TypeScript declarations

  The Select component was implemented but not being exported due to a build configuration issue where TypeScript declarations weren't being generated properly. This fix updates the build script to ensure all component declarations are generated and exported correctly.

  Fixes #39

## 0.1.0

### Minor Changes

- aa1bd25: Add DatePicker component with React Hook Form integration

  - Implements DatePicker component with calendar dropdown
  - Built on React DayPicker v9 and date-fns for robust date handling
  - Supports date constraints (min/max dates, disabled dates)
  - Includes comprehensive accessibility features (ARIA labels, keyboard navigation)
  - Provides size variants (sm, md, lg) and error states
  - Full React Hook Form integration with forwardRef
  - Comprehensive test coverage (23 tests) and Storybook documentation
  - Follows established component patterns and design system

- aa1bd25: Add DateRangePicker component with React Hook Form integration

  - Implements DateRangePicker component with dual calendar view for date range selection
  - Built on React DayPicker v9 and date-fns for robust date handling
  - Supports date constraints (min/max dates, disabled dates, max range validation)
  - Includes comprehensive accessibility features (ARIA labels, keyboard navigation)
  - Provides size variants (sm, md, lg) and error states
  - Full React Hook Form integration with forwardRef
  - Comprehensive test coverage (25 tests) and Storybook documentation
  - Follows established component patterns and design system

### Patch Changes

- aa1bd25: Add ComboBox component with search functionality, React Hook Form integration, and accessibility features
- aa1bd25: Add SliderInput component with React Hook Form integration, size variants, value formatting, and accessibility features
- aa1bd25: Add SpinnerInput component with increment/decrement controls, React Hook Form integration, precision formatting, and accessibility features
- aa1bd25: Add TextArea component with React Hook Form integration, size variants, and accessibility features

## 0.2.0-beta

### Minor Changes

- First beta release of the UI Kit library

  This release includes:

  - **Form Components**: Button, TextInput, NumberInput, Select, Checkbox, RadioGroup with full TypeScript support
  - **Layout Components**: AuthShell, MainLayout with responsive navigation and breadcrumbs
  - **Data Components**: DataTable with pagination, sorting, and filtering capabilities
  - **Feedback Components**: Toast system, StatusBadge, and ErrorBoundary with Sentry integration
  - **Security Features**: MarkdownEditor with XSS protection via DOMPurify
  - **Theming**: Tailwind CSS + DaisyUI integration with light/dark mode support
  - **Internationalization**: i18next integration with English and German locales
  - **Testing**: Comprehensive unit tests and accessibility testing with axe-core
  - **Documentation**: Interactive Storybook with live examples and API documentation
  - **Performance**: Bundle size monitoring (< 250KB gzipped)
  - **Error Handling**: Structured logging with tslog and Sentry error reporting

  This is a beta release - APIs may change before the stable 1.0 release.

## 0.0.1

### Patch Changes

- test changeset

## 0.1.0 (UNRELEASED)

### Features

- Added `AppShell` layout component with TopBar, SideNav, and ContentWrapper
- Added `MinimalShell` for error pages and standalone screens
- Added `WizardShell` for multi-step forms and wizards
- Added responsive behavior for all layout components
- Added Breadcrumbs component for navigation
- Added unit tests and Storybook stories for all components
- Added Playwright visual tests

### Bug Fixes

- Fixed SideNav component to properly handle collapse state
- Fixed ContentWrapper to properly handle fixed width content
