/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#CBD8DF",
      black: "#141E26",
      primary: "#1E5067",
      secondary: "#9AC5D3",
      accent: "#159AB7",
      accent1: "#F77474",
      accent2: "#3DB842",
      skin: "#E4B3BA",
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      screens: {
        xsm: "360px",
      },
    },
  },
  plugins: [],
};
