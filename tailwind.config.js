/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#06050c',
        glassBg: 'rgba(15, 12, 30, 0.45)',
        glassBorder: 'rgba(255, 255, 255, 0.06)',
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        secondary: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'blob-spin-1': 'blob-spin-1 25s infinite alternate ease-in-out',
        'blob-spin-2': 'blob-spin-2 30s infinite alternate ease-in-out',
        'blob-spin-3': 'blob-spin-3 20s infinite alternate ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'pulse-glow': 'pulse-glow 4s infinite ease-in-out',
      },
      keyframes: {
        'blob-spin-1': {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' },
          '33%': { transform: 'translate(100px, 80px) scale(1.2) rotate(120deg)', borderRadius: '70% 30% 52% 48% / 60% 40% 60% 40%' },
          '66%': { transform: 'translate(-50px, 120px) scale(0.85) rotate(240deg)', borderRadius: '28% 72% 37% 63% / 51% 43% 57% 49%' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(360deg)', borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' },
        },
        'blob-spin-2': {
          '0%': { transform: 'translate(0px, 0px) scale(1.1) rotate(360deg)', borderRadius: '50% 50% 30% 70% / 50% 60% 40% 50%' },
          '50%': { transform: 'translate(-120px, -60px) scale(0.9) rotate(180deg)', borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' },
          '100%': { transform: 'translate(0px, 0px) scale(1.1) rotate(0deg)', borderRadius: '50% 50% 30% 70% / 50% 60% 40% 50%' },
        },
        'blob-spin-3': {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' },
          '50%': { transform: 'translate(80px, -100px) scale(1.3) rotate(-180deg)', borderRadius: '60% 40% 40% 60% / 60% 40% 60% 40%' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
