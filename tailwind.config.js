/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  future: "all",
  purge: {
    mode: "all",
    content: [
      "./**/*.tsx",
      "./**/*.ts",
      "./index.html",
    ],
  },
  theme: {
    extend: { fontFamily: { sans: ["Inter var", ...defaultTheme.fontFamily.sans] } },
    container: { center: true },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
}
/* eslint-enable @typescript-eslint/no-var-requires */
