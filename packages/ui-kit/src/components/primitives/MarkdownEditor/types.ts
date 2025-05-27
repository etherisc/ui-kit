import type { Config as DOMPurifyConfig } from "dompurify";

/**
 * Configuration options for markdown parsing and rendering
 */
export interface MarkdownOptions {
  /** Enable GitHub Flavored Markdown */
  gfm?: boolean;
  /** Enable line breaks */
  breaks?: boolean;
  /** Enable pedantic mode */
  pedantic?: boolean;
  /** Enable smart quotes and other typographic enhancements */
  smartypants?: boolean;
}

/**
 * Security configuration for HTML sanitization
 */
export interface SanitizeConfig extends Partial<DOMPurifyConfig> {
  /** Additional allowed HTML tags */
  allowedTags?: string[];
  /** Additional allowed attributes */
  allowedAttributes?: string[];
  /** Whether to allow data URLs in images */
  allowDataUrls?: boolean;
}

/**
 * Props for the MarkdownEditor component
 */
export interface MarkdownEditorProps {
  /** The markdown content value */
  value: string;
  /** Callback fired when the content changes */
  onChange: (value: string) => void;
  /** Placeholder text for the editor */
  placeholder?: string;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Custom sanitization options */
  sanitizeOptions?: SanitizeConfig;
  /** Markdown parsing options */
  markdownOptions?: MarkdownOptions;
  /** Additional CSS class name */
  className?: string;
  /** Test ID for testing purposes */
  "data-testid"?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA described by for accessibility */
  "aria-describedby"?: string;
}

/**
 * Internal state for the MarkdownEditor component
 */
export interface MarkdownEditorState {
  /** Whether the component is in preview mode */
  isPreview: boolean;
  /** Whether the component is focused */
  isFocused: boolean;
  /** Current cursor position */
  cursorPosition?: number;
}

/**
 * Result of markdown parsing and sanitization
 */
export interface ParsedMarkdown {
  /** The sanitized HTML output */
  html: string;
  /** Whether any content was sanitized/removed */
  wasSanitized: boolean;
  /** List of removed/sanitized elements */
  sanitizedElements?: string[];
}

/**
 * Security validation result
 */
export interface SecurityValidation {
  /** Whether the content is safe */
  isSafe: boolean;
  /** List of security issues found */
  issues: string[];
  /** Sanitized content */
  sanitizedContent: string;
}
