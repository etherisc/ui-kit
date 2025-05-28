import { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { searchKeymap } from "@codemirror/search";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { cn } from "../../../utils/cn";
import type { CodeEditorProps, CodeLanguage } from "./types";

const getLanguageExtension = (language: CodeLanguage): Extension | null => {
  switch (language) {
    case "javascript":
    case "typescript":
      return javascript({ typescript: language === "typescript" });
    case "css":
      return css();
    case "html":
      return html();
    case "json":
      return json();
    case "markdown":
      return markdown();
    case "plaintext":
    default:
      return null;
  }
};

export const CodeEditor = ({
  value,
  onChange,
  language = "plaintext",
  theme = "light",
  readOnly = false,
  disabled = false,
  placeholder,
  height = "200px",
  minHeight,
  maxHeight,
  lineNumbers = true,
  lineWrapping = false,
  searchEnabled = true,
  bracketMatching = true,
  autocompletion = true,
  tabSize = 2,
  indentWithTabs = false,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  onFocus,
  onBlur,
  "data-testid": dataTestId,
}: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(
    function setupEditor() {
      if (!editorRef.current) return;

      const extensions: Extension[] = [
        basicSetup,
        EditorView.theme({
          "&": {
            height: typeof height === "number" ? `${height}px` : height,
            ...(minHeight && {
              minHeight:
                typeof minHeight === "number" ? `${minHeight}px` : minHeight,
            }),
            ...(maxHeight && {
              maxHeight:
                typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
            }),
          },
          ".cm-content": {
            padding: "12px",
            minHeight: "100%",
            fontSize: "14px",
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            lineHeight: "1.5",
            color: "hsl(var(--foreground))",
          },
          ".cm-focused": {
            outline: "2px solid hsl(var(--ring))",
            outlineOffset: "2px",
          },
          ".cm-editor": {
            borderRadius: "calc(var(--radius) - 2px)",
            border: "1px solid hsl(var(--border))",
            backgroundColor: "hsl(var(--background))",
          },
          ".cm-editor.cm-disabled": {
            opacity: "0.5",
            cursor: "not-allowed",
          },
          ".cm-scroller": {
            fontFamily: "inherit",
          },
          ".cm-placeholder": {
            color: "hsl(var(--muted-foreground))",
          },
          "&.cm-editor.cm-readonly .cm-content": {
            backgroundColor: "hsl(var(--muted) / 0.5)",
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
          if (update.focusChanged) {
            const focused = update.view.hasFocus;
            setIsFocused(focused);
            if (focused && onFocus) {
              onFocus();
            } else if (!focused && onBlur) {
              onBlur();
            }
          }
        }),
      ];

      // Add line wrapping
      if (lineWrapping) {
        extensions.push(EditorView.lineWrapping);
      }

      // Add tab size
      extensions.push(EditorState.tabSize.of(tabSize));

      // Add read-only state
      if (readOnly || disabled) {
        extensions.push(EditorState.readOnly.of(true));
      }

      // Add language extension
      const langExtension = getLanguageExtension(language);
      if (langExtension) {
        extensions.push(langExtension);
      }

      // Add theme
      if (theme === "dark") {
        extensions.push(oneDark);
      }

      // Add search keymap if enabled
      if (searchEnabled) {
        extensions.push(keymap.of(searchKeymap));
      }

      // Add tab handling
      if (indentWithTabs) {
        extensions.push(keymap.of([indentWithTab]));
      }

      // Add placeholder
      if (placeholder) {
        extensions.push(
          EditorView.theme({
            ".cm-placeholder": {
              color: "hsl(var(--muted-foreground))",
            },
          }),
        );
      }

      // Create editor state
      const state = EditorState.create({
        doc: value,
        extensions,
      });

      // Create editor view
      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      viewRef.current = view;

      return () => {
        view.destroy();
        viewRef.current = null;
      };
    },
    [
      value,
      language,
      theme,
      readOnly,
      disabled,
      height,
      minHeight,
      maxHeight,
      lineNumbers,
      lineWrapping,
      searchEnabled,
      bracketMatching,
      autocompletion,
      tabSize,
      indentWithTabs,
      placeholder,
      onChange,
      onFocus,
      onBlur,
    ],
  );

  // Update editor content when value prop changes
  useEffect(
    function updateEditorContent() {
      if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: value,
          },
        });
      }

      // No cleanup needed for this effect
      return undefined;
    },
    [value],
  );

  return (
    <div
      className={cn(
        "relative",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      data-testid={dataTestId}
    >
      <div
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-label={ariaLabel || "Code editor"}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "min-h-[100px] w-full rounded-md border border-input bg-background text-sm",
          isFocused && "ring-2 ring-ring ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
    </div>
  );
};
