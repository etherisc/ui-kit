# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace configuration and root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Copy all package.json files to enable proper dependency resolution
COPY packages/ui-kit/package.json ./packages/ui-kit/
COPY packages/showcase/package.json ./packages/showcase/

# Install all dependencies for the workspace
RUN pnpm install

# Copy all source code
COPY . .

# Build all packages
RUN pnpm build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/packages/ui-kit/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 