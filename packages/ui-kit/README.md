# @etherisc/ui-kit

A comprehensive React UI component library built with accessibility, type safety, and developer experience in mind.

## ✨ Features

- 🎨 **Theme-aware** - Light/dark mode with DaisyUI + Tailwind CSS
- ♿ **Accessible** - WCAG 2.1 AA compliant with axe-core testing
- 🔧 **Type-safe** - Full TypeScript support with comprehensive interfaces
- 📱 **Responsive** - Mobile-first design patterns
- 🌍 **Internationalized** - Built-in i18n support with react-i18next
- 🧪 **Well-tested** - Unit tests, accessibility tests, and visual regression tests
- 📚 **Well-documented** - Comprehensive Storybook documentation

## 🚀 Quick Start

### Installation

```bash
npm install @etherisc/ui-kit
# or
pnpm add @etherisc/ui-kit
# or
yarn add @etherisc/ui-kit
```

### Basic Setup

```tsx
// Import styles in your main entry file
import "@etherisc/ui-kit/dist/style.css";

// Wrap your app with providers
import { ThemeProvider, ToastProvider, ErrorBoundary } from "@etherisc/ui-kit";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <ToastProvider>{/* Your app content */}</ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

### Basic Usage

```tsx
import { Button, TextInput, AppShell } from "@etherisc/ui-kit";

function MyApp() {
  return (
    <AppShell
      logo={<div>My App</div>}
      sideNavItems={[
        { label: "Dashboard", href: "/" },
        { label: "Settings", href: "/settings" },
      ]}
    >
      <div className="space-y-4">
        <h1>Welcome to My App</h1>
        <TextInput label="Name" placeholder="Enter your name" />
        <Button intent="primary">Get Started</Button>
      </div>
    </AppShell>
  );
}
```

## 📖 Documentation

### For AI Coding Agents

This package is optimized for use by AI coding agents. We provide specialized documentation to ensure seamless integration:

- **[🤖 AI Agent Quick Start](./docs/AI_AGENT_QUICK_START.md)** - Essential setup and patterns (5-minute read)
- **[📘 AI Agent Comprehensive Guide](./docs/AI_AGENT_GUIDE.md)** - Complete API reference and usage patterns

### For Human Developers

- **[📚 Storybook Documentation](https://ui-kit-storybook-url)** - Interactive component explorer
- **[🎯 Select Component Guide](../../docs/select-component-guide.md)** - Complete guide for using the Select component
- **[🎨 Design System](./src/docs/)** - Design tokens, patterns, and guidelines
- **[🔧 Development Guide](./docs/development.md)** - Contributing and development setup

## 🧩 Component Categories

### Layout Components

- `AppShell` - Main application layout with navigation
- `AuthShell` - Authentication pages layout
- `ErrorShell` - Error pages layout
- `WizardShell` - Multi-step form layout
- `MainFixedLayout` - Fixed-width content layout
- `DataDenseLayout` - Data-heavy interface layout

### Form Controls

- `Button` - Primary interactive element
- `TextInput` - Text input with label and validation
- `NumberInput` - Numeric input with min/max validation
- `Select` - Dropdown selection
- `Checkbox` - Boolean selection
- `RadioGroup` - Single selection from multiple options
- `ComboBox` - Searchable dropdown
- `TextArea` - Multi-line text input
- `DatePicker` - Date selection
- `DateRangePicker` - Date range selection
- `SliderInput` - Range slider input
- `SpinnerInput` - Numeric spinner input

### Editor Components

- `MarkdownEditor` - WYSIWYG markdown editor with security
- `CodeEditor` - Syntax-highlighted code editor

### Feedback Components

- `StatusBadge` - Status indicators
- `Toast` - Notification system
- `ErrorBoundary` - Error handling wrapper

### Navigation Components

- `Breadcrumbs` - Navigation breadcrumbs
- `ThemeToggle` - Light/dark mode switcher

## 🎨 Design Principles

### Accessibility First

- All components meet WCAG 2.1 AA standards
- Comprehensive keyboard navigation support
- Screen reader optimized
- High contrast color schemes

### Type Safety

- Full TypeScript support
- Strict prop interfaces
- Comprehensive type exports

### Developer Experience

- Consistent API patterns
- Comprehensive error messages
- Excellent IDE support
- Hot reload friendly

### Styling Philosophy

- **No Tailwind classes in consumer code** - Use component props instead
- Semantic color system - `intent="primary"` vs `className="bg-blue-500"`
- Layout utilities allowed - `className="flex gap-4"` for spacing/layout only

## 🔧 Advanced Usage

### Form Handling with React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, TextInput, Button } from "@etherisc/ui-kit";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <TextInput {...field} label="Email" type="email" />
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

### Toast Notifications

```tsx
import { useToastContext } from "@etherisc/ui-kit";

function MyComponent() {
  const { addToast } = useToastContext();

  const handleSuccess = () => {
    addToast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "success",
    });
  };

  return <Button onClick={handleSuccess}>Save</Button>;
}
```

### Theme Customization

```tsx
import { ThemeProvider } from "@etherisc/ui-kit";

function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="my-app-theme"
      themes={["light", "dark", "custom"]}
    >
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/etherisc/ui-kit.git
cd ui-kit

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook
pnpm storybook
```

### Testing

```bash
# Run unit tests
pnpm test

# Run accessibility tests
pnpm test-storybook

# Run visual regression tests
pnpm playwright test
```

### Building

```bash
# Build the library
pnpm build

# Build Storybook
pnpm build-storybook
```

## 📦 Package Structure

```
packages/ui-kit/
├── src/
│   ├── components/        # React components
│   │   ├── primitives/    # Basic UI elements
│   │   ├── form/          # Form components
│   │   ├── feedback/      # Status and notification components
│   │   └── navigation/    # Navigation components
│   ├── layout/            # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context providers
│   ├── utils/             # Utility functions
│   ├── theme/             # Theme configuration
│   └── docs/              # Documentation pages
├── .storybook/            # Storybook configuration
├── tests/                 # Test files
└── docs/                  # Additional documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Ensure all tests pass
6. Submit a pull request

### Code Standards

- TypeScript strict mode
- ESLint + Prettier formatting
- Comprehensive test coverage
- Accessibility compliance
- Semantic commit messages

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Storybook](https://ui-kit-storybook-url)
- **Issues**: [GitHub Issues](https://github.com/etherisc/ui-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/etherisc/ui-kit/discussions)

---

Made with ❤️ by the Etherisc team
