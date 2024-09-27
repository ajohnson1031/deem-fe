/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBG: "#003F4E",
      },
    },
  },
  plugins: [require("tailwindcss-elevation")],
};
