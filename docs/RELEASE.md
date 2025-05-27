# Release Process

This document describes how to create releases for the UI Kit library.

## Overview

The UI Kit uses automated releases via GitHub Actions with the following components:

- **GitHub Packages**: For npm package distribution
- **GitHub Pages**: For Storybook documentation deployment
- **GitHub Releases**: For release notes and changelog

## Release Types

### Beta Releases

Beta releases are used for testing and early feedback. They are marked as pre-releases.

- Version format: `v0.1.0-beta`, `v0.2.0-beta.1`, etc.
- Published to GitHub Packages with `beta` tag
- Storybook deployed to GitHub Pages
- Marked as pre-release in GitHub

### Stable Releases

Stable releases are production-ready versions.

- Version format: `v1.0.0`, `v1.1.0`, etc.
- Published to GitHub Packages with `latest` tag
- Storybook deployed to GitHub Pages
- Marked as stable release in GitHub

## Creating a Release

### Method 1: Using Git Tags (Recommended)

1. **Prepare the release**:

   ```bash
   ./scripts/release.sh v0.1.0-beta
   ```

2. **Create and push the tag**:

   ```bash
   git tag v0.1.0-beta
   git push origin v0.1.0-beta
   ```

3. **Monitor the workflow**:
   - Go to [GitHub Actions](../../actions/workflows/release.yml)
   - Watch the release workflow complete
   - Verify the package is published to [GitHub Packages](../../packages)
   - Verify Storybook is deployed to [GitHub Pages](https://etherisc.github.io/ui-kit/)

### Method 2: Manual Workflow Dispatch

1. **Go to GitHub Actions**:

   - Navigate to [Release Workflow](../../actions/workflows/release.yml)
   - Click "Run workflow"
   - Enter the version (e.g., `v0.1.0-beta`)
   - Click "Run workflow"

2. **Monitor the workflow** (same as above)

## Release Workflow

The release workflow performs the following steps:

1. **Build and Test**:

   - Install dependencies
   - Run tests and linting
   - Build the package
   - Check bundle size (must be < 250KB gzipped)
   - Build Storybook

2. **Publish Package**:

   - Update package.json (remove private flag, set registry)
   - Publish to GitHub Packages

3. **Deploy Documentation**:

   - Add build info to Storybook
   - Deploy to GitHub Pages

4. **Create Release**:
   - Generate release notes
   - Create GitHub Release with changelog

## Verification

After a successful release, verify:

1. **Package Published**:

   ```bash
   npm info @org/ui-kit@0.1.0-beta
   ```

2. **Storybook Deployed**:

   - Visit: https://etherisc.github.io/ui-kit/
   - Check build info in browser console: `window.BUILD_INFO`

3. **GitHub Release Created**:
   - Check [Releases page](../../releases)
   - Verify release notes and assets

## Troubleshooting

### Package Publishing Fails

- Check GitHub Packages permissions
- Verify `GITHUB_TOKEN` has `packages:write` permission
- Ensure package name doesn't conflict

### Storybook Deployment Fails

- Check GitHub Pages is enabled in repository settings
- Verify workflow has `pages:write` permission
- Check for build errors in Storybook

### Release Creation Fails

- Verify `GITHUB_TOKEN` has `contents:write` permission
- Check for duplicate tags
- Ensure release notes generation succeeds

## Version Management

The project uses [Changesets](https://github.com/changesets/changesets) for version management:

1. **Create changeset**:

   ```bash
   npx changeset
   ```

2. **Version packages**:

   ```bash
   npx changeset version
   ```

3. **Publish** (handled by CI):
   ```bash
   npx changeset publish
   ```

## Beta Release Checklist

- [ ] All tests pass
- [ ] Bundle size is under 250KB gzipped
- [ ] Storybook builds successfully
- [ ] All accessibility tests pass
- [ ] Documentation is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version follows semver (e.g., `0.1.0-beta`)

## Stable Release Checklist

- [ ] Beta testing completed
- [ ] All known issues resolved
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Documentation finalized
- [ ] Migration guide prepared (if needed)
- [ ] Version follows semver (e.g., `1.0.0`)
