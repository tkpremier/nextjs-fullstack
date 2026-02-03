import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
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
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@typescript-eslint': tseslint,
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
        RequestInit: 'readonly'
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      ...(tseslint.configs.recommended || {}).rules,
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
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  nextConfig,
  prettierConfig
]);
