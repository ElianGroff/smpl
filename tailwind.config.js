/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'font1': ['Maven Pro'],
      'font2': ['Roboto'],
      'font3': ['Reem Kufi'],
      'iter': ['Iter', 'sans-serif']
    },
    extend: {
      screens: {
        'sm' : { 'max' : '450px'}
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
