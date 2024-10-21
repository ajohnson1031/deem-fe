/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          50: "#FAF4F1",
          100: "#eee8e5",
          200: "#e1dcd9",
          300: "#d5cfcd",
          400: "#c8c3c1",
          500: "#bcb7b5",
          600: "#afaba9",
          700: "#a39f9d",
          800: "#969291",
          900: "#8a8685",
          950: "#7d7a79",
        },
        accent: {
          50: "#D1EDC0",
          100: "#c7e1b6",
          200: "#bcd5ad",
          300: "#b2c9a3",
          400: "#a7be9a",
          500: "#9db290",
          600: "#92a686",
          700: "#889a7d",
          800: "#7d8e73",
          900: "#73826a",
          950: "#697760",
        },
        mango: {
          50: "#ffab99",
          100: "#ff8166",
          200: "#ff7052",
          300: "#ff5f3d",
          400: "#ff5733",
          500: "#f25330",
          600: "#d94a2b",
          700: "#bf4126",
          800: "#a63921",
          900: "#8c301c",
          950: "#732717",
        },
      },
      width: {
        65: "65%",
        85: "85%",
        "9/10": "90%",
      },
      boxShadow: {
        giftcard: "0 2px 2px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [require("tailwindcss-elevation")],
};
