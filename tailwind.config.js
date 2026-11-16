/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        basta: {
          orange: '#FF6B00',
          yellow: '#FFD600',
          cyan: '#00C2CB',
          pink: '#E91E63',
          purple: '#6B21A8',
          dark: '#18141F',
          card: '#241D31'
        }
      },
      fontFamily: {
        comic: ['"Bangers"', '"Impact"', 'sans-serif'],
        display: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'pop': '4px 4px 0px 0px #000000',
        'pop-lg': '6px 6px 0px 0px #000000',
        'pop-hover': '2px 2px 0px 0px #000000',
      }
    },
  },
  plugins: [],
}
