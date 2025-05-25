/// <reference types="vite/client" />

// Declare JSON module types for i18n
declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
} 