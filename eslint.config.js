import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // ts
    settings: { react: { version: 'detect' } },
    //
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // ts
      react,
      tseslint,
      //
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.strictTypeChecked.rules,
      '@typescript-eslint/explicit-function-return-type': 'error', // Obliga a definir el tipo de retorno en funciones
      '@typescript-eslint/explicit-module-boundary-types': 'error', // Obliga a definir tipos en los bordes del módulo
      '@typescript-eslint/no-explicit-any': 'error', // Evita el uso de 'any'
      '@typescript-eslint/no-inferrable-types': 'error', // Evita la inferencia de tipos
      '@typescript-eslint/no-non-null-assertion': 'off', // Evita el uso de '!'
    },
  },
);
