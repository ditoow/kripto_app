/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8758f3",
        "primary-dark": "#7040d6",
        "primary-light": "#a78bfa",
        "background-dark": "#0a0a0f",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(118, 64, 242, 0.5)",
        "glow-sm": "0 0 10px rgba(118, 64, 242, 0.3)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "night"],
    base: true,
    styled: true,
    utils: true,
  },
};
