# UI-Kit Layout Components

This document describes the available layout components in the UI-Kit package, their purpose, and how to use them.

## 1. AppShell

`AppShell` is the primary layout component for admin interfaces. It provides a standard structure with:

- Top navigation bar
- Collapsible side navigation
- Breadcrumb navigation
- Main content area

### Import

```tsx
import { AppShell } from "@org/ui-kit/layout";
```

### Props

| Prop               | Type               | Default | Description                                                 |
| ------------------ | ------------------ | ------- | ----------------------------------------------------------- |
| `logo`             | `ReactNode`        | -       | Logo element displayed in the top-left corner               |
| `navItems`         | `NavItem[]`        | `[]`    | Array of navigation items for the side navigation           |
| `topNavItems`      | `ReactNode`        | -       | Custom content for the top navigation bar (buttons, links)  |
| `userActions`      | `ReactNode`        | -       | User actions area in the top-right corner                   |
| `breadcrumbs`      | `BreadcrumbItem[]` | -       | Array of breadcrumb items                                   |
| `fixedHeader`      | `boolean`          | `true`  | Whether the top bar should be fixed at the top              |
| `defaultCollapsed` | `boolean`          | `false` | Whether the side navigation is initially collapsed          |
| `fixedWidth`       | `boolean`          | `false` | Whether content should have a fixed width (max-width 960px) |
| `className`        | `string`           | -       | Additional CSS class name                                   |
| `children`         | `ReactNode`        | -       | Main content to render                                      |

### Responsive Behavior

- **Desktop (≥1024px)**: Full layout with expanded side navigation
- **Tablet (768-1023px)**: Side navigation can be toggled, headers stay visible
- **Mobile (<768px)**: Side navigation collapses to icons-only rail, user actions condense

### Example

```tsx
import { AppShell } from "@org/ui-kit/layout";
import { Logo } from "@org/ui-kit/components/layout";
import { Button } from "@org/ui-kit/components/primitives";

export function AdminPage() {
  return (
    <AppShell
      logo={<Logo text="My App" />}
      navItems={[
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/dashboard",
          icon: <HomeIcon />,
        },
        { id: "users", label: "Users", href: "/users", icon: <UsersIcon /> },
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", isActive: true },
      ]}
    >
      <h1>Dashboard Content</h1>
      {/* Page content goes here */}
    </AppShell>
  );
}
```

## 2. MinimalShell

`MinimalShell` is a simplified layout for standalone pages like error screens, welcome pages, and maintenance screens.

### Import

```tsx
import { MinimalShell } from "@org/ui-kit/layout";
```

### Props

| Prop        | Type        | Default | Description                         |
| ----------- | ----------- | ------- | ----------------------------------- |
| `title`     | `string`    | -       | Main title to display               |
| `message`   | `string`    | -       | Optional subtitle or description    |
| `image`     | `ReactNode` | -       | Optional image or icon to display   |
| `logo`      | `ReactNode` | -       | Optional logo to display at the top |
| `actions`   | `ReactNode` | -       | Optional action buttons or links    |
| `className` | `string`    | -       | Additional CSS class name           |
| `children`  | `ReactNode` | -       | Additional content to display       |

### Example

```tsx
import { MinimalShell } from "@org/ui-kit/layout";
import { Button } from "@org/ui-kit/components/primitives";
import { AlertTriangleIcon } from "lucide-react";

export function NotFoundPage() {
  return (
    <MinimalShell
      title="404 - Page Not Found"
      message="The page you are looking for doesn't exist or has been moved."
      image={<AlertTriangleIcon className="h-16 w-16 text-warning" />}
      actions={
        <>
          <Button intent="ghost">Contact Support</Button>
          <Button intent="primary">Back to Home</Button>
        </>
      }
    />
  );
}
```

## 3. WizardShell

`WizardShell` is designed for multi-step forms and wizard interfaces with a clear progression.

### Import

```tsx
import { WizardShell } from "@org/ui-kit/layout";
```

### Props

| Prop            | Type           | Default    | Description                             |
| --------------- | -------------- | ---------- | --------------------------------------- |
| `title`         | `string`       | -          | Title of the wizard                     |
| `subtitle`      | `string`       | -          | Optional subtitle or description        |
| `steps`         | `WizardStep[]` | -          | Array of steps in the wizard            |
| `currentStepId` | `string`       | -          | ID of the current active step           |
| `logo`          | `ReactNode`    | -          | Optional logo element                   |
| `onExit`        | `() => void`   | -          | Optional callback when exit is clicked  |
| `exitLabel`     | `string`       | `'Cancel'` | Label for the exit button               |
| `actions`       | `ReactNode`    | -          | Action buttons to display at the bottom |
| `className`     | `string`       | -          | Additional CSS class name               |
| `children`      | `ReactNode`    | -          | Main content to render                  |

### WizardStep Type

```tsx
interface WizardStep {
  id: string; // Unique identifier for the step
  label: string; // Label to display
  description?: string; // Optional description
  isCompleted?: boolean; // Whether step is completed
}
```

### Example

```tsx
import { WizardShell } from "@org/ui-kit/layout";
import { Button } from "@org/ui-kit/components/primitives";

export function OnboardingWizard() {
  const steps = [
    { id: "personal", label: "Personal Info", isCompleted: true },
    { id: "address", label: "Address", isCompleted: false },
    { id: "payment", label: "Payment", isCompleted: false },
  ];

  return (
    <WizardShell
      title="Complete Your Profile"
      subtitle="Please fill out all required information"
      steps={steps}
      currentStepId="address"
      onExit={() => console.log("Exit clicked")}
      actions={
        <>
          <Button intent="ghost">Back</Button>
          <Button intent="primary">Continue</Button>
        </>
      }
    >
      {/* Step content goes here */}
      <form>
        <h2>Address Information</h2>
        {/* Form fields */}
      </form>
    </WizardShell>
  );
}
```

## 4. Common Layout Components

### TopBar

The top navigation bar used in AppShell. Can be used standalone if needed.

```tsx
import { TopBar } from "@org/ui-kit/layout";
```

### SideNav

Collapsible side navigation with support for nested items.

```tsx
import { SideNav } from "@org/ui-kit/layout";
```

### Breadcrumbs

Breadcrumb navigation component.

```tsx
import { Breadcrumbs } from "@org/ui-kit/layout";
```

### ContentWrapper

Main content wrapper with breadcrumbs and optional fixed width.

```tsx
import { ContentWrapper } from "@org/ui-kit/layout";
```

## 5. Accessibility

All layout components follow WCAG 2.1 AA guidelines:

- Proper heading hierarchy
- Keyboard navigation support
- ARIA landmarks and roles
- High-contrast mode support
- Responsive design for various devices

## 6. Best Practices

- Use `AppShell` for admin interfaces with navigation
- Use `MinimalShell` for standalone pages like errors or simple forms
- Use `WizardShell` for multi-step processes
- Keep content focused and limit the number of actions in each view
- Ensure responsive behavior works on all target devices
