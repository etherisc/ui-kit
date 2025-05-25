# Use the official Node.js image as base
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-bullseye

# Arguments for user configuration
ARG USER_UID=1000
ARG USER_GID=1000
ARG INSTALL_PNPM=true

# Install system dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        git \
        curl \
        wget \
        ca-certificates \
        gnupg \
        lsb-release \
        build-essential \
        python3 \
        python3-pip \
        # For Playwright browser dependencies
        libnss3-dev \
        libatk-bridge2.0-dev \
        libdrm-dev \
        libxkbcommon-dev \
        libgtk-3-dev \
        libgbm-dev \
        libasound2-dev \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd --gid $USER_GID node \
    && useradd --uid $USER_UID --gid $USER_GID -m node \
    && echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Install pnpm globally if requested
RUN if [ "$INSTALL_PNPM" = "true" ]; then \
        npm install -g pnpm@latest; \
    fi

# Switch to the node user
USER node

# Set up shell customizations
# Install starship prompt
RUN curl -fsSL https://starship.rs/install.sh | sh -s -- --yes
RUN echo 'eval "$(starship init bash)"' >> ~/.bashrc

# Create starship config
RUN mkdir -p /home/node/.config
COPY .devcontainer/starship.toml /home/node/.config/starship.toml

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && sudo apt update \
    && sudo apt install gh -y

# Set up workspace directory
WORKDIR /workspace

# Copy package files for dependency installation
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node packages/ui-kit/package.json ./packages/ui-kit/
COPY --chown=node:node packages/showcase/package.json ./packages/showcase/

# Install dependencies
RUN if [ "$INSTALL_PNPM" = "true" ]; then \
        pnpm install --frozen-lockfile; \
    else \
        npm ci; \
    fi

# Install Playwright browsers
RUN if [ "$INSTALL_PNPM" = "true" ]; then \
        cd packages/showcase && pnpm exec playwright install --with-deps; \
    else \
        cd packages/showcase && npx playwright install --with-deps; \
    fi

# Set up git configuration template
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false \
    && git config --global core.autocrlf input

# Create directories for persistent volumes
RUN mkdir -p /home/node/.local/share/pnpm \
    && mkdir -p /home/node/.cache/ms-playwright

# Set environment variables
ENV NODE_ENV=development
ENV PLAYWRIGHT_BROWSERS_PATH=/home/node/.cache/ms-playwright

# Default command
CMD ["sleep", "infinity"] 