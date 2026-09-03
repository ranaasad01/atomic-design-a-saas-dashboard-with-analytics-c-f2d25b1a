import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#2563eb",
          "primary-dark": "#1d4ed8",
          "primary-light": "#eff6ff",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          indigo: "#6366f1",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
