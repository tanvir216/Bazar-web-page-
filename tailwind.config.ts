import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1D271F",
        leaf: "#05893E",
        "leaf-strong": "#047F39",
        "leaf-soft": "#F3FBF4",
        paper: "#F0F5F0",
        surface: "#FAFCFA",
        line: "#E1E8E1",
        rise: "#D03739",
        fall: "#1A9951",
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
          primary: "#05893E",
          "primary-content": "#F3FBF4",
          secondary: "#F59E0B",
          accent: "#D03739",
          neutral: "#1D271F",
          "base-100": "#FAFCFA",
          "base-200": "#F0F5F0",
          "base-300": "#E1E8E1",
          "base-content": "#1D271F",
          info: "#0369a1",
          success: "#1A9951",
          warning: "#F59E0B",
          error: "#D03739",
          "--rounded-btn": "0.5rem",
        },
      },
    ],
  },
};
export default config;
