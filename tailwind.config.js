/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      colors: {
        clay: {
          50:  "#faf5f0",
          100: "#f4e8d8",
          200: "#e8cfae",
          300: "#d9ae7e",
          400: "#c98d52",
          500: "#b97035",
          600: "#9c5828",
          700: "#7d4322",
          800: "#653621",
          900: "#3d1f10",
        },
      },
    },
  },
  // DaisyUI plugin — compatible with Tailwind v3
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        // Custom light theme matching our clay palette
        tileslight: {
          "primary":          "#b97035",
          "primary-content":  "#ffffff",
          "secondary":        "#7d4322",
          "secondary-content":"#ffffff",
          "accent":           "#d9ae7e",
          "neutral":          "#3d1f10",
          "base-100":         "#faf5f0",
          "base-200":         "#f4e8d8",
          "base-300":         "#e8cfae",
          "base-content":     "#2d2016",
          "info":             "#3b82f6",
          "success":          "#22c55e",
          "warning":          "#f59e0b",
          "error":            "#ef4444",
        },
      },
    ],
    darkTheme: false,
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
