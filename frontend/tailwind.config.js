/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Cinzel', 'serif'],
      },
      colors: {
        italian: {
          cream: '#F5F2EA',
          marble: '#E6E2DD',
          olive: '#556B2F',
          terracotta: '#C17C5D',
          charcoal: '#2C2C2C',
          gold: '#D4AF37',
        }
      }
    },
  },
  plugins: [],
}
