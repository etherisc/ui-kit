# Setup Guide for UI-Kit

Follow these steps to turn an empty repo into a working workspace ready for **Sprint 0**.

## 0  Initialize Git Repository
```bash
# Initialize local repo
git init
git branch -M main

# Create standard GitHub files
cat > README.md << 'EOF'
# UI-Kit & Admin App

React component library and showcase admin app built with modern tools:
- 🎨 Shadcn UI + DaisyUI + Tailwind
- 📊 TanStack Table
- 🔄 Zustand + TanStack Query + React Hook Form
- 🏗️ Vite + TypeScript + pnpm
- 📚 Storybook + Vitest + Playwright

## Quick Start
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

See [setup.md](docs/setup.md) for detailed setup instructions.
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules
.pnpm-store

# Build outputs
dist
build
storybook-static

# Environment
.env
.env.*
!.env.example

# Testing
coverage
playwright-report

# Editor & OS
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
EOF

# Create .editorconfig
cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
EOF

# Create VSCode settings
mkdir -p .vscode
cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "storybook.storybook-vscode"
  ]
}
EOF

# Initialize remote repo (after creating on GitHub)
git remote add origin git@github.com:YOUR_USERNAME/ui-kit.git
```

## 1  Create Project Structure
```bash
# Create main directories
mkdir -p packages/ui-kit/src/{core,layout,data,theme} \
         packages/showcase \
         packages/api-server \
         docs \
         .github/workflows

# Move planning docs to docs/
mv planning.md project_plan.md setup.md docs/
```

## 2  Bootstrap Workspace with pnpm
```bash
# Initialize root package.json
cat > package.json << 'EOF'
{
  "name": "ui-kit-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm --filter @org/ui-kit dev",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  }
}
EOF

# Create pnpm workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
EOF

# Install root dev dependencies
pnpm add -D typescript @types/node \
  vite @vitejs/plugin-react \
  tailwindcss postcss autoprefixer daisyui \
  vitest @vitest/coverage-c8 \
  eslint prettier \
  @changesets/cli \
  husky commitlint @commitlint/config-conventional
```

## 3  Scaffold ui-kit Package
```bash
cd packages/ui-kit

# Add package.json scripts and config
cat > package.json << 'EOF'
{
  "name": "@org/ui-kit",
  "version": "0.0.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/ui-kit.umd.js",
  "module": "./dist/ui-kit.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/ui-kit.es.js",
      "require": "./dist/ui-kit.umd.js"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
EOF

# Create basic configs
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIKit',
      fileName: 'ui-kit'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
EOF

cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
EOF

cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create tsconfig
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF
```

## 4  Storybook & Tests Setup
```bash
# Initialize Storybook
pnpm dlx storybook@latest init --builder vite --type react
pnpm add -D @storybook/addon-a11y @storybook/addon-docs

# Create example test
mkdir -p src/core/__tests__
cat > src/core/__tests__/Button.test.tsx << 'EOF'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
EOF
```

## 5  Git Hooks & Lint Setup
```bash
# Initialize Husky
pnpm dlx husky-init && pnpm install
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"

# Create ESLint config
cat > .eslintrc.json << 'EOF'
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
EOF

# Create Prettier config
cat > .prettierrc << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
EOF
```

## 6  CI Pipeline Setup
```bash
mkdir -p .github/workflows
cat > .github/workflows/ci.yml << 'EOF'
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
EOF
```

## 7  Showcase App Setup
```bash
cd ../showcase
pnpm create vite . --template react-ts
pnpm add react-router-dom@^7 @tanstack/react-query zustand react-i18next i18next
```

## 8  API Server Setup
```bash
cd ../api-server
pnpm init -y
pnpm add fastify better-sqlite3 faker bcryptjs
```

## 9  Database Seed Script
```bash
mkdir -p scripts
cat > scripts/seed.ts << 'EOF'
// TODO: Add seed script implementation
EOF
```

## 10  Initial Commit
```bash
git add .
git commit -m "chore: scaffold workspace (Sprint 0)"
git push -u origin main
```