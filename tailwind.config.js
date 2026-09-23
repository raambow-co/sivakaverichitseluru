/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark-navy"]'],
  theme: {
    extend: {
      colors: {
        // Base Dominant: Clean White
        white: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        },
        // Rich Dark Luxury Navy Blue Palette (#071A36 / #051226 / #040E1E) with Gold Accents
        navy: {
          DEFAULT: '#071A36',
          dark: '#051226',
          deep: '#040E1E',
          light: '#0D254C',
          surface: '#EEF4FB',
          subtle: 'rgba(7, 26, 54, 0.06)',
          glass: 'rgba(7, 26, 54, 0.96)',
        },
        forest: {
          DEFAULT: '#071A36',
          dark: '#051226',
          deep: '#040E1E',
          light: '#0D254C',
          surface: '#EEF4FB',
          subtle: 'rgba(7, 26, 54, 0.06)',
          glass: 'rgba(7, 26, 54, 0.96)',
        },
        // Tertiary: 24K Luxury Gold
        gold: {
          DEFAULT: '#C59B27',
          light: '#E6C665',
          dark: '#9A7416',
          champagne: '#F4E4BA',
          subtle: 'rgba(197, 155, 39, 0.12)',
          border: 'rgba(197, 155, 39, 0.35)',
        },
        charcoal: {
          DEFAULT: '#071A36',
          light: '#2C3E55',
          muted: '#5B6F88',
        },
      },
      fontFamily: {
        teluguDisplay: ['"Noto Serif Telugu"', 'Suranna', 'serif'],
        teluguBody: ['"Noto Sans Telugu"', 'sans-serif'],
        display: ['Cinzel', '"Plus Jakarta Sans"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        '3d-gold': '0 20px 40px -15px rgba(197, 155, 39, 0.35), 0 0 20px rgba(197, 155, 39, 0.15)',
        '3d-card': '0 15px 35px -10px rgba(7, 26, 54, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        '3d-hover': '0 25px 50px -12px rgba(7, 26, 54, 0.16), 0 0 0 1px rgba(197, 155, 39, 0.4)',
        '3d-navy-card': '0 25px 50px -12px rgba(4, 14, 30, 0.5), 0 0 0 1px rgba(197, 155, 39, 0.35)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'shimmer-fast': 'shimmerFast 2.5s infinite linear',
        'coin-spin': 'coinSpin 10s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.06)' },
        },
        shimmerFast: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        coinSpin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
