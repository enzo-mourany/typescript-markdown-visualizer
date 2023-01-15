/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      typography: {
          css: {
            h2: {
              color: colors.red['600'],
            },
          },
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'),],
}
