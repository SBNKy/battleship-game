import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        ignores: ["webpack.*.js", "dist", "node_modules/"],
    },
    js.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.jest },
        },
    },
    eslintConfigPrettier,
];
