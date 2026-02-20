/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#121212',
        surfaceGlass: 'rgba(255, 255, 255, 0.05)',
        primary: {
          warm: '#FFB347',
          cool: '#4A90E2',
        },
        accent: {
          amber: '#FFB347',
          blue: '#4A90E2',
          purple: '#9B59B6',
        },
      },
      boxShadow: {
        'glow-warm': '0 0 40px rgba(255, 179, 71, 0.3)',
        'glow-cool': '0 0 40px rgba(74, 144, 226, 0.3)',
        'glow-strong': '0 0 60px rgba(255, 179, 71, 0.5)',
        'glow-soft': '0 0 20px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
