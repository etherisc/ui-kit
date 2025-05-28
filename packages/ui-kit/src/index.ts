// Core components
export * from "./components";

// Layout components - using named exports to avoid conflicts
export {
  AppShell,
  AuthShell,
  MinimalShell,
  WizardShell,
  ErrorShell,
  MainFixedLayout,
  DataDenseLayout,
} from "./layout";

// Data components
export * from "./data";

// Theme utilities
export * from "./theme";

// Providers - using explicit exports to avoid naming conflicts
export { ThemeProvider } from "./providers/ThemeProvider";
export { ToastProvider, useToastContext } from "./providers/ToastProvider";
export type {
  ToastVariant,
  Toast as ToastType,
  ToastOptions,
} from "./providers/ToastProvider";
export { I18nProvider } from "./providers/I18nProvider";
export {
  ErrorBoundary,
  withErrorBoundary,
} from "./components/providers/ErrorBoundary";
export type { ErrorBoundaryProps } from "./components/providers/ErrorBoundary";

// Hooks
export * from "./hooks";

// Utils
export * from "./utils";

// i18n
export { i18n } from "./i18n";
export { useTranslation } from "react-i18next";

// Components
export * from "./components/primitives";

// Types
export type { ComponentProps } from "react";
