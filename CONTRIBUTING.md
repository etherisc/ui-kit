# Contributing to UI Kit

Thank you for your interest in contributing to the UI Kit! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Development Workflow](#development-workflow)
- [Code Style and Standards](#code-style-and-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Issue Reporting](#issue-reporting)
- [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm 8.x or later
- Git
- Docker (optional, for DevContainer)

### Quick Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/ui-kit.git
   cd ui-kit
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development**
   ```bash
   pnpm dev          # Start Vite dev server
   pnpm storybook    # Start Storybook
   ```

## Development Environment

### Option 1: DevContainer (Recommended)

The project includes a complete DevContainer setup for consistent development environments:

1. Install [VS Code](https://code.visualstudio.com/) and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Open the project in VS Code
3. When prompted, click "Reopen in Container" or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
4. The container will build automatically with all dependencies and tools pre-configured

See [.devcontainer/README.md](.devcontainer/README.md) for detailed DevContainer documentation.

### Option 2: Local Setup

If you prefer local development:

1. **Install Node.js 20.x** using [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)
2. **Install pnpm**: `npm install -g pnpm@8`
3. **Install dependencies**: `pnpm install`
4. **Set up Git hooks**: `pnpm prepare` (runs automatically after install)

### Available Scripts

```bash
# Development
pnpm dev                    # Start Vite dev server
pnpm storybook             # Start Storybook development server
pnpm build                 # Build the library
pnpm build-storybook       # Build Storybook for production

# Testing
pnpm test                  # Run unit tests with Vitest
pnpm test:coverage         # Run tests with coverage report
pnpm test-storybook        # Run Storybook interaction tests
pnpm test-storybook:ci     # Run Storybook tests in CI mode
pnpm cy:open               # Open Cypress for E2E testing
pnpm cy:run                # Run Cypress tests headlessly
pnpm playwright:test       # Run Playwright tests

# Quality Assurance
pnpm lint                  # Run ESLint
pnpm lint:fix              # Fix auto-fixable ESLint issues
pnpm type-check            # Run TypeScript type checking
pnpm size-limit            # Check bundle size limits

# Utilities
pnpm tokens-check          # Verify design tokens
pnpm theme-screenshots     # Generate theme screenshots
```

## Development Workflow

### Branch Strategy

We follow GitFlow with these branch types:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `release/*` - Release preparation branches
- `hotfix/*` - Critical bug fixes

### Feature Development

1. **Create a feature branch from `develop`**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes following our coding standards**

3. **Test your changes thoroughly**

   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

4. **Commit using conventional commits**

   ```bash
   git add .
   git commit -m "feat: add new component feature"
   ```

5. **Push and create a pull request**
   ```bash
   git push -u origin feature/your-feature-name
   ```

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(button): add loading state with spinner
fix(input): resolve accessibility issue with label association
docs: update contributing guidelines
test(datatable): add pagination tests
```

## Code Style and Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer type aliases over interfaces for simple types
- Use generics appropriately
- Avoid `any` type (use `unknown` if necessary)
- Export types alongside components

### React

- Use functional components with hooks
- Prefer composition over inheritance
- Use proper prop types and default values
- Follow React hooks rules
- Clean up side effects in `useEffect`

### Styling

- Use Tailwind CSS classes within the UI kit only
- Follow DaisyUI theming conventions
- Use CSS custom properties for design tokens
- Avoid inline styles
- Use `@apply` sparingly in CSS files

### File Organization

```
src/
├── components/
│   ├── primitives/     # Basic UI components
│   ├── layout/         # Layout components
│   └── form/          # Form-specific components
├── hooks/             # Custom React hooks
├── providers/         # Context providers
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `TextInput`)
- **Files**: PascalCase for components, camelCase for utilities
- **Props**: camelCase with descriptive names
- **CSS Classes**: Follow Tailwind/DaisyUI conventions
- **Test Files**: `*.test.tsx` or `*.spec.tsx`

## Testing Requirements

### Unit Tests

- Write tests for all components using Vitest
- Aim for >90% code coverage
- Test component behavior, not implementation details
- Use React Testing Library best practices

```typescript
// Example test structure
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Storybook Stories

- Create stories for all components
- Include all component variants and states
- Use Storybook controls for interactive props
- Write interaction tests for complex behaviors

```typescript
// Example story structure
export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "A versatile button component with multiple variants.",
      },
    },
  },
} as Meta<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading...",
    loading: true,
  },
};
```

### Accessibility Testing

- All components must pass axe-core accessibility tests
- Use semantic HTML elements
- Provide proper ARIA labels and descriptions
- Ensure keyboard navigation works correctly
- Test with screen readers when possible

### Visual Testing

- Playwright snapshots for layout components
- Cypress visual regression tests for themes
- Storybook visual testing for component variants

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**

   ```bash
   pnpm test
   pnpm test-storybook
   pnpm lint
   ```

2. **Check bundle size impact**

   ```bash
   pnpm build
   pnpm size-limit
   ```

3. **Update documentation if needed**

   - Component documentation in Storybook
   - README updates for new features
   - CHANGELOG entries for breaking changes

4. **Rebase on latest develop**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

### PR Requirements

- **Title**: Use conventional commit format
- **Description**: Use the provided PR template
- **Tests**: Include tests for new functionality
- **Documentation**: Update relevant documentation
- **Breaking Changes**: Clearly document any breaking changes
- **Size Impact**: Keep bundle size increases minimal

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: Manual testing of new features
4. **Documentation Review**: Ensure docs are accurate and complete

### Merging

- Use "Squash and merge" for feature branches
- Ensure commit message follows conventional format
- Delete feature branch after merging

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management:

1. **Add changeset for your changes**

   ```bash
   pnpm changeset
   ```

2. **Changesets bot creates release PR**

3. **Review and merge release PR to main**

4. **Automated release process**:
   - Publishes to npm registry (public access)
   - Publishes to GitHub Packages
   - Creates GitHub release with release notes
   - Deploys Storybook to GitHub Pages

### Publishing Destinations

The package is automatically published to multiple registries:

- **npm Registry** (recommended for consumers): `npm install @etherisc/ui-kit`
- **GitHub Packages** (alternative): `npm install @etherisc/ui-kit --registry=https://npm.pkg.github.com`

### Manual Release (Maintainers Only)

For manual releases, use the GitHub Actions workflow:

1. Go to Actions → Release workflow
2. Click "Run workflow"
3. Enter the version tag (e.g., `v0.3.0-beta`)
4. The workflow will build, test, and publish automatically

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Code samples**: Minimal reproduction case

### Feature Requests

For feature requests, please include:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Examples**: Similar implementations in other libraries

### Security Issues

For security vulnerabilities:

- **Do not** create public issues
- Email security concerns to the maintainers
- Include detailed reproduction steps
- Allow time for fix before disclosure

## Code of Conduct

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome people of all backgrounds and experience levels
- **Be collaborative**: Work together constructively
- **Be patient**: Help others learn and grow

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Spam or off-topic discussions
- Sharing private information without permission

### Enforcement

Violations of the code of conduct should be reported to the project maintainers. All reports will be reviewed and investigated promptly and fairly.

## Getting Help

- **Documentation**: Check the README and Storybook docs first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Discord**: Join our community Discord for real-time help

## Recognition

Contributors are recognized in:

- CHANGELOG.md for significant contributions
- README.md contributors section
- GitHub contributor graphs
- Release notes for major features

Thank you for contributing to the UI Kit! 🎉
