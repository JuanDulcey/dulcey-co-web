import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#040405',
        ivory: '#F4F4F6',
        platinum: '#A1A1AA',
        muted: '#84848F',
        gold: {
          DEFAULT: '#C5A059',
          light: '#E5C787',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.25em',
      },
      boxShadow: {
        executive:
          '0 30px 90px -20px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(197, 160, 89, 0.14)',
      },
    },
  },
  plugins: [],
} satisfies Config;
