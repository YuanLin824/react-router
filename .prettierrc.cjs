/** @type {import('prettier').Config} */

module.exports = {
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-css-order",
  ],
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: "es5",
  quoteProps: "as-needed",
  bracketSpacing: true,
  arrowParens: "always",
}
