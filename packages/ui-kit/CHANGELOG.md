# @org/ui-kit

## 0.2.0

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
