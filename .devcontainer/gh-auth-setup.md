# GitHub CLI PAT Authentication Recipe for DevContainers

## 🎯 Goal

Add GitHub CLI authentication using Personal Access Tokens (PAT) to any existing devcontainer setup.

## 📋 Prerequisites

- Existing working devcontainer
- GitHub Personal Access Token with required permissions (`repo`, `read:user`, `read:org`)

## 🔧 Required Components

### 1. Environment File Setup

Create `.devcontainer/.env.example`:

```bash
# GitHub Personal Access Token
# Create at: https://github.com/settings/tokens
# Required permissions: repo, read:user, read:org
GH_TOKEN=your_github_token_here

# Optional: Git configuration
GIT_USER_NAME="Your Name"
GIT_USER_EMAIL="your.email@example.com"
```

### 2. GitHub CLI Installation (Dockerfile)

Add to your existing Dockerfile:

```dockerfile
# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*
```

### 3. Authentication Script

Create `.devcontainer/scripts/gh-auth.sh`:

```bash
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
```

### 4. DevContainer Configuration Updates

Add to your existing `devcontainer.json`:

```json
{
  "runArgs": ["--env-file", ".devcontainer/.env"],

  "postCreateCommand": "bash .devcontainer/scripts/gh-auth.sh"
}
```

If you already have a `postCreateCommand`, modify it to include the auth script:

```json
{
  "postCreateCommand": "bash .devcontainer/scripts/post-create.sh && bash .devcontainer/scripts/gh-auth.sh"
}
```

### 5. Post-Create Script Integration

Add to your existing post-create script:

```bash
# Authenticate with GitHub CLI
if [ -n "$GH_TOKEN" ]; then
    echo "🔐 Authenticating with GitHub CLI..."
    bash .devcontainer/scripts/gh-auth.sh
else
    echo "⚠️  No GH_TOKEN found - GitHub CLI authentication skipped"
    echo "   Create .devcontainer/.env with GH_TOKEN=your_token_here"
fi
```

### 6. Git Configuration (Optional)

Add git configuration setup:

```bash
# Set up git configuration
if [ -n "$GIT_USER_NAME" ] && [ -n "$GIT_USER_EMAIL" ]; then
    echo "⚙️  Setting up git configuration..."
    git config --global user.name "$GIT_USER_NAME"
    git config --global user.email "$GIT_USER_EMAIL"
    echo "   ✅ Git configured with provided credentials"
elif [ -z "$(git config --global user.name)" ]; then
    echo "⚠️  Git not configured. Update with:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your.email@example.com'"
fi
```

### 7. Update .gitignore

Add to project's `.gitignore`:

```gitignore
# DevContainer environment variables
.devcontainer/.env
```

## 🚀 Implementation Steps for AI Agents

1. **Check existing setup**: Verify devcontainer has `scripts/` directory or create it
2. **Make script executable**: `chmod +x .devcontainer/scripts/gh-auth.sh`
3. **Update devcontainer.json**: Add `runArgs` for `.env` file loading
4. **Integrate with existing scripts**: Add auth calls to existing post-create scripts
5. **Create environment template**: Copy `.env.example` to `.env` with actual token

## 📝 User Instructions

1. **Get GitHub Token**:

   - Go to https://github.com/settings/tokens
   - Create token with permissions: `repo`, `read:user`, `read:org`

2. **Set up environment**:

   ```bash
   cp .devcontainer/.env.example .devcontainer/.env
   # Edit .env and add your actual token
   ```

3. **Rebuild container** (if needed):
   - `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

## ✅ Verification

After setup, verify:

```bash
# Check GitHub CLI authentication
gh auth status

# Verify git credential helper
git config --global credential.helper

# Test GitHub operations
gh repo list --limit 3
```

## 🐛 Troubleshooting

### Authentication fails

- Check `.env` file exists and has correct `GH_TOKEN`
- Verify token permissions
- Run script manually: `.devcontainer/scripts/gh-auth.sh`

### Git operations still prompt for credentials

- Run: `gh auth setup-git`
- Check: `git config --global credential.helper`

This focused recipe adds GitHub CLI PAT authentication to any existing devcontainer without requiring a complete rebuild of the container configuration.
