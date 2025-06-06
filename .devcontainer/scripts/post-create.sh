#!/bin/bash

# Post-create script for UI Kit development environment
set -e

echo "🚀 Setting up UI Kit development environment..."

# Ensure we're in the workspace directory
cd /workspace

# Authenticate with GitHub CLI
if [ -n "$GH_TOKEN" ]; then
    echo "🔐 Authenticating with GitHub CLI..."
    bash .devcontainer/scripts/gh-auth.sh
else
    echo "⚠️  No GH_TOKEN found - GitHub CLI authentication skipped"
    echo "   Create .devcontainer/.env with GH_TOKEN=your_token_here"
fi

# Set up git configuration
if [ -n "$GIT_USER_NAME" ] && [ -n "$GIT_USER_EMAIL" ]; then
    echo "⚙️  Setting up git configuration..."
    git config --global user.name "$GIT_USER_NAME"
    git config --global user.email "$GIT_USER_EMAIL"
    echo "   ✅ Git configured with provided credentials"
elif [ -z "$(git config --global user.name)" ]; then
    echo "⚙️  Setting up git configuration..."
    git config --global user.name "Developer"
    git config --global user.email "developer@example.com"
    echo "   ⚠️  Git not configured. Update with:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your.email@example.com'"
fi

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install --frozen-lockfile --prefer-offline
else
    echo "📦 Dependencies already installed, skipping..."
fi

# Install Playwright browsers if not already installed
if [ ! -d "/home/node/.cache/ms-playwright" ] || [ -z "$(ls -A /home/node/.cache/ms-playwright)" ]; then
    echo "🎭 Installing Playwright browsers..."
    cd packages/showcase
    pnpm exec playwright install --with-deps
    cd /workspace
else
    echo "🎭 Playwright browsers already installed, skipping..."
fi

# Set up the database if it doesn't exist
if [ ! -f "packages/showcase/database.sqlite" ]; then
    echo "🗃️  Setting up database..."
    cd packages/showcase
    pnpm run seed
    cd /workspace
    echo "✅ Database seeded with sample data"
else
    echo "🗃️  Database already exists, skipping seed..."
fi

# Build the UI Kit package
echo "🔨 Building UI Kit package..."
pnpm --filter @org/ui-kit build

# Run linting to ensure everything is set up correctly
echo "🔍 Running linting check..."
pnpm run lint

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Quick start commands:"
echo "   pnpm run dev          - Start UI Kit development"
echo "   pnpm --filter @org/showcase run dev  - Start Showcase app"
echo "   pnpm --filter @org/ui-kit run storybook  - Start Storybook"
echo "   pnpm run test         - Run all tests"
echo "   pnpm --filter @org/showcase run test:e2e  - Run E2E tests"
echo ""
echo "📁 Navigate to packages:"
echo "   ui    - Go to UI Kit package"
echo "   show  - Go to Showcase package"
echo "   docs  - Go to documentation"
echo "" 