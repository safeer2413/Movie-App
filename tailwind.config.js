/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 add this line
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto Slab"', "serif"],
        raleway: ['"Raleway"', "sans-serif"],
      },
      colors: {
        primary: "#3f7fff",
        secondary: "#eeeeff",
        accent: "#8080fb",
        shade: "#e3e4fd80",
      },
    },
  },
  plugins: [],
};
