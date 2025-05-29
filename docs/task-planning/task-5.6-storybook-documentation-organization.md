# Task 5.6: Update documentation index & Storybook sidebar grouping

## Overview

Organize and improve the Storybook documentation structure by implementing proper sidebar grouping, creating documentation indexes, and ensuring all components appear in logical categories.

## Current State Analysis

### Current Storybook Structure Issues

1. **Inconsistent grouping**: Some stories use different title patterns
2. **Missing organization**: No clear hierarchy for complex components
3. **Legacy stories**: Old stories from `/stories` folder mixed with new component stories
4. **Documentation scattered**: MDX files exist but aren't properly indexed

### Audit Results - Current Story Title Patterns Found

**Inconsistent Patterns Identified:**

- `Primitives/*` (Button, ComboBox, CodeEditor, etc.)
- `Components/Form/*` (Checkbox, NumberInput, RadioGroup, Select)
- `Components/Primitives/*` (DatePicker, DateRangePicker, ThemeToggle)
- `Components/Feedback/*` (StatusBadge, Toast)
- `Components/TextInput` (no category)
- `Layout/*` (AuthShell, DataDenseLayout, etc.)
- `Layout/AppShell/*` (AppShell, ContentWrapper, SideNav, TopBar)
- `Brand/*` (EtheriscLogo)
- `Data Display/*` (DataTable)
- `Form/*` (FormExample, AccessibleExamples)
- `Examples/*` (A11yButton, FormExample)
- `Providers/*` (ErrorBoundary, ThemeProvider)
- `Example/*` (Legacy stories: Button, Header, Page)

**Problems:**

- 13 different top-level categories with inconsistent naming
- Same component types scattered across different categories
- Form components split between "Components/Form", "Primitives", and "Form"
- Legacy stories using "Example/" instead of "Examples/"
- AppShell components nested under "Layout/AppShell" while others are flat

## Tasks

| Task Description                           | DoD                                                                           | Status   |
| ------------------------------------------ | ----------------------------------------------------------------------------- | -------- |
| 1. Audit current story organization        | Complete inventory of all story files and their current titles                | Complete |
| 2. Define new Storybook grouping structure | Create standardized story title hierarchy and document conventions            | Complete |
| 3. Update all story titles for consistency | All stories follow new standardized title structure                           | Complete |
| 4. Create Welcome/Introduction page        | Replace default Welcome.mdx with comprehensive UI-Kit introduction            | Complete |
| 5. Create Documentation index pages        | Add index MDX pages for each major category (Primitives, Layout, etc.)        | Complete |
| 6. Configure Storybook sidebar ordering    | Implement custom sidebar ordering in .storybook configuration                 | Complete |
| 7. Clean up legacy stories                 | Remove or migrate legacy stories from /stories folder                         | Complete |
| 8. Add component group documentation       | Create overview documentation for each component category                     | Complete |
| 9. Verify build and organization           | Ensure `pnpm run build-storybook` completes and sidebar is properly organized | Complete |
| 10. Add missing component stories          | Ensure all UI-Kit components have proper stories with correct grouping        | Complete |

## Proposed Storybook Organization Structure

**New Standardized Title Hierarchy:**

```
📚 Welcome
├── Getting Started

🧱 Form Controls
├── Button
├── TextInput
├── NumberInput
├── TextArea
├── Select
├── ComboBox
├── Checkbox
├── RadioGroup
├── SliderInput
├── SpinnerInput
├── DatePicker
└── DateRangePicker

✏️ Editors
├── CodeEditor
└── MarkdownEditor

🏗️ Layout
├── Shells
│   ├── AuthShell
│   ├── AppShell
│   ├── WizardShell
│   ├── MinimalShell
│   └── ErrorShell
├── Content Layouts
│   ├── MainFixedLayout
│   ├── DataDenseLayout
│   └── ContentWrapper
└── Navigation
    ├── TopBar
    ├── SideNav
    ├── NavItem
    ├── Breadcrumbs
    └── HeaderActionIcon

🎨 Feedback
├── Toast
└── StatusBadge

📊 Data Display
└── DataTable

🔧 Form Components
├── Form Examples
├── FormGrid
├── FormGroup
└── A11y Examples

🛡️ Providers
├── ErrorBoundary
├── ThemeProvider
└── ThemeToggle

🎯 Brand
├── Logo
└── EtheriscLogo

📝 Examples
└── Component Gallery
```

**Title Mapping (Old → New):**

- `Primitives/Button` → `Form Controls/Button`
- `Components/Form/Checkbox` → `Form Controls/Checkbox`
- `Components/Primitives/DatePicker` → `Form Controls/DatePicker`
- `Primitives/CodeEditor` → `Editors/CodeEditor`
- `Layout/AppShell/TopBar` → `Layout/Navigation/TopBar`
- `Components/Feedback/Toast` → `Feedback/Toast`
- `Components/Primitives/ThemeToggle` → `Providers/ThemeToggle`
- `Example/*` → DELETE (legacy stories)
- `Form/FormExample` → `Form Components/Form Examples`

## Implementation Details

### 1. Story Title Conventions

- Use descriptive category names: `Form Controls/Button` instead of `Primitives/Button`
- Group related components: All form inputs under `Form Controls`
- Separate complex layouts: Different shell types under `Layout/Shells`

### 2. Documentation Structure

- Create index MDX files for each major category
- Include component overview, usage guidelines, and links
- Add getting started documentation

### 3. Build Verification

- Ensure no broken links or imports
- Verify all components appear in correct categories
- Confirm build completes without errors

## Success Criteria (DoD)

- ✅ `npm run build-storybook` completes successfully
- ✅ New components appear under correct groups in sidebar
- ✅ All story titles follow consistent naming conventions
- ✅ Documentation index pages exist for major categories
- ✅ Sidebar is logically organized and easy to navigate
- ✅ No broken stories or missing imports
- ✅ Component categories are clearly separated and labeled
