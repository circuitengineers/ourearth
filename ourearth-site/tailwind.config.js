/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          dark: "#12211D",
          mid: "#1D3129",
          deep: "#0F1C18",
        },
        moss: "#5C7A5E",
        paper: {
          DEFAULT: "#F3EEE0",
          dim: "#E9E2CF",
        },
        ink: {
          DEFAULT: "#1B1B16",
          soft: "#4A4A3F",
        },
        gold: "#B8863B",
        teal: "#3E7C82",
        brick: "#A24B3B",
        slate: "#4A5A73",
        line: "rgba(27,27,22,0.14)",
        "line-dark": "rgba(243,238,224,0.16)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
