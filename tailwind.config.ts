/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gem: {
          dark: '#0a0a0f',
          darker: '#060609',
          card: '#111118',
          surface: '#1a1a24',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        gold: {
          DEFAULT: '#d4a853',
          light: '#f0d27a',
          dark: '#c9952a',
          muted: 'rgba(212, 168, 83, 0.2)',
        },
        emerald: {
          gem: '#2dd4a0',
        },
        ruby: {
          gem: '#ef4444',
        },
        sapphire: {
          gem: '#60a5fa',
        },
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 168, 83, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 168, 83, 0.4)' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4a853, #f0d27a, #c9952a)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0f, #111118)',
        'hero-overlay': 'linear-gradient(180deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.3) 40%, rgba(10,10,15,0.8) 100%)',
      },
      boxShadow: {
        'gold': '0 4px 15px rgba(212, 168, 83, 0.3)',
        'gold-lg': '0 8px 30px rgba(212, 168, 83, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
