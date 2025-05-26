import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    exclude: ["**/node_modules/**", "**/tests/e2e/**", "**/playwright/**"],
  },
});
