/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat'],
    },
    extend: {
      colors: {
        'initial': '#F4EDE26B',
        'default': '#E4DED6',
        'secondary': '#ECE5DC',
        'tertiary': '#D0CFCF',
        'final-color': '#980404',
        'btn-color': '#900404',
        'star-color': '#2596be',
        'font-color': '#2A2824',
        'bg-body': '#EBE9E9',
        'price-color': '#B1AA95',
        'pagination-color': '#E0D7C9',
      },
    },
  },
  plugins: [],
  // darkMode: 'class',
}
