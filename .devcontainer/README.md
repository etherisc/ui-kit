# DevContainer Setup for UI Kit Development

This directory contains the DevContainer configuration for the UI Kit project, providing a consistent and reproducible development environment for all team members.

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- Git for version control

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd ui-kit
   ```

2. **Open in DevContainer**:

   - Open VS Code in the project directory
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Dev Containers: Reopen in Container"
   - Select the command and wait for the container to build

3. **Start developing**:
   - The container will automatically install dependencies and set up the environment
   - Use the built-in terminal with pre-configured aliases
   - All development tools are ready to use

## 📁 Configuration Files

### Core Files

- **`devcontainer.json`**: Main configuration file defining the development environment
- **`docker-compose.yml`**: Docker Compose configuration for the development container
- **`Dockerfile`**: Custom Docker image with all necessary tools and dependencies

### Customization Files

- **`starship.toml`**: Terminal prompt configuration for better developer experience
- **`bashrc`**: Custom shell configuration with useful aliases and functions
- **`scripts/post-create.sh`**: Automated setup script that runs after container creation

## 🛠 What's Included

### Development Tools

- **Node.js 20 LTS**: Latest stable Node.js version
- **pnpm**: Fast, disk space efficient package manager
- **Git**: Version control with GitHub CLI integration
- **Starship**: Beautiful and informative terminal prompt

### VS Code Extensions

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Tailwind CSS**: CSS framework support
- **Storybook**: Component development environment
- **TypeScript**: Enhanced TypeScript support
- **Playwright**: E2E testing support
- **Vitest**: Unit testing support
- **GitHub**: Pull request and Copilot integration

### Testing Environment

- **Playwright**: E2E testing with browser automation
- **Vitest**: Fast unit testing framework
- **Browser Dependencies**: All necessary libraries for headless browser testing

## 🔧 Useful Commands

The devcontainer comes with pre-configured aliases for common development tasks:

### Package Management

```bash
pn          # pnpm
pnr         # pnpm run
pnd         # pnpm run dev
pnb         # pnpm run build
pnt         # pnpm run test
pnl         # pnpm run lint
pns         # pnpm run seed
```

### Development

```bash
dev         # Start development server
build       # Build all packages
test        # Run all tests
lint        # Run linting
format      # Format code
storybook   # Start Storybook
showcase    # Start Showcase app
e2e         # Run E2E tests
seed        # Seed database
```

### Navigation

```bash
ui          # Navigate to UI Kit package
show        # Navigate to Showcase package
docs        # Navigate to documentation
root        # Navigate to project root
```

### Git Shortcuts

```bash
g           # git
gs          # git status
ga          # git add
gc          # git commit
gp          # git push
gl          # git pull
gco         # git checkout
gb          # git branch
gd          # git diff
glog        # git log --oneline --graph --decorate
```

### Playwright

```bash
pw          # playwright
pwtest      # playwright test
pwui        # playwright test --ui
pwshow      # playwright show-report
```

## 🌐 Port Forwarding

The following ports are automatically forwarded from the container to your host machine:

- **3000**: Storybook development server
- **5173**: Vite development server (Showcase app)
- **4173**: Vite preview server
- **8080**: API server
- **9323**: Playwright UI mode

## 💾 Persistent Storage

The devcontainer uses Docker volumes to persist important data across container rebuilds:

- **node_modules**: Package dependencies for faster rebuilds
- **pnpm store**: Package cache for efficient dependency management
- **Playwright browsers**: Browser binaries for E2E testing
- **Bash history**: Command history persistence
- **Git configuration**: Your git settings

## 🔄 Container Lifecycle

### First Time Setup

1. Container builds from Dockerfile
2. Dependencies are installed via pnpm
3. Playwright browsers are downloaded
4. Database is seeded with sample data
5. UI Kit package is built
6. Linting check is performed

### Subsequent Starts

- Container starts quickly using cached images
- Dependencies are already installed
- Development environment is immediately ready

## 🐛 Troubleshooting

### Container Won't Start

- Ensure Docker Desktop is running
- Check available disk space (containers need ~2-3GB)
- Try rebuilding the container: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Performance Issues

- Increase Docker Desktop memory allocation (recommended: 4GB+)
- Close unnecessary applications to free up system resources
- Use volume mounts are properly configured for your OS

### Port Conflicts

- Check if ports 3000, 5173, 4173, 8080, or 9323 are already in use
- Stop conflicting services or modify port mappings in `docker-compose.yml`

### Extension Issues

- Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"
- Check extension compatibility in container environment
- Manually install missing extensions if needed

### Git Configuration

Update your git configuration inside the container:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🔧 Customization

### Adding VS Code Extensions

Edit the `extensions` array in `devcontainer.json`:

```json
"extensions": [
  "existing.extension",
  "new.extension.id"
]
```

### Modifying Shell Configuration

Edit `.devcontainer/bashrc` to add custom aliases or functions.

### Changing Node.js Version

Update the `NODE_VERSION` argument in `docker-compose.yml`:

```yaml
args:
  NODE_VERSION: "18" # or your preferred version
```

### Adding System Dependencies

Modify the `Dockerfile` to install additional packages:

```dockerfile
RUN apt-get update && apt-get install -y \
    your-package-here \
    && apt-get clean
```

## 📚 Additional Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Documentation](https://docs.docker.com/)
- [DevContainer Specification](https://containers.dev/)
- [Cursor.ai DevContainer Support](https://docs.cursor.com/features/devcontainers)

## 🤝 Contributing

When modifying the devcontainer configuration:

1. Test changes thoroughly on different platforms
2. Update this documentation if needed
3. Consider backward compatibility
4. Document any breaking changes

## 📄 License

This devcontainer configuration is part of the UI Kit project and follows the same license terms.
