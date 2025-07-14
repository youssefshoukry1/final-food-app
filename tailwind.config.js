/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
  keyframes: {
    'glow-border': {
      '0%': {
        boxShadow: '0 0 0px rgba(255,115,0,0.4)',
        borderColor: 'rgba(255,115,0, 0.3)',
        borderWidth: '2px',
      },
      '50%': {
        boxShadow: '0 0 20px rgba(255,115,0,0.8)',
        borderColor: 'rgba(255,115,0, 1)',
        borderWidth: '4px',
      },
      '100%': {
        boxShadow: '0 0 0px rgba(255,115,0,0.4)',
        borderColor: 'rgba(255,115,0, 0.3)',
        borderWidth: '2px',
      },
    },
    'fade-slide-up': {
      '0%': { opacity: '1', transform: 'translateY(0)' },
      '100%': { opacity: '0', transform: 'translateY(-10px)' },
    },
  },
  animation: {
    'glow-border': 'glow-border 3s ease-in-out infinite',
    'fade-slide-up': 'fade-slide-up 0.3s ease-in forwards',
  },
}
  },
  plugins: [
    scrollbar,
  ],
}

