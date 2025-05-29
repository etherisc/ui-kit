# UI-Kit & Admin App

React component library and showcase admin app built with modern tools:

- 🎨 Shadcn UI + DaisyUI + Tailwind
- 📊 TanStack Table
- 🔄 Zustand + TanStack Query + React Hook Form
- 🏗️ Vite + TypeScript + pnpm
- 📚 Storybook + Vitest + Playwright

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

- **ES Module Bundle**: 250 KB gzipped
- **UMD Bundle**: 250 KB gzipped

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
