export type CodeLanguage =
  | "javascript"
  | "typescript"
  | "css"
  | "html"
  | "json"
  | "markdown"
  | "plaintext";

export type CodeTheme = "light" | "dark";

export interface CodeEditorProps {
  /** The code content to display/edit */
  value: string;
  /** Callback when the code content changes */
  onChange?: (value: string) => void;
  /** Programming language for syntax highlighting */
  language?: CodeLanguage;
  /** Theme for the editor */
  theme?: CodeTheme;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Height of the editor */
  height?: string | number;
  /** Minimum height of the editor */
  minHeight?: string | number;
  /** Maximum height of the editor */
  maxHeight?: string | number;
  /** Whether to show line numbers */
  lineNumbers?: boolean;
  /** Whether to enable line wrapping */
  lineWrapping?: boolean;
  /** Whether to enable search functionality */
  searchEnabled?: boolean;
  /** Whether to enable bracket matching */
  bracketMatching?: boolean;
  /** Whether to enable auto-completion */
  autocompletion?: boolean;
  /** Tab size for indentation */
  tabSize?: number;
  /** Whether to use spaces instead of tabs */
  indentWithTabs?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA labelledby for accessibility */
  "aria-labelledby"?: string;
  /** ARIA describedby for accessibility */
  "aria-describedby"?: string;
  /** Whether the field is required */
  "aria-required"?: boolean;
  /** Whether the field has an error */
  "aria-invalid"?: boolean;
  /** Callback when editor gains focus */
  onFocus?: () => void;
  /** Callback when editor loses focus */
  onBlur?: () => void;
  /** Test ID for testing */
  "data-testid"?: string;
}
