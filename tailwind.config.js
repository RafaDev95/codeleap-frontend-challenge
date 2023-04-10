/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Roboto', 'sans-serif'"
      },
      colors: {
        'main-blue': '#7695EC',
        'text-secondary': '#777777'
      },
      fontSize: {
        sm: '16px',
        md: '18px',
        lg: '22px'
      }
    }
  },
  plugins: []
}
