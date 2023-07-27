/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // defining the own custom color variables...
    colors: {
      primary: colors.slate[50],
      secondary: colors.slate[400],
      accent: colors.slate[950],
      white: colors.white
    }
  },
  plugins: [],
}

