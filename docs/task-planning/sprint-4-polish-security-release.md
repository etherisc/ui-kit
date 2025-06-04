# Sprint 4 — Polish, Security & Release Readiness

**Sprint Goal**: Implement security measures, error handling, bundle optimization, documentation, and prepare for the first beta release.

## Task Overview

| Task | Description                                                                    | DoD (Definition of Done)                                                                     | Status |
| ---- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------ |
| 4.1  | Implement CSP & DOMPurify wrapper in MarkdownEditor                            | Security unit test feeds XSS payload; output sanitised.                                      | ✓      |
| 4.2  | Add Sentry ErrorBoundary + tslog logger                                        | Fake error in story captured by mocked Sentry client in test.                                | ✓      |
| 4.3  | Size‑limit CI check (< 1MB/1.5MB gz for core bundle)                           | `npm run size-limit` passes.                                                                 | ✓      |
| 4.4  | Prepare **CONTRIBUTING.md**, PR template, CODEOWNERS                           | Presence verified by doc‑lint script.                                                        | ✓      |
| 4.5  | Publish first `v0.1.0-beta` to GitHub Packages; deploy Storybook demo to Pages | Tag `v0.1.0-beta` exists; npm info returns package; Pages URL accessible & shows build hash. | ✓      |

## Detailed Task Breakdown

### Task 4.1: Implement CSP & DOMPurify wrapper in MarkdownEditor

**Objective**: Create a secure MarkdownEditor component that sanitizes user input to prevent XSS attacks.

**Requirements**:

- Create a MarkdownEditor component in `src/components/primitives/MarkdownEditor/`
- Integrate DOMPurify for HTML sanitization
- Implement Content Security Policy (CSP) headers
- Add comprehensive security tests

**DoD Criteria**:

- [ ] MarkdownEditor component exists with TypeScript types
- [ ] DOMPurify integration sanitizes HTML output
- [ ] Security unit test feeds XSS payload and verifies output is sanitised
- [ ] Storybook story demonstrates the component
- [ ] Component follows accessibility guidelines
- [ ] CSP configuration is documented

**Dependencies**:

- DOMPurify package
- Markdown parsing library (e.g., marked, remark)

---

### Task 4.2: Add Sentry ErrorBoundary + tslog logger

**Objective**: Implement comprehensive error handling and logging infrastructure.

**Requirements**:

- Create ErrorBoundary component with Sentry integration
- Set up tslog for structured logging
- Add error reporting to Storybook stories
- Create logging utilities and hooks

**DoD Criteria**:

- [ ] ErrorBoundary component wraps application sections
- [ ] Sentry client configuration for error reporting
- [ ] tslog logger with different log levels
- [ ] Fake error in story captured by mocked Sentry client in test
- [ ] Error boundary UI displays user-friendly error messages
- [ ] Logging utilities are documented

**Dependencies**:

- @sentry/react package
- tslog package

---

### Task 4.3: Size‑limit CI check (< 1MB/1.5MB gz for core bundle)

**Objective**: Implement bundle size monitoring to ensure the library stays performant.

**Requirements**:

- Configure size-limit tool
- Set up CI check for bundle size
- Create size budget for core components
- Add size reporting to PR comments

**DoD Criteria**:

- [ ] size-limit configuration file exists
- [ ] `npm run size-limit` command passes
- [ ] CI workflow includes size check
- [ ] Core bundle size is under 1MB/1.5MB gzipped
- [ ] Size budget alerts on significant increases
- [ ] Documentation explains size optimization strategies

**Dependencies**:

- size-limit package
- GitHub Actions workflow updates

---

### Task 4.4: Prepare CONTRIBUTING.md, PR template, CODEOWNERS

**Objective**: Create comprehensive project documentation and governance files.

**Requirements**:

- Write detailed CONTRIBUTING.md guide
- Create PR template with checklist
- Set up CODEOWNERS file for review assignments
- Add issue templates

**DoD Criteria**:

- [ ] CONTRIBUTING.md exists with development setup instructions
- [ ] PR template includes checklist for code quality
- [ ] CODEOWNERS file assigns appropriate reviewers
- [ ] Issue templates for bugs and features
- [ ] Presence verified by doc‑lint script
- [ ] Documentation is clear and actionable

**Dependencies**: None

---

### Task 4.5: Publish first v0.1.0-beta to GitHub Packages; deploy Storybook demo to Pages

**Objective**: Prepare and execute the first beta release with public documentation.

**Requirements**:

- Configure GitHub Packages publishing
- Set up GitHub Pages for Storybook deployment
- Create release workflow
- Update package.json for beta release

**DoD Criteria**:

- [ ] GitHub Packages publishing workflow configured
- [ ] Storybook builds and deploys to GitHub Pages
- [ ] Tag `v0.1.0-beta` exists in repository
- [ ] `npm info` returns published package information
- [ ] Pages URL accessible & shows build hash
- [ ] Release notes document new features
- [ ] Beta release announcement prepared

**Dependencies**:

- GitHub Actions workflows
- Package registry configuration
- Changesets for version management

## Implementation Order

1. **Task 4.1** (MarkdownEditor) - Foundation security component
2. **Task 4.2** (Error handling) - Infrastructure for monitoring
3. **Task 4.3** (Bundle size) - Performance monitoring
4. **Task 4.4** (Documentation) - Project governance
5. **Task 4.5** (Release) - Public availability

## Notes

- All tasks should maintain existing test coverage
- Security considerations are paramount for tasks 4.1 and 4.2
- Bundle size optimization may require refactoring existing components
- Release preparation should include comprehensive testing across all environments
