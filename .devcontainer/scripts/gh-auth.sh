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

# Check if already authenticated with persistent credentials (not just env var)
if [ -f "$HOME/.config/gh/hosts.yml" ] && [ -s "$HOME/.config/gh/hosts.yml" ]; then
    echo "✅ GitHub CLI is already authenticated with persistent credentials"
    echo "👤 Authenticated as: $(gh api user --jq .login 2>/dev/null || echo 'Unknown')"

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

# Authenticate with GitHub CLI and store credentials persistently
echo "🔑 Authenticating with GitHub CLI using token..."
# Temporarily store token and clear environment to force persistent storage
TEMP_TOKEN="$GH_TOKEN"
unset GH_TOKEN
echo "$TEMP_TOKEN" | gh auth login --with-token

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