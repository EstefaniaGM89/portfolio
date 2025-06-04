// tailwind.config.cjs
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
        'slide-up-aligned': 'slide-up-aligned 1.4s ease-out forwards', // ✅ añadido
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up-aligned': {
          from: { opacity: '0', transform: 'translateY(100px)' },
          to: { opacity: '1', transform: 'translateY(-60px)' },
        }, // ✅ añadido
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
