import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['node_modules/**', '.next/**', '*.config.js', '*.config.*s']
  },
  js.configs.recommended,
  // eslint-config-next already registers the `@typescript-eslint` plugin and
  // parser for .ts/.tsx files, so we must not redefine them below.
  ...nextConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
      n: nPlugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        RequestCredentials: 'readonly',
        RequestInit: 'readonly'
      }
    },
    rules: {
      'quote-props': ['error', 'as-needed', { unnecessary: false }],
      'comma-dangle': ['error', 'never'],
      'func-names': ['off'],
      'no-confusing-arrow': ['warn'],
      'no-console': ['warn', { allow: ['log', 'warn', 'error'] }],
      'object-shorthand': ['error', 'methods'],
      'prettier/prettier': ['off'],
      'arrow-body-style': ['error', 'as-needed'],
      'linebreak-style': 0,
      'no-nested-ternary': ['off'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...(tseslint.configs.recommended || {}).rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  prettierConfig
]);
