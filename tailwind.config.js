/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      Primary: ["'Oswald'", 'sans-serif'],
      Secondary: ["'Raleway'", 'sans-serif'],
      // Oswald: ["'Oswald'", 'sans-serif'],
      // Montserrat: ["'Montserrat'", 'sans-serif'],
      // Bebas: ["'Bebas Neue'", 'sans-serif'],
      // Roboto: ["'Roboto'", 'sans-serif'],
      // Raleway: ["'Raleway'", 'sans-serif'],
      // Header: ["'Bebas Neue'", 'sans-serif'],
      // Normal: ["'Raleway'", 'sans-serif'],
    },
    animation: {
      'spin-slow': 'spin 2s linear infinite',
      'spin-normal': 'spin 1.5s linear infinite',
      'spin-slow-reverse': 'spin 1.75s linear reverse infinite',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
