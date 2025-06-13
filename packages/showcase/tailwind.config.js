import daisyui from "daisyui";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Ensure DaisyUI component classes are always generated
    // DaisyUI + component-specific blocks
    {
      pattern:
        /^(btn|input|card|modal|drawer|navbar)(-(primary|secondary|accent|neutral|body|title|actions|box|backdrop|content|side))?$/,
    },
    // Base and utility background/text/border classes
    {
      pattern:
        /^(bg|text|border)-(base-\d{3}|primary|secondary|accent|neutral)$/,
    },
    {
      pattern: /^text-(primary|secondary|accent)-foreground$/,
    },
    // responsive classes
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
    /*
    {
      pattern:
        /^(block|inline|inline-block|hidden|visible|invisible|relative|absolute|fixed|sticky)/,
      variants: ["sm", "md", "lg"],
    },
    */
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      fontFamily: {
        "plus-jakarta": ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--color-primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
          light: "var(--color-success-light)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          light: "var(--color-danger-light)",
        },
        // Nexadash color palette
        gray: {
          DEFAULT: "var(--color-gray)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
        },
        "light-theme": "var(--color-light-theme)",
        "light-orange": "var(--color-light-orange)",
        "light-blue": "var(--color-light-blue)",
        "light-purple": "var(--color-light-purple)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        "3xl": "var(--shadow-3xl)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [daisyui, tailwindcssAnimate],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
};
