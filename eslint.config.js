import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ================= IGNORE =================
  {
    ignores: [
      "node_modules/**",
      "allure-results/**",
      "allure-report/**",
      "dist/**",
      "reports/**",
      "apps/**"
    ]
  },

  // ================= BASE CONFIG =================
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,

        // WDIO globals (VERY IMPORTANT for your project)
        browser: "readonly",
        driver: "readonly",
        $: "readonly",
        $$: "readonly",
        expect: "readonly"
      }
    },

    rules: {
      // ✅ good for automation projects
      "no-unused-vars": ["warn"],
      "no-console": "off", // we use logs intentionally
      "no-undef": "error",
      "consistent-return": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }]
    }
  }
]);