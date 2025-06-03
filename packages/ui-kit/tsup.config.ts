import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  noExternal: ["nanoid"],
  minify: false,
  target: "es2020",
  outDir: "dist",
  platform: "browser",
  esbuildOptions: (options) => {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
    // Define globals for browser compatibility
    options.define = {
      global: "globalThis",
      "process.env.NODE_ENV": '"production"',
    };
  },
  banner: {
    js: '"use client";',
  },
  splitting: false,
  treeshake: true,
  // Keep CSS separate
  injectStyle: false,
  // Don't bundle CSS with JS
  onSuccess:
    'echo "✅ TypeScript library built successfully with declarations!"',
});
