import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#171513",
          light: "#23201D",
          dark: "#0F0E0C",
          surface: "#1F1C1A",
          muted: "#35312C",
        },
        ivory: {
          DEFAULT: "#F7F3ED",
          light: "#FAF7F2",
          dark: "#EDE6DA",
        },
        sand: {
          DEFAULT: "#DED4C7",
          light: "#EAE3DA",
          dark: "#C8BCAD",
        },
        taupe: {
          DEFAULT: "#A99B8B",
          light: "#BDB0A2",
          dark: "#8C7E6E",
        },
        gold: {
          DEFAULT: "#B99A68",
          light: "#CEB385",
          dark: "#9E7F4E",
          subtle: "#F4EEE3",
        },
        olive: {
          DEFAULT: "#4E5548",
          light: "#646C5C",
          dark: "#393F34",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "Inter", "-apple-system", "sans-serif"],
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        "subtle": "0 4px 20px -2px rgba(23, 21, 19, 0.05)",
        "card": "0 10px 30px -5px rgba(23, 21, 19, 0.08)",
        "drawer": "-10px 0 40px rgba(23, 21, 19, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
