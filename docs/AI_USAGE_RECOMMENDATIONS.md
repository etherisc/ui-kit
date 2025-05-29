# AI Agent Usage Recommendations

## 🎯 Overview

This document provides strategic guidance for AI coding agents using the @etherisc/ui-kit package to build applications efficiently and correctly.

## 📋 Pre-Implementation Checklist

Before starting any UI implementation, ensure:

1. **Package is properly installed and configured**

   - CSS imports are added
   - Required providers wrap the application
   - TypeScript is configured

2. **Requirements are clear**

   - Understand the application's layout needs (dashboard, auth, error pages)
   - Identify required form fields and validation rules
   - Clarify accessibility requirements
   - Determine theme/branding needs

3. **Architecture is planned**
   - Choose appropriate layout component (AppShell, AuthShell, etc.)
   - Plan component hierarchy
   - Design state management approach

## 🏗️ Implementation Strategy

### 1. Start with Layout

Always begin implementation with the appropriate layout component:

```tsx
// For authenticated app pages
<AppShell sideNavItems={navItems} breadcrumbs={breadcrumbs}>
  {content}
</AppShell>

// For login/signup pages
<AuthShell logo={logo} width="md">
  {authForm}
</AuthShell>

// For error pages
<ErrorShell title="Not Found" message="Page doesn't exist" actions={homeButton} />
```

### 2. Build Forms Systematically

Follow this pattern for all forms:

1. **Define validation schema** (if using React Hook Form + Zod)
2. **Create form state** (useState or useForm)
3. **Build form UI** with proper labels and error handling
4. **Add submit logic** with loading states
5. **Include success/error feedback**

### 3. Handle States Explicitly

Always account for:

- **Loading states**: `<Button loading>Saving...</Button>`
- **Error states**: `<StatusBadge variant="error">{error}</StatusBadge>`
- **Empty states**: Proper messaging when no data
- **Success feedback**: Toast notifications or status badges

## 🔧 Component Selection Guide

### When to Use Each Component

| Use Case             | Component                | Key Props                           |
| -------------------- | ------------------------ | ----------------------------------- |
| Text input           | `TextInput`              | `label`, `type`, `error`            |
| Numbers              | `NumberInput`            | `min`, `max`, `step`                |
| Single selection     | `Select` or `RadioGroup` | `options`, `value`, `onValueChange` |
| Multiple selection   | `Checkbox` groups        | `checked`, `onCheckedChange`        |
| Searchable selection | `ComboBox`               | `searchable`, `options`             |
| Date selection       | `DatePicker`             | `value`, `onChange`, `format`       |
| Date range           | `DateRangePicker`        | `value`, `onChange`, `maxRange`     |
| Long text            | `TextArea`               | `rows`, `maxLength`                 |
| Actions              | `Button`                 | `intent`, `size`, `loading`         |
| Status display       | `StatusBadge`            | `variant`                           |
| Code editing         | `CodeEditor`             | `language`, `theme`                 |
| Rich text            | `MarkdownEditor`         | `value`, `onChange`                 |

### Layout Decision Tree

```
Is this an authenticated page?
├── Yes → Use AppShell
│   ├── Dashboard/main pages → AppShell with sideNav
│   ├── Settings/detailed → MainFixedLayout or DataDenseLayout
│   └── Multi-step process → WizardShell
└── No →
    ├── Login/Auth → AuthShell
    ├── Error page → ErrorShell
    └── Simple page → MinimalShell
```

## 🎨 Styling Best Practices

### ✅ DO

- Use component intent props: `intent="primary"`, `variant="success"`
- Use layout classes: `className="flex gap-4"`, `className="space-y-6"`
- Provide semantic spacing between related elements
- Use consistent button intents across the app

### ❌ DON'T

- Add Tailwind utility classes for colors/styling: `className="bg-blue-500"`
- Hardcode colors or fonts in style attributes
- Override component internal styling
- Mix design system patterns

### Layout Patterns

```tsx
// Good: Semantic spacing
<div className="space-y-6">
  <h1>Title</h1>
  <div className="space-y-4">
    <TextInput label="Name" />
    <TextInput label="Email" />
  </div>
  <div className="flex gap-2">
    <Button intent="primary">Save</Button>
    <Button intent="outline">Cancel</Button>
  </div>
</div>

// Good: Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <TextInput label="First Name" />
  <TextInput label="Last Name" />
</div>
```

## 🔄 State Management Patterns

### Simple Forms

```tsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
});

const updateField = (field: string, value: any) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};
```

### React Hook Form (Recommended for complex forms)

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {},
});

// Use FormField components for automatic error handling
```

### Loading States

```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async () => {
  setLoading(true);
  setError(null);
  try {
    await saveData();
    addToast({ title: "Saved!", variant: "success" });
  } catch (err) {
    setError("Failed to save");
  } finally {
    setLoading(false);
  }
};
```

## 🚨 Common Pitfalls

### 1. Missing Labels

```tsx
// ❌ Bad: No label
<TextInput placeholder="Enter name" />

// ✅ Good: Always provide labels
<TextInput label="Full Name" placeholder="Enter name" />
```

### 2. Poor Error Handling

```tsx
// ❌ Bad: No error feedback
<Button onClick={riskyOperation}>Submit</Button>

// ✅ Good: Comprehensive error handling
<Button
  loading={loading}
  disabled={loading}
  onClick={handleSubmitWithErrorHandling}
>
  {loading ? 'Saving...' : 'Submit'}
</Button>
{error && <StatusBadge variant="error">{error}</StatusBadge>}
```

### 3. Inconsistent Patterns

```tsx
// ❌ Bad: Mixed patterns
<Button className="bg-blue-500">Submit</Button>
<Button intent="secondary">Cancel</Button>

// ✅ Good: Consistent use of design system
<Button intent="primary">Submit</Button>
<Button intent="outline">Cancel</Button>
```

## 📊 Performance Considerations

### 1. Import Optimization

```tsx
// ✅ Good: Import only what you need
import { Button, TextInput } from "@etherisc/ui-kit";

// ❌ Avoid: Importing everything
import * as UIKit from "@etherisc/ui-kit";
```

### 2. Large Components

```tsx
// ✅ Good: Lazy load heavy components
const CodeEditor = React.lazy(() =>
  import("@etherisc/ui-kit").then((m) => ({ default: m.CodeEditor })),
);
```

### 3. Form Performance

```tsx
// ✅ Good: Memoize callbacks
const handleChange = useCallback((value) => {
  updateField("name", value);
}, []);
```

## 🔍 Testing Considerations

When implementing components, consider:

1. **Accessibility**: All form controls should have proper labels
2. **Keyboard navigation**: Users should be able to navigate without mouse
3. **Screen reader support**: Use semantic HTML and ARIA attributes
4. **Error states**: Test form validation and error displays
5. **Loading states**: Ensure loading indicators work correctly

## 📈 Success Metrics

A well-implemented UI using this package should achieve:

- ✅ **Zero accessibility violations** (axe-core tests pass)
- ✅ **Type safety** (no TypeScript errors)
- ✅ **Consistent patterns** (same approach across similar components)
- ✅ **Proper error handling** (users understand what went wrong)
- ✅ **Good performance** (fast initial load, smooth interactions)
- ✅ **Responsive design** (works on mobile and desktop)

## 🎓 Learning Path

For AI agents new to this package:

1. **Start with the Quick Start guide** - Get basic setup working
2. **Implement a simple form** - Learn core patterns
3. **Add a layout** - Understand the shell components
4. **Practice error handling** - Implement loading and error states
5. **Build a complete page** - Combine multiple components
6. **Add advanced features** - Use toast notifications, theme toggle

## 📞 When to Ask for Help

Consider requesting human guidance when:

- Requirements are ambiguous or conflicting
- Custom styling beyond the design system is needed
- Complex data flow or state management is required
- Integration with external APIs is needed
- Performance optimization is critical
- Advanced accessibility requirements are specified

---

Following these guidelines will help AI agents build high-quality, accessible, and maintainable user interfaces with the @etherisc/ui-kit package.
