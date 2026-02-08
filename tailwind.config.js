/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-dark': '#0f0f0f',
        'luxury-charcoal': '#1a1a1a',
        'luxury-gold': '#d4af37',
        'luxury-gold-light': '#f4d160',
        'luxury-gold-dark': '#b8960f',
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
