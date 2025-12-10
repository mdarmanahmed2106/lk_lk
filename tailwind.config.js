/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lk-teal': '#1D7C8D',
        'lk-mustard': '#D4A05A',
        'lk-coral': '#FF6B6B',
        'lk-grey-soft': '#F7F7F7',
        'lk-grey-border': '#E2E2E2',
        'lk-text': '#1C1C1C',
        'lk-text-light': '#626262',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.08)',
        'float': '0 10px 30px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
