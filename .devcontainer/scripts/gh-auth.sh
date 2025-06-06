#!/bin/bash

# GitHub CLI authentication script
set -e

echo "🔐 GitHub CLI Authentication"
echo "=============================="

# Check if already authenticated
if gh auth status >/dev/null 2>&1; then
    echo "✅ GitHub CLI is already authenticated"
    echo "👤 Authenticated as: $(gh api user --jq .login)"

    # Setup git credential helper
    echo "⚙️  Configuring git credential helper..."
    gh auth setup-git
    echo "✅ Git credential helper configured"
    echo ""
    echo "✅ GitHub CLI is ready to use!"
    exit 0
fi

# If not authenticated, check if GH_TOKEN is available
if [ -z "$GH_TOKEN" ]; then
    echo "❌ Not authenticated and GH_TOKEN environment variable not found"
    echo "   Make sure .devcontainer/.env contains your GitHub token:"
    echo "   GH_TOKEN=your_github_token_here"
    echo "   Or set the GH_TOKEN environment variable directly"
    exit 1
fi

# Authenticate with GitHub CLI
echo "🔑 Authenticating with GitHub CLI using token..."
echo "$GH_TOKEN" | gh auth login --with-token

# Verify authentication
if gh auth status >/dev/null 2>&1; then
    echo "✅ GitHub CLI authentication successful"

    # Setup git credential helper
    echo "⚙️  Configuring git credential helper..."
    gh auth setup-git
    echo "✅ Git credential helper configured"

    # Show current user
    echo "👤 Authenticated as: $(gh api user --jq .login)"
    echo ""
    echo "✅ GitHub CLI is ready to use!"
else
    echo "❌ GitHub CLI authentication failed"
    echo "   Please check your token and try again"
    exit 1
fi 