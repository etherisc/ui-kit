/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    {
      pattern: /^text-(primary|secondary|accent)-foreground$/,
    },
    {
      pattern:
        /^(flex|inline-flex|grid|col-span|row-span|gap[xy]?|place-(items|content))-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /^(items|justify|content|self)-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /^-?m[trblxy]?-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /^p[trblxy]?-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /^(w|h|min-w|max-w|min-h|max-h|z)-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /^(rounded|font|leading|tracking|line-clamp)-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern:
        /^((border|text|ring|shadow)(-(t|b|l|r|x|y|0|2|4|8|solid|dashed|dotted|none))?)$/,
      variants: ["sm", "md", "lg"],
    },
  ],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
