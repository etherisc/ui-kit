import DOMPurify from "dompurify";
import type { SanitizeConfig, SecurityValidation } from "../types";

/**
 * Default safe HTML tags allowed in markdown content
 */
const DEFAULT_ALLOWED_TAGS = [
  // Text formatting
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "del",
  "ins",
  "mark",
  "small",
  "sub",
  "sup",
  // Headings
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // Lists
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  // Links and media
  "a",
  "img",
  // Code
  "code",
  "pre",
  "kbd",
  "samp",
  "var",
  // Tables
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "colgroup",
  "col",
  // Quotes and citations
  "blockquote",
  "cite",
  "q",
  // Structural
  "div",
  "span",
  "hr",
  // Abbreviations
  "abbr",
  "acronym",
  "address",
  "time",
];

/**
 * Default safe HTML attributes allowed in markdown content
 */
const DEFAULT_ALLOWED_ATTRIBUTES = [
  "href",
  "src",
  "alt",
  "title",
  "class",
  "id",
  "width",
  "height",
  "align",
  "valign",
  "colspan",
  "rowspan",
  "scope",
  "datetime",
  "cite",
  "lang",
  "dir",
  "aria-label",
  "aria-describedby",
  "aria-hidden",
  "role",
  "tabindex",
];

/**
 * Dangerous patterns that should never be allowed
 */
const DANGEROUS_PATTERNS = [
  /javascript:/gi,
  /data:text\/html/gi,
  /vbscript:/gi,
  /on\w+\s*=/gi, // Event handlers like onclick, onload, etc.
  /<script/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /<form/gi,
  /<input/gi,
  /<button/gi,
  /<select/gi,
  /<textarea/gi,
  /<style/gi,
  /<link/gi,
  /<meta/gi,
  /<base/gi,
];

/**
 * Create a DOMPurify configuration with security-focused defaults
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createSanitizeConfig(userConfig?: SanitizeConfig): any {
  const allowedTags = userConfig?.allowedTags
    ? [...DEFAULT_ALLOWED_TAGS, ...userConfig.allowedTags]
    : DEFAULT_ALLOWED_TAGS;

  const allowedAttributes = userConfig?.allowedAttributes
    ? [...DEFAULT_ALLOWED_ATTRIBUTES, ...userConfig.allowedAttributes]
    : DEFAULT_ALLOWED_ATTRIBUTES;

  return {
    // Use allowlist approach - only allow specified tags and attributes
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,

    // Security settings
    ALLOW_DATA_ATTR: false, // Disable data-* attributes by default
    ALLOW_UNKNOWN_PROTOCOLS: false,
    ALLOW_SELF_CLOSE_IN_ATTR: false,

    // URL handling
    ALLOWED_URI_REGEXP: userConfig?.allowDataUrls
      ? /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i
      : /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,

    // Sanitization behavior
    SANITIZE_DOM: true,
    SANITIZE_NAMED_PROPS: true,
    KEEP_CONTENT: true,

    // Return DOM instead of string for better performance
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,

    // Custom configuration overrides
    ...userConfig,
  };
}

/**
 * Validate content for security issues before sanitization
 */
function validateSecurity(content: string): SecurityValidation {
  const issues: string[] = [];
  let isSafe = true;

  // Check for dangerous patterns
  DANGEROUS_PATTERNS.forEach((pattern) => {
    if (pattern.test(content)) {
      issues.push(`Dangerous pattern detected: ${pattern.source}`);
      isSafe = false;
    }
  });

  // Check for excessive nesting (potential DoS)
  const nestingLevel = (content.match(/<[^>]+>/g) || []).length;
  if (nestingLevel > 1000) {
    issues.push("Excessive HTML nesting detected");
    isSafe = false;
  }

  // Check for extremely long content (potential DoS)
  if (content.length > 1000000) {
    // 1MB limit
    issues.push("Content size exceeds safety limits");
    isSafe = false;
  }

  return {
    isSafe,
    issues,
    sanitizedContent: content,
  };
}

/**
 * Sanitize HTML content using DOMPurify with security-focused configuration
 */
export function sanitizeHtml(
  html: string,
  config?: SanitizeConfig,
): { sanitized: string; wasSanitized: boolean; issues: string[] } {
  // Pre-validation
  const validation = validateSecurity(html);

  if (!validation.isSafe) {
    console.warn("Security issues detected in content:", validation.issues);
  }

  // Create sanitization configuration
  const sanitizeConfig = createSanitizeConfig(config);

  // Store original length for comparison
  const originalLength = html.length;

  // Sanitize the content
  const sanitized = String(DOMPurify.sanitize(html, sanitizeConfig));

  // Check if content was modified during sanitization
  const wasSanitized =
    sanitized.length !== originalLength || sanitized !== html;

  if (wasSanitized) {
    console.info("Content was sanitized during processing");
  }

  return {
    sanitized,
    wasSanitized,
    issues: validation.issues,
  };
}

/**
 * Check if a URL is safe for use in links and images
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);

    // Allow only safe protocols
    const safeProtocols = ["http:", "https:", "mailto:", "tel:"];
    return safeProtocols.includes(parsed.protocol);
  } catch {
    // Invalid URL
    return false;
  }
}

/**
 * Create a CSP-compliant nonce for inline styles if needed
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

/**
 * Get recommended Content Security Policy for markdown content
 */
export function getRecommendedCSP(): string {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}
