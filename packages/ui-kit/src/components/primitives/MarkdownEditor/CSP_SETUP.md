# Content Security Policy Setup for MarkdownEditor

This document provides guidance on setting up Content Security Policy (CSP) headers when using the MarkdownEditor component to ensure both security and functionality.

## Overview

Content Security Policy (CSP) is a security standard that helps prevent Cross-Site Scripting (XSS) attacks by controlling which resources can be loaded and executed by the browser. The MarkdownEditor component requires specific CSP directives to function properly while maintaining security.

## Quick Setup

### Basic CSP Configuration

For most applications, use this moderate security configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
```

### Implementation Methods

#### 1. HTTP Header (Recommended)

Add the CSP header to your server responses:

```javascript
// Express.js example
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  );
  next();
});
```

#### 2. Meta Tag

Add a meta tag to your HTML head:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'"
/>
```

## Security Levels

### Strict Security (Highest Security)

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
```

**Pros:**

- Maximum security
- No inline styles allowed
- Strict resource loading

**Cons:**

- May require additional configuration for styling
- More complex setup for dynamic content

### Moderate Security (Recommended)

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
```

**Pros:**

- Good balance of security and functionality
- Allows inline styles for component styling
- Supports data URLs for images

**Cons:**

- Slightly less secure due to 'unsafe-inline'

### Permissive Security (Development/Testing)

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: *; font-src 'self' *; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
```

**Pros:**

- Easy to implement
- Minimal configuration required
- Good for development environments

**Cons:**

- Less secure
- Not recommended for production

## Directive Explanations

| Directive                          | Purpose                               | MarkdownEditor Requirements                     |
| ---------------------------------- | ------------------------------------- | ----------------------------------------------- |
| `default-src 'self'`               | Default policy for all resource types | Required for basic functionality                |
| `script-src 'self'`                | Controls script execution             | No inline scripts needed                        |
| `style-src 'self' 'unsafe-inline'` | Controls stylesheet loading           | Inline styles needed for component styling      |
| `img-src 'self' data: https:`      | Controls image loading                | Data URLs and HTTPS images for markdown content |
| `font-src 'self'`                  | Controls font loading                 | System fonts and component fonts                |
| `connect-src 'self'`               | Controls network requests             | API calls and resource loading                  |
| `object-src 'none'`                | Blocks plugins and objects            | Security best practice                          |
| `base-uri 'self'`                  | Controls base URL                     | Prevents base tag injection                     |
| `form-action 'self'`               | Controls form submissions             | Prevents form hijacking                         |

## Advanced Configuration

### Using Nonces for Inline Styles

For stricter security, use nonces instead of 'unsafe-inline':

```javascript
import { generateCSPNonce } from "@your-org/ui-kit";

// Generate nonce for each request
const nonce = generateCSPNonce();

// Set CSP header with nonce
res.setHeader(
  "Content-Security-Policy",
  `default-src 'self'; script-src 'self'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'`,
);

// Pass nonce to your application
res.render("index", { nonce });
```

### Framework-Specific Examples

#### Next.js

```javascript
// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
```

#### Vite

```javascript
// vite.config.js
export default {
  server: {
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
    },
  },
};
```

## Troubleshooting

### Common Issues

#### 1. Styles Not Loading

**Error:** `Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'"`

**Solution:** Add `'unsafe-inline'` to `style-src` or implement nonce-based CSP.

```
style-src 'self' 'unsafe-inline'
```

#### 2. Images Not Loading

**Error:** `Refused to load the image because it violates the following Content Security Policy directive: "img-src 'self'"`

**Solution:** Add appropriate domains to `img-src`:

```
img-src 'self' data: https: *.example.com
```

#### 3. Fonts Not Loading

**Error:** `Refused to load the font because it violates the following Content Security Policy directive: "font-src 'self'"`

**Solution:** Add font domains to `font-src`:

```
font-src 'self' fonts.googleapis.com fonts.gstatic.com
```

### Debugging CSP Issues

1. **Check Browser Console:** Look for CSP violation errors
2. **Use Report-Only Mode:** Test CSP without blocking resources
3. **Gradual Implementation:** Start with permissive policy and tighten gradually

```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
```

## Testing CSP Configuration

### Manual Testing

1. Load your application with the MarkdownEditor
2. Check browser console for CSP violations
3. Test all component features (edit, preview, styling)
4. Verify images and links work correctly

### Automated Testing

```javascript
// Example test using the CSP utilities
import { validateCSPCompatibility } from "@your-org/ui-kit";

describe("CSP Compatibility", () => {
  it("should be compatible with MarkdownEditor", () => {
    const result = validateCSPCompatibility();
    expect(result.compatible).toBe(true);
    expect(result.issues).toHaveLength(0);
  });
});
```

## Security Considerations

### What CSP Protects Against

- **XSS Attacks:** Prevents execution of malicious scripts
- **Data Injection:** Controls resource loading sources
- **Clickjacking:** Prevents embedding in malicious frames
- **Mixed Content:** Enforces HTTPS for resources

### What CSP Doesn't Protect Against

- **Server-side vulnerabilities:** SQL injection, etc.
- **Social engineering:** User-targeted attacks
- **Physical access:** Local machine compromises
- **Logic flaws:** Application-specific vulnerabilities

### Best Practices

1. **Start Strict:** Begin with restrictive policy and relax as needed
2. **Monitor Violations:** Set up CSP reporting to catch issues
3. **Regular Reviews:** Update CSP as application evolves
4. **Test Thoroughly:** Verify all functionality works with CSP
5. **Document Changes:** Keep track of CSP modifications

## Resources

- [MDN CSP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator Tool](https://csp-evaluator.withgoogle.com/)
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

## Support

If you encounter issues with CSP configuration while using the MarkdownEditor component, please:

1. Check this documentation for common solutions
2. Verify your CSP syntax using online validators
3. Test with a more permissive policy to isolate the issue
4. Consult the browser console for specific violation details
