// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);

import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        // Node.js globals for config files
        require: true,
        module: true,
        process: true,
        __dirname: true,
        __filename: true,
        // Test globals (if you plan to add testing)
        describe: true,
        test: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Customize rules for your auction website
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn', // Allow console.log in development but warn
      'prefer-const': 'error',
      'no-var': 'error',
      curly: 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
  // Apply recommended rules
  pluginJs.configs.recommended,

  // Ignore certain files and directories
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.min.js',
      'coverage/**',
      '.vite/**',
    ],
  },
];
