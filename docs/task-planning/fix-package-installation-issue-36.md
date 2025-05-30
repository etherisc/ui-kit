# Task Planning: Fix Package Installation Issue #36

**GitHub Issue**: #36 - Package installation fails when used as dependency - blocks all consumers  
**Priority**: HIGH - Critical blocker for all package consumers  
**Estimated Duration**: 1-2 days  
**Branch**: `fix/package-installation-issue-36`

## Problem Summary

The `@etherisc/ui-kit` package cannot be installed as a dependency in consumer projects due to:

1. Husky prepare script failing in consumer environments
2. Package marked as private preventing npm publishing
3. Monorepo structure confusion for consumers
4. Missing proper peer dependencies configuration

## Task Breakdown

| Task Description                                                                                                                  | DoD (Definition of Done)                                                                                                                           | Status   |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **1. Fix Husky Prepare Script** - Update root package.json prepare script to be conditional and not fail in consumer environments | Root package.json prepare script runs without error when package is installed as dependency; test installation in sample consumer project succeeds | Complete |
| **2. Make UI Kit Package Publishable** - Remove private flag and configure package.json for npm publishing                        | packages/ui-kit/package.json has private: false; proper peer dependencies defined; package can be published to npm                                 | Complete |
| **3. Configure npm Publishing** - Update changesets config and GitHub Actions for npm registry publishing                         | .changeset/config.json updated for public access; GitHub Actions workflow can publish to npm registry; npm publish workflow exists                 | Complete |
| **4. Optimize Package for Consumers** - Clean up package.json scripts and dependencies for consumer use                           | Only essential scripts remain in published package.json; dev dependencies properly separated; bundle size optimized                                | Complete |
| **5. Test Package Installation** - Create test consumer project and verify installation works                                     | Can install via `pnpm add @etherisc/ui-kit`; can install via `pnpm add github:etherisc/ui-kit`; components import and render correctly             | Complete |
| **6. Update Documentation** - Add installation instructions and usage examples                                                    | README.md includes clear installation instructions; CONTRIBUTING.md updated with publishing workflow                                               | Complete |

## Technical Implementation Details

### Phase 1: Immediate Fixes

- Update root `package.json` prepare script to be conditional
- Remove `"private": true` from ui-kit package.json
- Add proper peer dependencies (React 18+)
- Configure proper package exports

### Phase 2: Publishing Setup

- Update changesets configuration for public access
- Configure GitHub Actions for npm publishing
- Test publishing workflow

### Phase 3: Consumer Optimization

- Remove development-only scripts from published package
- Ensure proper file inclusion via "files" field
- Optimize bundle for consumer use

### Phase 4: Testing & Documentation

- Create sample consumer project for testing
- Test both npm and GitHub installation methods
- Update documentation with installation instructions

## Expected Outcomes

After completion:

- ✅ Consumers can install package without errors
- ✅ Package available on npm registry with proper versioning
- ✅ GitHub installation method also works reliably
- ✅ Reduced installation overhead (no dev dependencies)
- ✅ Clear documentation for consumers

## Test Criteria

1. **Installation Test**: `pnpm add @etherisc/ui-kit` completes successfully
2. **GitHub Installation Test**: `pnpm add github:etherisc/ui-kit` completes successfully
3. **Import Test**: Components can be imported: `import { Button } from '@etherisc/ui-kit'`
4. **Build Test**: Consumer project builds successfully with ui-kit components
5. **Runtime Test**: Components render and function correctly in consumer app

## Dependencies

- Requires access to npm registry for publishing
- May need GitHub token with package write permissions
- Changesets configuration for version management

## Risks & Mitigation

**Risk**: Breaking existing development workflow  
**Mitigation**: Test all development commands after changes

**Risk**: Publishing misconfiguration  
**Mitigation**: Test publishing in separate environment first

**Risk**: Bundle size increase for consumers  
**Mitigation**: Verify file inclusion and exclude dev dependencies
