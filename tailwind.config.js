/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBG: "#1C1917",
      },
      width: {
        85: "85%",
      },
    },
  },
  plugins: [require("tailwindcss-elevation")],
};
