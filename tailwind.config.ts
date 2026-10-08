import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12261C",
        leaf: "#166534",
        paper: "#F6F8F3",
        line: "#DDE5D8",
        up: "#15803D",
        down: "#DC2626",
      },
      fontFamily: { sans: ["var(--font-hind)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        bazar: {
          primary: "#166534",
          "primary-content": "#ffffff",
          secondary: "#F59E0B",
          accent: "#DC2626",
          neutral: "#12261C",
          "base-100": "#ffffff",
          "base-200": "#F6F8F3",
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
