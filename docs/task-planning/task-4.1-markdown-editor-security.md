# Task 4.1: Implement CSP & DOMPurify wrapper in MarkdownEditor

**Sprint**: 4 - Polish, Security & Release Readiness  
**Priority**: High (Security-critical component)  
**Estimated Effort**: 1-2 days

## Objective

Create a secure MarkdownEditor component that sanitizes user input to prevent XSS attacks, implementing Content Security Policy (CSP) and DOMPurify integration.

## Task Breakdown

| Sub-task | Description                                                | DoD                                                    | Status |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------ | ------ |
| 4.1.1    | Install required dependencies (DOMPurify, markdown parser) | Dependencies added to package.json and installed       | ✓      |
| 4.1.2    | Create MarkdownEditor component structure                  | Component files created with TypeScript types          | ✓      |
| 4.1.3    | Implement markdown parsing with sanitization               | Component renders markdown with DOMPurify sanitization | ✓      |
| 4.1.4    | Add comprehensive security tests                           | XSS payload test passes, output is sanitized           | ✓      |
| 4.1.5    | Create Storybook stories                                   | Stories demonstrate component functionality            | ✓      |
| 4.1.6    | Add accessibility features                                 | Component meets a11y guidelines                        | ✓      |
| 4.1.7    | Document CSP configuration                                 | CSP setup documented for consumers                     | ✓      |

## PR Status

**PR Created**: [#24 - feat: Implement secure MarkdownEditor component with XSS protection](https://github.com/etherisc/ui-kit/pull/24)

**Status**: Ready for review

All DoD criteria have been met and the implementation is complete. The PR includes:

- Secure MarkdownEditor component with XSS protection
- Comprehensive test suite with security tests
- Storybook stories and documentation
- TypeScript types and accessibility features
- Basic sanitization implementation

## Technical Requirements

### Dependencies to Add

- `dompurify` - HTML sanitization library
- `@types/dompurify` - TypeScript types for DOMPurify
- `marked` or `remark` - Markdown parsing library
- `@types/marked` (if using marked) - TypeScript types

### Component Structure

```
src/components/primitives/MarkdownEditor/
├── index.ts                 # Barrel export
├── types.ts                 # TypeScript interfaces
├── MarkdownEditor.tsx       # Main component
├── MarkdownEditor.test.tsx  # Unit tests
├── MarkdownEditor.stories.tsx # Storybook stories
└── utils/
    ├── sanitizer.ts         # DOMPurify wrapper
    └── csp.ts              # CSP utilities
```

### Security Features

1. **Input Sanitization**: All HTML output sanitized via DOMPurify
2. **XSS Prevention**: Comprehensive test suite with malicious payloads
3. **CSP Integration**: Content Security Policy configuration guidance
4. **Safe Defaults**: Restrictive sanitization by default, opt-in for advanced features

### Component API Design

```typescript
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  sanitizeOptions?: DOMPurify.Config;
  allowedTags?: string[];
  className?: string;
  "data-testid"?: string;
}
```

## Definition of Done (DoD)

### Primary Criteria

- [ ] MarkdownEditor component exists with TypeScript types
- [ ] DOMPurify integration sanitizes HTML output
- [ ] Security unit test feeds XSS payload and verifies output is sanitised
- [ ] Storybook story demonstrates the component
- [ ] Component follows accessibility guidelines
- [ ] CSP configuration is documented

### Additional Quality Gates

- [ ] Unit test coverage ≥ 90%
- [ ] All accessibility tests pass (axe-core)
- [ ] Component exports added to barrel files
- [ ] TypeScript compilation passes without errors
- [ ] ESLint passes without warnings
- [ ] Storybook builds successfully
- [ ] Visual regression tests pass

## Security Test Cases

### XSS Prevention Tests

1. **Script injection**: `<script>alert('xss')</script>`
2. **Event handlers**: `<img src="x" onerror="alert('xss')">`
3. **JavaScript URLs**: `<a href="javascript:alert('xss')">link</a>`
4. **Data URLs**: `<iframe src="data:text/html,<script>alert('xss')</script>"></iframe>`
5. **Style injection**: `<div style="background:url(javascript:alert('xss'))">content</div>`

### Markdown-specific Tests

1. **HTML in markdown**: Mixed markdown with HTML tags
2. **Link injection**: `[text](javascript:alert('xss'))`
3. **Image injection**: `![alt](javascript:alert('xss'))`
4. **Raw HTML blocks**: HTML code blocks in markdown

## Implementation Notes

### DOMPurify Configuration

- Use strict whitelist approach
- Allow only safe HTML tags by default
- Provide configuration options for advanced use cases
- Strip all JavaScript-related attributes

### CSP Recommendations

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
```

### Accessibility Considerations

- Proper ARIA labels for editor areas
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast mode support

## Testing Strategy

### Unit Tests

- Component rendering
- Props handling
- Sanitization functionality
- Error boundaries
- Edge cases

### Security Tests

- XSS payload injection
- Sanitization verification
- CSP compliance
- Safe output validation

### Integration Tests

- Storybook interaction tests
- Form integration
- Real-world usage scenarios

## Documentation Requirements

### Component Documentation

- Props API reference
- Usage examples
- Security considerations
- CSP setup guide

### Security Documentation

- Threat model
- Mitigation strategies
- Configuration options
- Best practices

## Risks and Mitigations

### Risks

1. **Performance impact** from sanitization
2. **Over-sanitization** breaking legitimate content
3. **CSP conflicts** with existing applications
4. **Accessibility regressions**

### Mitigations

1. Optimize sanitization performance, consider memoization
2. Provide configurable sanitization options
3. Document CSP requirements clearly
4. Comprehensive a11y testing

## Success Criteria

1. **Security**: All XSS test cases pass
2. **Functionality**: Component works as expected in Storybook
3. **Performance**: No significant bundle size increase
4. **Accessibility**: Meets WCAG 2.1 AA standards
5. **Documentation**: Clear setup and usage instructions
6. **Integration**: Works seamlessly with existing form components
