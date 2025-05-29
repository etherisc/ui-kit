# AI Agent Guide: @etherisc/ui-kit

## 📋 Table of Contents

1. [Package Overview](#package-overview)
2. [Installation & Setup](#installation--setup)
3. [Core Concepts](#core-concepts)
4. [Component API Reference](#component-api-reference)
5. [Layout Components](#layout-components)
6. [Form Handling Patterns](#form-handling-patterns)
7. [Styling Guidelines](#styling-guidelines)
8. [Accessibility Requirements](#accessibility-requirements)
9. [Common Usage Patterns](#common-usage-patterns)
10. [Troubleshooting](#troubleshooting)

---

## Package Overview

**@etherisc/ui-kit** is a comprehensive React UI component library built with:

- **TypeScript** for type safety
- **Tailwind CSS + DaisyUI** for styling
- **Shadcn/ui** as component foundation
- **React Hook Form + Zod** for form handling
- **Storybook** for component documentation
- **Accessibility-first** design with axe-core testing

### Key Features

- 🎨 **Theme-aware** with light/dark mode support
- ♿ **Accessibility compliant** (WCAG 2.1 AA)
- 📱 **Responsive** design patterns
- 🔧 **Type-safe** APIs with TypeScript
- 🌍 **Internationalization** ready (i18next)
- 🧪 **Well-tested** with Vitest and Playwright

---

## Installation & Setup

### 1. Install the Package

```bash
npm install @etherisc/ui-kit
# or
pnpm add @etherisc/ui-kit
# or
yarn add @etherisc/ui-kit
```

### 2. Import Styles

```tsx
// In your main App.tsx or index.tsx
import "@etherisc/ui-kit/dist/style.css";
```

### 3. Wrap with Providers

```tsx
import {
  ThemeProvider,
  ToastProvider,
  I18nProvider,
  ErrorBoundary,
} from "@etherisc/ui-kit";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <I18nProvider>
          <ToastProvider>{/* Your app content */}</ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

---

## Core Concepts

### Theme System

- Uses DaisyUI tokens mapped to CSS custom properties
- Supports light/dark mode switching
- Never use hardcoded colors - always use semantic tokens

### Component Architecture

- All components are **controlled** by default
- Props follow consistent naming: `value`, `onChange`, `disabled`, `error`
- Accessibility props are always included: `aria-*`, `role`, etc.

### Styling Rules

- **NO Tailwind classes in consumer apps** - only use component props
- Components handle all styling internally
- Use `className` prop only for spacing/layout adjustments

---

## Component API Reference

### Form Controls

#### Button

```tsx
import { Button } from "@etherisc/ui-kit";

interface ButtonProps {
  intent?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

// Usage
<Button intent="primary" size="lg" onClick={handleClick}>
  Submit
</Button>;
```

#### TextInput

```tsx
import { TextInput } from "@etherisc/ui-kit";

interface TextInputProps {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  type?: "text" | "email" | "password" | "tel" | "url";
}

// Usage
<TextInput
  label="Email Address"
  description="We'll never share your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  required
/>;
```

#### NumberInput

```tsx
import { NumberInput } from "@etherisc/ui-kit";

interface NumberInputProps {
  label?: string;
  description?: string;
  error?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

// Usage
<NumberInput
  label="Age"
  min={0}
  max={120}
  step={1}
  value={age}
  onChange={(e) => setAge(Number(e.target.value))}
/>;
```

#### Select

```tsx
import { Select } from "@etherisc/ui-kit";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

// Usage
<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ]}
  value={country}
  onValueChange={setCountry}
/>;
```

#### Checkbox

```tsx
import { Checkbox } from "@etherisc/ui-kit";

interface CheckboxProps {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
}

// Usage
<Checkbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onCheckedChange={setAgreed}
  required
/>;
```

#### RadioGroup

```tsx
import { RadioGroup } from "@etherisc/ui-kit";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  description?: string;
  error?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

// Usage
<RadioGroup
  label="Preferred contact method"
  options={[
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "sms", label: "SMS" },
  ]}
  value={contactMethod}
  onValueChange={setContactMethod}
/>;
```

#### ComboBox

```tsx
import { ComboBox } from "@etherisc/ui-kit";

interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboBoxProps {
  label?: string;
  description?: string;
  error?: string;
  options: ComboBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  searchable?: boolean;
  disabled?: boolean;
}

// Usage
<ComboBox
  label="Framework"
  placeholder="Search frameworks..."
  searchable
  options={frameworks}
  value={selectedFramework}
  onChange={setSelectedFramework}
/>;
```

#### TextArea

```tsx
import { TextArea } from "@etherisc/ui-kit";

interface TextAreaProps {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

// Usage
<TextArea
  label="Comments"
  placeholder="Enter your comments here..."
  rows={4}
  maxLength={500}
  value={comments}
  onChange={(e) => setComments(e.target.value)}
/>;
```

#### DatePicker

```tsx
import { DatePicker } from "@etherisc/ui-kit";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  format?: string; // date-fns format, default "PPP"
}

// Usage
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select a date"
  minDate={new Date()}
  format="yyyy-MM-dd"
/>;
```

#### DateRangePicker

```tsx
import { DateRangePicker } from "@etherisc/ui-kit";

interface DateRange {
  from: Date;
  to?: Date;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number; // max days between dates
  format?: string;
}

// Usage
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
  maxRange={90}
/>;
```

### Editor Components

#### MarkdownEditor

```tsx
import { MarkdownEditor } from "@etherisc/ui-kit";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  "aria-label"?: string;
}

// Usage
<MarkdownEditor
  value={markdown}
  onChange={setMarkdown}
  placeholder="Write your markdown here..."
  aria-label="Blog post content"
/>;
```

#### CodeEditor

```tsx
import { CodeEditor } from "@etherisc/ui-kit";

type CodeLanguage =
  | "javascript"
  | "typescript"
  | "html"
  | "css"
  | "json"
  | "markdown";
type CodeTheme = "light" | "dark";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeLanguage;
  theme?: CodeTheme;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  height?: string | number;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  className?: string;
}

// Usage
<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  theme="dark"
  height="400px"
  lineNumbers
/>;
```

### Feedback Components

#### StatusBadge

```tsx
import { StatusBadge } from '@etherisc/ui-kit'

type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface StatusBadgeProps {
  variant?: StatusBadgeVariant
  children: React.ReactNode
}

// Usage
<StatusBadge variant="success">Active</StatusBadge>
<StatusBadge variant="error">Failed</StatusBadge>
```

#### Toast System

```tsx
import { useToastContext } from "@etherisc/ui-kit";

// In your component
function MyComponent() {
  const { addToast } = useToastContext();

  const showSuccess = () => {
    addToast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "success",
    });
  };

  const showError = () => {
    addToast({
      title: "Error",
      description: "Something went wrong.",
      variant: "error",
    });
  };

  return (
    <div>
      <Button onClick={showSuccess}>Show Success</Button>
      <Button onClick={showError}>Show Error</Button>
    </div>
  );
}
```

### Navigation Components

#### ThemeToggle

```tsx
import { ThemeToggle } from "@etherisc/ui-kit";

interface ThemeToggleProps {
  className?: string;
  onToggle?: (isDarkMode: boolean) => void;
  size?: "sm" | "md" | "lg";
}

// Usage
<ThemeToggle
  size="md"
  onToggle={(isDark) => console.log("Dark mode:", isDark)}
/>;
```

---

## Layout Components

### AppShell - Main Application Layout

```tsx
import { AppShell } from "@etherisc/ui-kit";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  children?: NavItem[];
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppShellProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  topNavItems?: React.ReactNode;
  userActions?: React.ReactNode;
  sideNavItems?: NavItem[];
  breadcrumbs?: BreadcrumbItem[];
  initialCollapsed?: boolean;
  fixedWidth?: boolean;
  contentHeader?: React.ReactNode;
  contentFooter?: React.ReactNode;
}

// Usage
<AppShell
  logo={<Logo />}
  sideNavItems={[
    { label: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
    { label: "Users", href: "/users", icon: <UsersIcon /> },
    { label: "Settings", href: "/settings", icon: <SettingsIcon /> },
  ]}
  breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Users" }]}
  userActions={
    <Button intent="outline" size="sm">
      Sign Out
    </Button>
  }
>
  {/* Your main content */}
</AppShell>;
```

### AuthShell - Authentication Pages

```tsx
import { AuthShell } from "@etherisc/ui-kit";

interface AuthShellProps {
  logo?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  width?: "sm" | "md" | "lg";
}

// Usage
<AuthShell logo={<Logo />} width="md" footer={<p>© 2024 Company Name</p>}>
  <form>
    <TextInput label="Email" type="email" />
    <TextInput label="Password" type="password" />
    <Button intent="primary" type="submit">
      Sign In
    </Button>
  </form>
</AuthShell>;
```

### ErrorShell - Error Pages

```tsx
import { ErrorShell } from "@etherisc/ui-kit";

interface ErrorShellProps {
  title: string;
  message?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  image?: React.ReactNode;
  logo?: React.ReactNode;
  className?: string;
}

// Usage
<ErrorShell
  title="Page Not Found"
  message="The page you're looking for doesn't exist."
  actions={
    <Button intent="primary" onClick={() => navigate("/")}>
      Go Home
    </Button>
  }
/>;
```

### WizardShell - Multi-step Forms

```tsx
import { WizardShell } from "@etherisc/ui-kit";

interface WizardStep {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

interface WizardShellProps {
  title: string;
  subtitle?: string;
  steps: WizardStep[];
  currentStepId: string;
  children: React.ReactNode;
  logo?: React.ReactNode;
  onExit?: () => void;
  exitLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}

// Usage
<WizardShell
  title="Account Setup"
  subtitle="Complete your profile in 3 easy steps"
  steps={[
    { id: "personal", title: "Personal Info", completed: true },
    { id: "company", title: "Company Details", completed: false },
    { id: "verification", title: "Verification", completed: false },
  ]}
  currentStepId="company"
  onExit={() => navigate("/dashboard")}
  actions={
    <div className="flex gap-2">
      <Button intent="outline" onClick={goToPrevStep}>
        Previous
      </Button>
      <Button intent="primary" onClick={goToNextStep}>
        Next
      </Button>
    </div>
  }
>
  {/* Current step content */}
</WizardShell>;
```

---

## Form Handling Patterns

### With React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  TextInput,
  Button,
} from "@etherisc/ui-kit";

// 1. Define validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(18, "Must be at least 18 years old"),
});

type FormValues = z.infer<typeof formSchema>;

// 2. Create form component
function UserForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      age: 18,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <TextInput
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <TextInput {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <NumberInput {...field} min={18} max={120} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" intent="primary">
          Submit
        </Button>
      </form>
    </Form>
  );
}
```

### Simple Form Handling (without React Hook Form)

```tsx
import { useState } from "react";
import { TextInput, Button } from "@etherisc/ui-kit";

function SimpleForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        error={errors.email}
        required
      />

      <TextInput
        label="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        error={errors.name}
        required
      />

      <Button type="submit" intent="primary">
        Submit
      </Button>
    </form>
  );
}
```

---

## Styling Guidelines

### ❌ NEVER Do This

```tsx
// DON'T use Tailwind classes in consumer apps
<Button className="bg-blue-500 text-white px-4 py-2">
  Click me
</Button>

// DON'T hardcode colors
<div style={{ backgroundColor: '#3b82f6' }}>
  Content
</div>
```

### ✅ ALWAYS Do This

```tsx
// DO use component props for styling
<Button intent="primary" size="lg">
  Click me
</Button>

// DO use className only for spacing/layout
<div className="flex flex-col gap-4">
  <Button intent="primary">Submit</Button>
  <Button intent="outline">Cancel</Button>
</div>
```

### Spacing and Layout Classes (Allowed)

```tsx
// These Tailwind utilities are OK for layout:
className = "flex flex-col gap-4";
className = "grid grid-cols-2 gap-6";
className = "mb-4";
className = "p-6";
className = "max-w-md mx-auto";
className = "space-y-4";
```

---

## Accessibility Requirements

All components are built with accessibility in mind. Here are key requirements:

### Form Controls

- All inputs must have associated labels
- Error states must be announced to screen readers
- Required fields must be marked with `aria-required`
- Invalid fields must have `aria-invalid="true"`

### Interactive Elements

- All interactive elements must be keyboard accessible
- Focus indicators must be visible
- Button purposes must be clear

### Color and Contrast

- All text must meet WCAG AA contrast requirements
- Color must not be the only way to convey information

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use landmark elements (main, nav, aside, footer)
- Use lists for grouped content

### Example: Accessible Form

```tsx
<form aria-labelledby="form-title">
  <h2 id="form-title">Contact Information</h2>

  <TextInput
    label="Email Address"
    type="email"
    required
    aria-describedby="email-help"
    description="We'll use this to send you updates"
  />

  <fieldset>
    <legend>Preferred Contact Method</legend>
    <RadioGroup
      options={[
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
      ]}
      value={contactMethod}
      onValueChange={setContactMethod}
    />
  </fieldset>

  <Button type="submit" intent="primary">
    Save Contact Information
  </Button>
</form>
```

---

## Common Usage Patterns

### Data Loading States

```tsx
import { Button, StatusBadge } from "@etherisc/ui-kit";

function DataComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Button loading disabled>
          Loading...
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <StatusBadge variant="error">Error</StatusBadge>
        <p>{error}</p>
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

### Modal Dialogs

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@etherisc/ui-kit";

function ConfirmDialog({ open, onOpenChange, onConfirm, title, description }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button intent="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button intent="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Search and Filter

```tsx
import { TextInput, Select, ComboBox } from "@etherisc/ui-kit";

function SearchFilters({ onFiltersChange }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TextInput
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      <Select
        placeholder="Select category"
        options={categoryOptions}
        value={filters.category}
        onValueChange={(value) => updateFilter("category", value)}
      />

      <ComboBox
        placeholder="Select status"
        searchable
        options={statusOptions}
        value={filters.status}
        onChange={(value) => updateFilter("status", value)}
      />
    </div>
  );
}
```

---

## Troubleshooting

### Common Issues

#### 1. Styles Not Applied

**Problem**: Components appear unstyled
**Solution**: Make sure you imported the CSS file:

```tsx
import "@etherisc/ui-kit/dist/style.css";
```

#### 2. Theme Not Working

**Problem**: Theme toggle doesn't work or colors are wrong
**Solution**: Ensure ThemeProvider wraps your app:

```tsx
<ThemeProvider defaultTheme="light" storageKey="app-theme">
  <App />
</ThemeProvider>
```

#### 3. Form Validation Errors

**Problem**: Form validation not working with React Hook Form
**Solution**: Use FormField component and proper field binding:

```tsx
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => <TextInput {...field} />}
/>
```

#### 4. TypeScript Errors

**Problem**: TypeScript complains about component props
**Solution**: Import types and use proper interfaces:

```tsx
import { ButtonProps } from "@etherisc/ui-kit";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

#### 5. Accessibility Warnings

**Problem**: axe-core reports accessibility violations
**Solution**: Always provide labels and proper ARIA attributes:

```tsx
<TextInput
  label="Required field"
  aria-required="true"
  aria-describedby="field-help"
/>
```

### Performance Tips

1. **Lazy load large components**: Use React.lazy for CodeEditor
2. **Memoize expensive operations**: Use useMemo for computed values
3. **Optimize re-renders**: Use useCallback for event handlers
4. **Bundle optimization**: Import only needed components

### Development Best Practices

1. **Always use TypeScript**: Enable strict mode for better type safety
2. **Test accessibility**: Run axe-core tests on your components
3. **Follow naming conventions**: Use descriptive prop names
4. **Handle loading states**: Always show loading indicators
5. **Error boundaries**: Wrap components with ErrorBoundary
6. **Internationalization**: Use translation keys for user-facing text

---

## Quick Reference

### Essential Imports

```tsx
// Layout
import { AppShell, AuthShell, ErrorShell } from "@etherisc/ui-kit";

// Form Controls
import {
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  RadioGroup,
  ComboBox,
  TextArea,
  DatePicker,
  DateRangePicker,
} from "@etherisc/ui-kit";

// Buttons & Actions
import { Button, ThemeToggle } from "@etherisc/ui-kit";

// Feedback
import { StatusBadge, useToastContext } from "@etherisc/ui-kit";

// Editors
import { MarkdownEditor, CodeEditor } from "@etherisc/ui-kit";

// Providers
import {
  ThemeProvider,
  ToastProvider,
  I18nProvider,
  ErrorBoundary,
} from "@etherisc/ui-kit";

// Form Handling
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@etherisc/ui-kit";
```

### Component Intent/Variant Options

```tsx
// Button intents
"default" | "primary" | "secondary" | "danger" | "outline" | "ghost" | "link";

// Button/Component sizes
"default" | "sm" | "lg" | "icon";

// StatusBadge variants
"success" | "warning" | "error" | "info" | "neutral";

// Toast variants
"success" | "warning" | "error" | "info";

// AuthShell widths
"sm" | "md" | "lg";
```

---

This guide provides comprehensive information for AI agents to effectively use the @etherisc/ui-kit package. Always refer to the latest Storybook documentation for the most up-to-date component APIs and examples.
