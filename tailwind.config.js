/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins-Regular'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-extra-bold': ['Poppins-ExtraBold'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-light': ['Poppins-Light'],
      },
    },
  },
  plugins: [],
};
