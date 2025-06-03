import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  minify: false,
  target: "es2020",
  outDir: "dist",
  esbuildOptions: (options) => {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
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
