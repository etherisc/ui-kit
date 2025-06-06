#!/bin/bash

# GitHub CLI authentication script

echo "🔐 GitHub CLI Authentication"
echo "=============================="

# Debug: Check if GH_TOKEN is available (without showing the full token)
if [ -n "$GH_TOKEN" ]; then
    echo "🔍 GH_TOKEN found (${#GH_TOKEN} characters)"
else
    echo "🔍 GH_TOKEN not found in environment"
fi

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
    echo "ℹ️  No GH_TOKEN found - GitHub CLI authentication will be skipped"
    echo "   To enable automatic authentication, create .devcontainer/.env with:"
    echo "   GH_TOKEN=your_github_token_here"
    exit 0
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