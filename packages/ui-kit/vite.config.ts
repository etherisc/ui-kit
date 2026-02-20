import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    cssFileName: "index",
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@radix-ui\//,
        /^@codemirror\//,
        /^@sentry\//,
        "codemirror",
        "@hookform/resolvers",
        "class-variance-authority",
        "clsx",
        "cmdk",
        "date-fns",
        "dompurify",
        "i18next",
        "i18next-browser-languagedetector",
        "input-otp",
        "lucide-react",
        "marked",
        "react-day-picker",
        "react-hook-form",
        "react-i18next",
        "react-resizable-panels",
        "embla-carousel-react",
        "sonner",
        "tailwind-merge",
        "tslog",
        "vaul",
        "zod",
        "zustand",
      ],
    },
    sourcemap: true,
    minify: false,
    target: "es2020",
    outDir: "dist",
    emptyOutDir: true,
  },
  esbuild: {
    jsx: "automatic",
    jsxDev: false,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
