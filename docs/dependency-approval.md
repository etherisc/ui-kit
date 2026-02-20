# Third-Party Dependency Approval Register

All third-party dependencies used in this project have been reviewed and approved
for inclusion. This document serves as the approval record required by CON-PFM-010.

## Approval Criteria

Each dependency is evaluated against:

- **Security**: No known critical vulnerabilities (checked via `pnpm audit`)
- **License**: MIT, Apache-2.0, or ISC (permissive, SaaS-compatible)
- **Maintenance**: Active maintenance, recent releases within 12 months
- **Quality**: Adequate test coverage, TypeScript support preferred

## UI Kit (`packages/ui-kit`)

### Runtime Dependencies (peerDependencies)

| Package   | Version | License | Purpose       | Status   |
| --------- | ------- | ------- | ------------- | -------- |
| react     | ^19.1.0 | MIT     | UI framework  | Approved |
| react-dom | ^19.1.0 | MIT     | DOM rendering | Approved |

### Runtime Dependencies (dependencies)

| Package                  | Version  | License                 | Purpose                                | Status   |
| ------------------------ | -------- | ----------------------- | -------------------------------------- | -------- |
| @radix-ui/\*             | various  | MIT                     | Accessible UI primitives (Shadcn base) | Approved |
| @tanstack/react-table    | ^8.21.3  | MIT                     | Headless table logic                   | Approved |
| lucide-react             | ^0.487.0 | ISC                     | Icon library                           | Approved |
| nanoid                   | ^5.1.5   | MIT                     | ID generation                          | Approved |
| class-variance-authority | ^0.7.1   | Apache-2.0              | Variant class builder                  | Approved |
| clsx                     | ^2.1.1   | MIT                     | Class name utility                     | Approved |
| tailwind-merge           | ^3.0.2   | MIT                     | Tailwind class merging                 | Approved |
| tailwindcss-animate      | ^1.0.7   | MIT                     | Animation utilities                    | Approved |
| zustand                  | ^5.0.5   | MIT                     | State management                       | Approved |
| react-hook-form          | ^7.56.4  | MIT                     | Form management                        | Approved |
| @hookform/resolvers      | ^5.0.1   | MIT                     | Form validation resolvers              | Approved |
| zod                      | ^3.25.7  | MIT                     | Schema validation                      | Approved |
| date-fns                 | ^4.1.0   | MIT                     | Date utilities                         | Approved |
| react-day-picker         | ^8.10.1  | MIT                     | Date picker component                  | Approved |
| i18next                  | ^25.1.3  | MIT                     | Internationalization                   | Approved |
| react-i18next            | ^15.5.2  | MIT                     | React i18n bindings                    | Approved |
| @codemirror/\*           | various  | MIT                     | Code editor                            | Approved |
| marked                   | ^15.0.12 | MIT                     | Markdown parser                        | Approved |
| dompurify                | ^3.2.6   | (Apache-2.0 OR MPL-2.0) | HTML sanitizer                         | Approved |

### Dev Dependencies

| Package     | Version | License    | Purpose                 | Status   |
| ----------- | ------- | ---------- | ----------------------- | -------- |
| tailwindcss | ^3.4.17 | MIT        | CSS framework           | Approved |
| typescript  | ^5.8.3  | Apache-2.0 | Type checking           | Approved |
| vitest      | ^3.1.3  | MIT        | Test runner             | Approved |
| storybook   | ^8.6.14 | MIT        | Component documentation | Approved |
| tsup        | ^8.5.0  | MIT        | Build tool              | Approved |
| eslint      | ^9.27.0 | MIT        | Linter                  | Approved |

## Showcase (`packages/showcase`)

| Package          | Version | License | Purpose                         | Status   |
| ---------------- | ------- | ------- | ------------------------------- | -------- |
| @faker-js/faker  | ^9.8.0  | MIT     | Mock data generation (dev only) | Approved |
| bcryptjs         | ^3.0.2  | MIT     | Password hashing (demo)         | Approved |
| sql.js           | ^1.12.0 | MIT     | In-browser SQLite (demo)        | Approved |
| react-router-dom | ^7.6.0  | MIT     | Client routing                  | Approved |

## Review Schedule

Dependencies are reviewed quarterly or when major version updates are available.
Last full review: 2026-02-20.
