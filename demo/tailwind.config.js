const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    "**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}
