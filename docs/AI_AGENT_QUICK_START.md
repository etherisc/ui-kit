# AI Agent Quick Start: @etherisc/ui-kit

## 🚀 30-Second Setup

```bash
# 1. Install
pnpm add @etherisc/ui-kit

# 2. Import styles in your main file
import '@etherisc/ui-kit/dist/style.css'

# 3. Wrap your app
import { ThemeProvider, ToastProvider, ErrorBoundary } from '@etherisc/ui-kit'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <ToastProvider>
          {/* Your app */}
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
```

## 📦 Essential Components

### Basic Imports

```tsx
import {
  Button,
  TextInput,
  Select,
  Checkbox,
  NumberInput,
  AppShell,
  AuthShell,
  StatusBadge,
  useToastContext,
} from "@etherisc/ui-kit";
```

### Form Pattern

```tsx
function MyForm() {
  const [data, setData] = useState({ email: "", age: 0 });

  return (
    <form className="space-y-4">
      <TextInput
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) =>
          setData((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />

      <NumberInput
        label="Age"
        min={18}
        value={data.age}
        onChange={(e) =>
          setData((prev) => ({ ...prev, age: Number(e.target.value) }))
        }
      />

      <Button intent="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
```

### Layout Pattern

```tsx
function Dashboard() {
  return (
    <AppShell
      logo={<div>Logo</div>}
      sideNavItems={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Users", href: "/users" },
      ]}
      breadcrumbs={[{ label: "Dashboard" }]}
    >
      <div className="space-y-6">
        <h1>Dashboard</h1>
        {/* Content */}
      </div>
    </AppShell>
  );
}
```

## 🎯 Core Rules

### ✅ DO

- Use component props for styling: `<Button intent="primary" size="lg">`
- Always provide labels: `<TextInput label="Name" />`
- Use semantic layouts: `AppShell`, `AuthShell`, `ErrorShell`
- Handle loading states: `<Button loading>Saving...</Button>`

### ❌ DON'T

- Use Tailwind classes for styling: `className="bg-blue-500"`
- Hardcode colors: `style={{ color: '#3b82f6' }}`
- Skip accessibility attributes
- Mix layout and styling concerns

## 🔧 Component Quick Reference

| Component     | Key Props                           | Example                                                        |
| ------------- | ----------------------------------- | -------------------------------------------------------------- |
| `Button`      | `intent`, `size`, `loading`         | `<Button intent="primary">Save</Button>`                       |
| `TextInput`   | `label`, `error`, `type`            | `<TextInput label="Name" required />`                          |
| `Select`      | `options`, `value`, `onValueChange` | `<Select options={opts} value={val} onValueChange={setVal} />` |
| `NumberInput` | `min`, `max`, `step`                | `<NumberInput min={0} max={100} />`                            |
| `Checkbox`    | `checked`, `onCheckedChange`        | `<Checkbox checked={agreed} onCheckedChange={setAgreed} />`    |
| `StatusBadge` | `variant`                           | `<StatusBadge variant="success">Active</StatusBadge>`          |
| `AppShell`    | `sideNavItems`, `breadcrumbs`       | See layout pattern above                                       |

## 🎨 Styling System

- **Theme**: Light/dark mode via `ThemeProvider`
- **Colors**: Semantic (primary, error, success) - no hardcoded colors
- **Spacing**: Use `className` only for layout: `"flex gap-4"`, `"space-y-6"`
- **Typography**: Built into components - use heading elements directly

## 🔄 State Management

### Forms (Simple)

```tsx
const [formData, setFormData] = useState({});
const updateField = (field, value) =>
  setFormData((prev) => ({ ...prev, [field]: value }));
```

### Forms (React Hook Form)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {},
});
```

### Toasts

```tsx
const { addToast } = useToastContext();
addToast({ title: "Success!", variant: "success" });
```

## 🚨 Common Patterns

### Loading State

```tsx
{
  loading ? (
    <Button loading disabled>
      Saving...
    </Button>
  ) : (
    <Button onClick={save}>Save</Button>
  );
}
```

### Error State

```tsx
{
  error && <StatusBadge variant="error">{error}</StatusBadge>;
}
```

### Conditional Rendering

```tsx
{
  user ? (
    <AppShell>{/* Authenticated content */}</AppShell>
  ) : (
    <AuthShell>{/* Login form */}</AuthShell>
  );
}
```

---

💡 **Need more details?** See the comprehensive [AI Agent Guide](./AI_AGENT_GUIDE.md) for complete APIs, patterns, and troubleshooting.
