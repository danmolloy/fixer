const plugin = require('tailwindcss/plugin')

const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '1/2': '50%',
        'main': '80%'
      },
      fontFamily: {
        title: ['var(--font-lobster)', ...fontFamily.sans],
        nunito: ['var(--font-nunito)', ...fontFamily.sans],
        mono: ['var(--font-inconsolata)', ...fontFamily.mono]
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ],
}