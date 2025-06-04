# Quick Reference: @etherisc/ui-kit Components

Quick import reference for the most commonly used components from the @etherisc/ui-kit package.

## 🚀 Most Common Imports

```tsx
import {
  // Layout
  AppShell,

  // Form Controls
  Button,
  TextInput,
  Select,
  Checkbox,
  NumberInput,
  TextArea,

  // Providers (Required)
  ThemeProvider,
  ToastProvider,
  ErrorBoundary,

  // Hooks
  useToastContext,
  useTheme,

  // Form Utilities
  Form,
  FormField,
} from "@etherisc/ui-kit";
```

## 📦 Package Version

Always use the latest version for new features and bug fixes:

```bash
npm install @etherisc/ui-kit@latest
```

## 🔗 Quick Links

- **[Complete Select Component Guide](./select-component-guide.md)** - Detailed Select usage examples
- **[Complete Setup Guide](./AI-SETUP.md)** - Full project setup instructions
- **[Package README](../packages/ui-kit/README.md)** - Complete component documentation

## ⚡ Copy-Paste Examples

### Basic Form

```tsx
import { TextInput, Select, Button } from "@etherisc/ui-kit";

<div className="space-y-4">
  <TextInput label="Name" placeholder="Enter your name" />
  <Select
    label="Country"
    options={[
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
    ]}
    placeholder="Choose country"
  />
  <Button intent="primary">Submit</Button>
</div>;
```

### With Error State

```tsx
<TextInput
  label="Email"
  type="email"
  error="Please enter a valid email"
  required
/>
```

### With React Hook Form

```tsx
import { Controller } from "react-hook-form";

<Controller
  name="fieldName"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      label="Label"
      options={options}
      error={errors.fieldName?.message}
    />
  )}
/>;
```
