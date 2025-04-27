import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',       // App Router
    './components/*.{ts,tsx}',// Reusable UI
    './src/components/*.{ts,tsx}',// Reusable UI
    './forms/*.{ts,tsx}',// Reusable UI
    './src/forms/*.{ts,tsx}',// Reusable UI
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '-100%' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
