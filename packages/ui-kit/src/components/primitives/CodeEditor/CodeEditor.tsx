import { useEffect, useRef } from "react";
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
  const observerRef = useRef<MutationObserver | null>(null);

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
            backgroundColor: "hsl(var(--background))",
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
          // Ensure proper contrast for line numbers
          ".cm-lineNumbers": {
            color: "hsl(var(--muted-foreground))",
            backgroundColor: "hsl(var(--background))",
          },
          ".cm-lineNumbers .cm-gutterElement": {
            color: "hsl(var(--muted-foreground))",
          },
          // Ensure proper contrast for selection
          ".cm-selectionBackground": {
            backgroundColor: "hsl(var(--accent) / 0.3)",
          },
          "&.cm-focused .cm-selectionBackground": {
            backgroundColor: "hsl(var(--accent) / 0.3)",
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
          if (update.focusChanged) {
            const focused = update.view.hasFocus;
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

      // Comprehensive accessibility setup
      // We need to ensure CodeMirror's editor is properly accessible
      const editorElement = view.dom;

      // Remove any existing accessibility attributes that might conflict
      editorElement.removeAttribute("role");
      editorElement.removeAttribute("aria-label");
      editorElement.removeAttribute("tabindex");

      // Set proper accessibility attributes
      editorElement.setAttribute("role", "textbox");
      editorElement.setAttribute("aria-label", ariaLabel || "Code editor");
      editorElement.setAttribute("aria-multiline", "true");
      editorElement.setAttribute("tabindex", disabled ? "-1" : "0");

      if (ariaLabelledby)
        editorElement.setAttribute("aria-labelledby", ariaLabelledby);
      if (ariaDescribedby)
        editorElement.setAttribute("aria-describedby", ariaDescribedby);
      if (ariaRequired !== undefined)
        editorElement.setAttribute("aria-required", ariaRequired.toString());
      if (ariaInvalid !== undefined)
        editorElement.setAttribute("aria-invalid", ariaInvalid.toString());
      editorElement.setAttribute("aria-disabled", disabled.toString());
      editorElement.setAttribute("aria-readonly", readOnly.toString());

      // Fix CodeMirror's internal accessibility issues
      // Use a more robust approach with MutationObserver to handle dynamic changes
      const fixInternalAccessibility = () => {
        // Find and fix all problematic elements
        const contentElement = editorElement.querySelector(".cm-content");
        if (contentElement) {
          // Remove conflicting roles and attributes
          contentElement.removeAttribute("role");
          contentElement.removeAttribute("tabindex");
          contentElement.removeAttribute("aria-label");
          contentElement.removeAttribute("contenteditable");

          // Ensure it's not focusable
          contentElement.setAttribute("tabindex", "-1");
        }

        // Remove roles from any other elements that might have them
        const elementsWithRole =
          editorElement.querySelectorAll('[role="textbox"]');
        elementsWithRole.forEach((element) => {
          if (element !== editorElement) {
            element.removeAttribute("role");
          }
        });

        // Remove tabindex from internal elements
        const focusableElements = editorElement.querySelectorAll(
          '[tabindex]:not([tabindex="-1"])',
        );
        focusableElements.forEach((element) => {
          if (element !== editorElement) {
            element.setAttribute("tabindex", "-1");
          }
        });

        // Remove aria-label from internal elements to avoid conflicts
        const elementsWithAriaLabel =
          editorElement.querySelectorAll("[aria-label]");
        elementsWithAriaLabel.forEach((element) => {
          if (element !== editorElement) {
            element.removeAttribute("aria-label");
          }
        });

        // Ensure no duplicate IDs exist
        const elementsWithId = editorElement.querySelectorAll("[id]");
        const seenIds = new Set();
        elementsWithId.forEach((element) => {
          const id = element.getAttribute("id");
          if (id && seenIds.has(id)) {
            element.removeAttribute("id");
          } else if (id) {
            seenIds.add(id);
          }
        });
      };

      // Apply fixes immediately
      fixInternalAccessibility();

      // Set up MutationObserver to handle dynamic changes
      const observer = new MutationObserver(() => {
        fixInternalAccessibility();
      });

      observer.observe(editorElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [
          "role",
          "tabindex",
          "aria-label",
          "contenteditable",
          "id",
        ],
      });

      // Also set up a periodic check as a fallback
      const intervalId = setInterval(fixInternalAccessibility, 100);

      viewRef.current = view;
      observerRef.current = observer;

      return () => {
        view.destroy();
        viewRef.current = null;
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        clearInterval(intervalId);
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
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      ariaRequired,
      ariaInvalid,
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
      className={cn("relative", disabled && "pointer-events-none opacity-50")}
      data-testid={dataTestId}
    >
      <div
        ref={editorRef}
        className={cn(
          "min-h-[100px] w-full rounded-md border border-input bg-background text-sm",
          className,
        )}
      />
    </div>
  );
};
