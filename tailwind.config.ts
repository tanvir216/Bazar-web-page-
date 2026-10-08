import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        leaf: "#0A0A0A",
        paper: "#F5F5F5",
        line: "#E2E2E2",
        up: "#0A0A0A",
        down: "#0A0A0A",
        haldi: "#FFFFFF",
        pata: "#0A0A0A",
        rise: "#0A0A0A",
        fall: "#9A9A9A",
      },
      fontFamily: {
        sans: ["var(--font-hind)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-hind)",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        bazar: {
                   primary: "#0A0A0A",
          "primary-content": "#ffffff",
          secondary: "#FFFFFF",
          accent: "#0A0A0A",
          neutral: "#0A0A0A",
          "base-100": "#ffffff",
          "base-200": "#F5F5F5",
          "base-300": "#E2E2E2",
          "base-content": "#0A0A0A",
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
