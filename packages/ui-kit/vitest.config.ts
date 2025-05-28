/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/tests/e2e/**",
      "**/playwright/**",
      "**/tests/visual/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
        "src/**/*.stories.{js,ts,jsx,tsx}",
        "src/test/**",
        "src/stories/**",
        "**/*.config.{js,ts}",
        "**/index.ts",
        "src/i18n/config.ts",
        "src/lib/utils.ts",
        "src/utils/cn.ts",
        "src/utils/index.ts",
        "src/components/ui/**",
        "storybook-static/**",
        "scripts/**",
        "playwright.config.ts",
        "postcss.config.js",
        "tailwind.config.js",
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 60,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
