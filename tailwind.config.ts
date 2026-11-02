import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F1",
        blush: "#FADADD",
        sage: "#D6E9DB",
        lilac: "#E9D5FF",
        butter: "#FFD56B",
        coral: "#FF7A7A",
        charcoal: "#2E2E2E",
        gold: "#B8862B",
        maroon: "#9B1C3B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      borderRadius: { "2xl": "1.25rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(46,46,46,0.04), 0 10px 30px -12px rgba(46,46,46,0.15)",
        lift: "0 2px 4px rgba(46,46,46,0.05), 0 22px 45px -15px rgba(46,46,46,0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
