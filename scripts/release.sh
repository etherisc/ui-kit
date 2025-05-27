#!/bin/bash

# UI Kit Release Script
# This script helps with creating a beta release

set -e

VERSION=${1:-"v0.1.0-beta"}
echo "🚀 Preparing release: $VERSION"

# Ensure we're on develop branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "❌ Error: Must be on develop branch. Currently on: $CURRENT_BRANCH"
    exit 1
fi

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: Working directory is not clean. Please commit or stash changes."
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin develop

# Run tests
echo "🧪 Running tests..."
pnpm test

# Run linting
echo "🔍 Running linting..."
pnpm lint

# Build package
echo "📦 Building package..."
pnpm build

# Check bundle size
echo "📏 Checking bundle size..."
cd packages/ui-kit && pnpm run size-limit && cd ../..

# Build Storybook
echo "📚 Building Storybook..."
cd packages/ui-kit && pnpm run build-storybook && cd ../..

echo "✅ All checks passed!"
echo ""
echo "🏷️  To create the release, run:"
echo "   git tag $VERSION"
echo "   git push origin $VERSION"
echo ""
echo "This will trigger the GitHub Actions workflow to:"
echo "  - Publish the package to GitHub Packages"
echo "  - Deploy Storybook to GitHub Pages"
echo "  - Create a GitHub Release"
echo ""
echo "Or use the manual workflow dispatch at:"
echo "  https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/actions/workflows/release.yml" 