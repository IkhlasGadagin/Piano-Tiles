/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        particle: {
          '0%': { transform: 'scale(1) translateY(0)', opacity: '1' },
          '100%': { transform: 'scale(0) translateY(20px)', opacity: '0' }
        },
        perfect: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'particle': 'particle 0.3s ease-out forwards',
        'perfect': 'perfect 0.5s ease-out'
      }
    },
  },
  plugins: [],
}