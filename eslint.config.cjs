const js = require("@eslint/js");
const eslintPlugin = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const globals = require("globals");
const alexPlugin = require("@alextheman/eslint-plugin");

const warnOnFixButErrorOnLint =
  // eslint-disable-next-line no-undef
  process.env.ESLINT_MODE === "fix" ? "warn" : "error";

module.exports = [
  js.configs.recommended,
  {
    name: "@alextheman/eslint-config-typescript-base",
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    ignores: ["dist"],
    plugins: {
      "@typescript-eslint": eslintPlugin,
      import: importPlugin,
      "@alextheman": alexPlugin,
    },
    rules: {
      "import/no-unresolved": warnOnFixButErrorOnLint,
      eqeqeq: warnOnFixButErrorOnLint,
      "no-console": "warn",
      "no-restricted-imports": [
        warnOnFixButErrorOnLint,
        {
          paths: [
            {
              name: "@mui/material",
              message:
                'Please use `import Component from "@mui/material/Component"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information.',
            },
          ],
          patterns: [
            {
              group: ["./", "../"],
              message: "Relative imports are not allowed",
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        warnOnFixButErrorOnLint,
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Disable regular no-unused-vars rule since that will flag interface declarations. Only use the TypeScript specific rule for this.
      "no-unused-vars": "off",
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
      "no-param-reassign": "error",
      "no-useless-rename": "error",
      "sort-vars": "error",
      "no-cond-assign": "error",
      "no-undef": warnOnFixButErrorOnLint,
      "@alextheman/no-namespace-imports": "error",
    },
  },
];
