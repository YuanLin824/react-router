import js from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

const eslintConfig = defineConfig([
  globalIgnores([
    ".husky",
    ".react-router",
    "build",
    "node_modules",

    "commitlint.config.cjs",
    "package-lock.json",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended,
    ],

    rules: {
      "no-empty-pattern": "off",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-floating-promises": "off",
    },
  },
])

export default eslintConfig
