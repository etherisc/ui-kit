import React, { useState, useCallback, useMemo, useEffect } from "react";
import { marked } from "marked";
import { cn } from "../../../lib/utils";
import type { MarkdownEditorProps } from "./types";

/**
 * Simple markdown parsing with basic security
 */
function parseMarkdown(content: string): string {
  try {
    // Basic marked configuration
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    const html = marked(content) as string;

    // Basic XSS protection - remove script tags and javascript: URLs
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "");
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "<p>Error parsing markdown content</p>";
  }
}

/**
 * MarkdownEditor component with basic security features
 */
export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Enter markdown content...",
  disabled = false,
  readOnly = false,
  className,
  "data-testid": dataTestId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  // Parse markdown content
  const parsedContent = useMemo(() => {
    if (!value.trim()) {
      return "";
    }
    return parseMarkdown(value);
  }, [value]);

  // Handle textarea changes
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!disabled && !readOnly) {
        onChange(event.target.value);
      }
    },
    [onChange, disabled, readOnly],
  );

  // Toggle between edit and preview modes
  const togglePreview = useCallback(() => {
    setIsPreview((prev) => !prev);
  }, []);

  // Handle keyboard shortcuts
  useEffect(
    function setupKeyboardShortcuts() {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === "p") {
          event.preventDefault();
          togglePreview();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [togglePreview],
  );

  const baseClasses = cn(
    "relative w-full rounded-md border border-input bg-background text-sm",
    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    {
      "opacity-50 cursor-not-allowed": disabled,
    },
    className,
  );

  const editorClasses = cn(
    "w-full min-h-[120px] p-3 bg-transparent border-none outline-none resize-none",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "font-mono text-sm leading-relaxed",
  );

  const previewClasses = cn(
    "w-full min-h-[120px] p-3 prose prose-sm max-w-none",
  );

  const toolbarClasses = cn(
    "flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50",
    "text-xs text-muted-foreground",
  );

  return (
    <div className={baseClasses} data-testid={dataTestId}>
      {/* Toolbar */}
      <div className={toolbarClasses}>
        <span>{isPreview ? "Preview" : "Edit"}</span>
        <button
          type="button"
          onClick={togglePreview}
          disabled={disabled}
          className={cn(
            "px-2 py-1 rounded text-xs font-medium transition-colors",
            "hover:bg-background focus:outline-none focus:ring-1 focus:ring-ring",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isPreview
              ? "bg-primary text-primary-foreground"
              : "bg-background text-foreground",
          )}
          aria-label={
            isPreview ? "Switch to edit mode" : "Switch to preview mode"
          }
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Editor/Preview Content */}
      <div className="relative">
        {isPreview ? (
          <div
            className={previewClasses}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
            aria-label={
              disabled ? "Markdown preview (disabled)" : "Markdown preview"
            }
            aria-describedby={ariaDescribedBy}
            {...(!disabled && { role: "region" })}
            {...(!disabled && { "aria-live": "polite" })}
            {...(!disabled && { tabIndex: 0 })}
          />
        ) : (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={editorClasses}
            aria-label={ariaLabel || "Markdown editor"}
            aria-describedby={ariaDescribedBy}
            spellCheck="true"
          />
        )}
      </div>
    </div>
  );
}
