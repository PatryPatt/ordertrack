// eslint.config.js — ESLint 9 (Flat Config) + React + JSX + Prettier

import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import babelParser from '@babel/eslint-parser';

export default defineConfig([
  globalIgnores(['node_modules', 'dist', 'build', 'coverage']),

  js.configs.recommended,
  prettierConfig,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser, // 👈 Aquí se usa el parser
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'], // 👈 Para entender JSX
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Ignorar variables de componentes React (mayúsculas)
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z]', argsIgnorePattern: '^_' }],

      // Integración con Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          tabWidth: 2,
          bracketSpacing: true,
          jsxSingleQuote: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
