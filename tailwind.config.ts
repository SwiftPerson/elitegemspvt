/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via a class on the html element
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Optionally add custom colors – for an elegant scheme, you might add a gold color:
      colors: {
        gold: {
          DEFAULT: '#FFC107',
          400: '#FFCA28',
          500: '#FFB300'
        }
      }
    },
  },
  plugins: [],
};
