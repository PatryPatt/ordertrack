// eslint.config.js (para backend Node/Express + Prettier)
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  // Ignora carpetas innecesarias
  globalIgnores(['node_modules', 'dist', 'coverage']),

  // Configuración base ESLint + Prettier
  js.configs.recommended,
  prettier,

  {
    files: ['**/*.js', '**/*.mjs'],

    languageOptions: {
      // 👇 En ESLint flat config se definen globals aquí, no "env"
      globals: {
        process: true,
        __dirname: true,
        __filename: true,
        module: true,
        require: true,
        console: true, // para evitar el "console is not defined"
        setTimeout: true,
        clearTimeout: true
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },

    plugins: {
      prettier: pluginPrettier
    },

    rules: {
      // Buenas prácticas
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',

      // Reglas de formato Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'none',
          printWidth: 100
        }
      ]
    }
  }
]);
