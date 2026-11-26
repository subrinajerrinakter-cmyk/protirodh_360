/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#124840',
          teal: '#087E74',
          lightTeal: '#0E9F92',
          cream: '#F7F8F5',
          slate: '#243447',
          muted: '#52667A',
          amber: '#D97706',
          red: '#DC2626',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E8F0',
          tint: '#EBF5F3',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans Bengali"', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1120px',
      }
    },
  },
  plugins: [],
}
