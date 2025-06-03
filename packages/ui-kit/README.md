# @etherisc/ui-kit

A comprehensive React UI component library built with accessibility, type safety, and developer experience in mind. Contains **60+ production-ready components** including complete shadcn/ui integration.

## ✨ Features

- 🎨 **Theme-aware** - Light/dark mode with DaisyUI + Tailwind CSS
- ⚡ **shadcn/ui Integration** - Complete set of shadcn components with Radix UI primitives
- ♿ **Accessible** - WCAG 2.1 AA compliant with axe-core testing
- 🔧 **Type-safe** - Full TypeScript support with comprehensive interfaces
- 📱 **Responsive** - Mobile-first design patterns
- 🌍 **Internationalized** - Built-in i18n support with react-i18next
- 🔔 **Enhanced Notifications** - Advanced toast system with Sonner integration
- 🧪 **Well-tested** - Unit tests, accessibility tests, and visual regression tests
- 📚 **Well-documented** - Comprehensive Storybook documentation with 200+ stories

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
- `Sheet` - Slide-out panel component with multiple positioning options
- `Sidebar` - Collapsible sidebar for navigation and content organization
- `AspectRatio` - Maintain consistent aspect ratios for media content
- `Separator` - Visual divider between content sections
- `Collapsible` - Expandable/collapsible content container
- `Accordion` - Vertically stacked expandable sections

### Form Controls & Input

- `Button` - Primary interactive element with various styles and states
- `TextInput` - Text input with label and validation
- `NumberInput` - Numeric input with min/max validation
- `Select` - Dropdown selection with enhanced features
- `Checkbox` - Boolean selection with custom styling
- `RadioGroup` - Single selection from multiple options
- `ComboBox` - Searchable dropdown with autocomplete
- `TextArea` - Multi-line text input
- `DatePicker` - Date selection with calendar popup
- `DateRangePicker` - Date range selection
- `SliderInput` - Range slider input
- `SpinnerInput` - Numeric spinner input
- `Switch` - Toggle switch for boolean values
- `Toggle` - Pressable toggle button
- `ToggleGroup` - Group of toggle buttons with single/multiple selection
- `InputOTP` - One-time password input with multiple slots
- `Slider` - Range slider for numeric value selection

### Editor Components

- `MarkdownEditor` - WYSIWYG markdown editor with security
- `CodeEditor` - Syntax-highlighted code editor

### UI Primitives (shadcn/ui Components)

#### Display & Content

- `Card` - Flexible content container with header, body, and footer
- `Avatar` - User profile picture display with fallback support
- `Badge` - Small status indicators and labels
- `Typography` - Comprehensive text styling system with semantic components
- `Skeleton` - Loading placeholders for better UX
- `Progress` - Progress bars and loading indicators
- `Alert` - Contextual alerts and notifications
- `Tooltip` - Hover-triggered contextual information

#### Navigation & Menus

- `Breadcrumb` - Navigation breadcrumbs with custom separators
- `Tabs` - Tabbed content navigation
- `DropdownMenu` - Dropdown menus with nested support
- `ContextMenu` - Right-click context menus
- `Menubar` - Horizontal menu bar navigation
- `NavigationMenu` - Complex navigation with mega-menu support
- `Pagination` - Page navigation for large datasets

#### Data Display & Tables

- `Table` - Comprehensive data tables with sorting and selection
- `HoverCard` - Rich content preview on hover
- `ScrollArea` - Custom scrollable areas with styled scrollbars

#### Dialogs & Overlays

- `Dialog` - Modal dialogs and popup windows
- `AlertDialog` - Confirmation and alert dialogs
- `Popover` - Positioned floating content containers
- `Command` - Command palette and search interfaces

#### Feedback & Status

- `StatusBadge` - Status indicators
- `Toast` - Enhanced notification system powered by Sonner
- `Sonner` - Advanced toast notifications with rich content support
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

The UI kit now supports both traditional toast notifications and enhanced Sonner-powered toasts:

```tsx
// Traditional toast API
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

```tsx
// Enhanced Sonner API with promise support
import { success, promise as toastPromise } from "@etherisc/ui-kit";

function MyComponent() {
  const handleSave = async () => {
    const savePromise = saveData();

    toastPromise(savePromise, {
      loading: "Saving changes...",
      success: "Changes saved successfully!",
      error: "Failed to save changes",
    });
  };

  const handleQuickSuccess = () => {
    success("Quick success message!", {
      description: "Operation completed successfully",
      duration: 3000,
    });
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleSave}>Save with Promise</Button>
      <Button onClick={handleQuickSuccess}>Quick Success</Button>
    </div>
  );
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
