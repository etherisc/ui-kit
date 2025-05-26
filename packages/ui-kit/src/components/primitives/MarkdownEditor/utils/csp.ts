/**
 * Content Security Policy utilities for MarkdownEditor
 */

/**
 * CSP directive configuration
 */
export interface CSPConfig {
  /** Allow inline styles */
  allowInlineStyles?: boolean;
  /** Allow data URLs for images */
  allowDataUrls?: boolean;
  /** Additional trusted domains for images */
  imageDomains?: string[];
  /** Additional trusted domains for fonts */
  fontDomains?: string[];
  /** Custom nonce for inline styles */
  nonce?: string;
}

/**
 * Generate a secure nonce for CSP
 */
export function generateCSPNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

/**
 * Build Content Security Policy header value for markdown content
 */
export function buildCSP(config: CSPConfig = {}): string {
  const {
    allowInlineStyles = true,
    allowDataUrls = false,
    imageDomains = [],
    fontDomains = [],
    nonce,
  } = config;

  const directives: string[] = [
    "default-src 'self'",
    "script-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  // Style sources
  const styleSources = ["'self'"];
  if (allowInlineStyles) {
    if (nonce) {
      styleSources.push(`'nonce-${nonce}'`);
    } else {
      styleSources.push("'unsafe-inline'");
    }
  }
  directives.push(`style-src ${styleSources.join(" ")}`);

  // Image sources
  const imageSources = ["'self'"];
  if (allowDataUrls) {
    imageSources.push("data:");
  }
  imageSources.push("https:");
  if (imageDomains.length > 0) {
    imageSources.push(...imageDomains);
  }
  directives.push(`img-src ${imageSources.join(" ")}`);

  // Font sources
  const fontSources = ["'self'"];
  if (fontDomains.length > 0) {
    fontSources.push(...fontDomains);
  }
  directives.push(`font-src ${fontSources.join(" ")}`);

  // Connection sources
  directives.push("connect-src 'self'");

  return directives.join("; ");
}

/**
 * Get recommended CSP configuration for different security levels
 */
export function getRecommendedCSP(
  level: "strict" | "moderate" | "permissive" = "moderate",
): string {
  switch (level) {
    case "strict":
      return buildCSP({
        allowInlineStyles: false,
        allowDataUrls: false,
        imageDomains: [],
        fontDomains: [],
      });

    case "moderate":
      return buildCSP({
        allowInlineStyles: true,
        allowDataUrls: false,
        imageDomains: [],
        fontDomains: [],
      });

    case "permissive":
      return buildCSP({
        allowInlineStyles: true,
        allowDataUrls: true,
        imageDomains: ["*"],
        fontDomains: ["*"],
      });

    default:
      return buildCSP();
  }
}

/**
 * CSP documentation and setup guide
 */
export const CSP_DOCUMENTATION = {
  overview: `
Content Security Policy (CSP) helps prevent XSS attacks by controlling which resources
can be loaded and executed by the browser. The MarkdownEditor component requires specific
CSP directives to function properly while maintaining security.
  `,

  implementation: `
To implement CSP for MarkdownEditor:

1. Add CSP header to your server responses:
   Content-Security-Policy: ${getRecommendedCSP("moderate")}

2. Or use a meta tag in your HTML:
   <meta http-equiv="Content-Security-Policy" content="${getRecommendedCSP("moderate")}">

3. For stricter security, use nonce-based CSP:
   const nonce = generateCSPNonce();
   // Add nonce to CSP header and pass to component
  `,

  troubleshooting: `
Common CSP issues with MarkdownEditor:

1. Inline styles blocked: Add 'unsafe-inline' to style-src or use nonces
2. Images not loading: Ensure img-src includes necessary domains
3. Fonts not loading: Add font domains to font-src directive
4. Console errors: Check browser dev tools for CSP violation reports
  `,

  examples: {
    strict: getRecommendedCSP("strict"),
    moderate: getRecommendedCSP("moderate"),
    permissive: getRecommendedCSP("permissive"),
  },
};

/**
 * Validate if current page CSP is compatible with MarkdownEditor
 */
export function validateCSPCompatibility(): {
  compatible: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check if CSP is present
  const cspMeta = document.querySelector(
    'meta[http-equiv="Content-Security-Policy"]',
  );
  const cspHeader = document.querySelector(
    'meta[http-equiv="content-security-policy"]',
  );

  if (!cspMeta && !cspHeader) {
    recommendations.push("Consider implementing CSP for enhanced security");
  }

  // Basic compatibility check (simplified)
  try {
    // Test if inline styles work
    const testElement = document.createElement("div");
    testElement.style.display = "none";
    document.body.appendChild(testElement);
    document.body.removeChild(testElement);
  } catch {
    issues.push("Inline styles may be blocked by CSP");
    recommendations.push(
      "Add 'unsafe-inline' to style-src or implement nonce-based CSP",
    );
  }

  return {
    compatible: issues.length === 0,
    issues,
    recommendations,
  };
}
