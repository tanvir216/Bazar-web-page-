import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12261C",
        leaf: "#166534",
        paper: "#F3F5EE",
        line: "#DDE5D8",
        up: "#15803D",
        down: "#DC2626",
        haldi: "#F5B820",
        pata: "#123B28",
        rise: "#C4301C",
        fall: "#1A7B45",
      },
      fontFamily: {
        sans: ["var(--font-hind)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-hind)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        bazar: {
          primary: "#123B28",
          "primary-content": "#ffffff",
          secondary: "#F5B820",
          accent: "#C4301C",
          neutral: "#123B28",
          "base-100": "#ffffff",
          "base-200": "#F3F5EE",
          "base-300": "#DDE5D8",
          "base-content": "#12261C",
          info: "#0369a1",
          success: "#15803D",
          warning: "#F59E0B",
          error: "#DC2626",
          "--rounded-btn": "0.6rem",
        },
      },
    ],
  },
};
export default config;