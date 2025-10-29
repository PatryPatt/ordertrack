module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // Detecta automáticamente la versión de React
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // ✨ React 17+ no necesita importar React
    'prettier/prettier': 'error',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
  },
};

