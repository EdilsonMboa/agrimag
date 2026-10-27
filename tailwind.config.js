/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        agriGreen: '#079A48',
        agriDark: '#03454D',
        agriMint: '#DDF6E8',
        agriSand: '#F3EEE4',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'DM Sans', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 40px rgba(3, 69, 77, 0.10)',
        card: '0 10px 30px rgba(3, 69, 77, 0.08)',
        floating: '0 28px 70px rgba(3, 69, 77, 0.28)',
      },
      backgroundImage: {
        'grain-light': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
