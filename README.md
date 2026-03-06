# UI-Kit & Admin App

[![Compliance](.compliance/badge.svg)](.compliance/report.md)

## Overview

Bare-metal React component library (`@etherisc/ui-kit`) providing 60+ UI primitives for the Etherisc SaaS platform. Built on Radix UI and Tailwind CSS v4, it serves as Layer 1 in the three-layer frontend architecture (ADR-0016). Domain apps consume it indirectly via `@etherisc-saas/design`.

Key technologies: Radix UI, Tailwind CSS v4, TanStack Table, React Hook Form + Zod, Storybook, Vitest, Playwright.

## Installation

### For Consumers (Using the UI Kit)

Install the UI kit package in your React project:

```bash
# From npm registry (recommended)
npm install @etherisc/ui-kit
# or
pnpm add @etherisc/ui-kit
# or
yarn add @etherisc/ui-kit

# From GitHub Packages (alternative)
npm install @etherisc/ui-kit --registry=https://npm.pkg.github.com
```

#### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0
```

#### Basic Usage

```tsx
import { Button, TextInput, AppShell } from "@etherisc/ui-kit";
import "@etherisc/ui-kit/dist/style.css";

function App() {
  return (
    <AppShell>
      <div className="p-4">
        <h1>My App</h1>
        <TextInput label="Name" placeholder="Enter your name" />
        <Button variant="primary">Submit</Button>
      </div>
    </AppShell>
  );
}
```

#### Available Components

- **Form Components**: Button, TextInput, NumberInput, Select, Checkbox, RadioGroup, DatePicker
- **Layout Components**: AppShell, AuthShell, MainLayout
- **Data Components**: DataTable with pagination and sorting
- **Feedback Components**: Toast system, StatusBadge, ErrorBoundary
- **Editor Components**: MarkdownEditor, CodeEditor

For complete documentation and examples, visit our [Storybook](https://etherisc.github.io/ui-kit/).

## Development

### For Contributors (Developing the UI Kit)

## Quick Start

### Option 1: DevContainer (Recommended)

For the most consistent development experience:

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [VS Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open project in VS Code and select "Reopen in Container"
4. Everything is automatically set up! 🚀

### Option 2: Local Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test
```

See [setup.md](docs/setup.md) for detailed setup instructions and [.devcontainer/README.md](.devcontainer/README.md) for DevContainer documentation.

## Bundle Size Monitoring

The UI kit includes automated bundle size monitoring to ensure optimal performance:

```bash
# Check current bundle size
pnpm run size-limit

# Build and check size in one command
pnpm build && pnpm run size-limit
```

### Size Limits

- **ES Module Bundle**: 1 MB gzipped
- **CommonJS Bundle**: 1.5 MB gzipped

The CI pipeline automatically checks bundle sizes on every PR and will fail if the limits are exceeded. This helps prevent bundle bloat and maintains fast loading times for applications using the UI kit.

## Contributing

We welcome contributions to the UI Kit! Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information about:

- 🚀 **Getting Started**: Development environment setup and quick start guide
- 🔧 **Development Workflow**: Branch strategy, commit conventions, and PR process
- 📋 **Code Standards**: TypeScript, React, and styling guidelines
- 🧪 **Testing**: Unit tests, Storybook stories, and accessibility requirements
- 📚 **Documentation**: How to document components and update guides

### Quick Contributing Steps

1. **Fork and clone** the repository
2. **Set up development environment** (DevContainer recommended)
3. **Create a feature branch** from `develop`
4. **Make your changes** following our coding standards
5. **Test thoroughly** with `pnpm test && pnpm lint`
6. **Submit a pull request** using our PR template

For bug reports and feature requests, please use our [GitHub Issues](https://github.com/your-org/ui-kit/issues).

### Code of Conduct

This project follows a [Code of Conduct](CONTRIBUTING.md#code-of-conduct) to ensure a welcoming environment for all contributors.

## Architecture

The ui-kit is a pnpm monorepo with three packages:

- `packages/ui-kit` — the published component library (`@etherisc/ui-kit`)
- `packages/showcase` — demo/admin application for visual testing
- `packages/eslint-plugin-ui-kit-rules` — custom ESLint rules for component quality

In the platform's three-layer architecture, ui-kit is Layer 1 (bare-metal atoms). It is consumed exclusively by `@etherisc-saas/design` (Layer 2, in `platform-sdk/packages/design`). Domain apps (Layer 3) never import from ui-kit directly.

## Related Repos

- [`platform-sdk`](https://github.com/etherisc-saas/platform-sdk) — contains `@etherisc-saas/design` which wraps ui-kit
- [`platform-app`](https://github.com/etherisc-saas/platform-app) — primary domain app consuming the design package
- [`saas-architecture`](https://github.com/etherisc-saas/saas-architecture) — architectural governance and compliance rules
