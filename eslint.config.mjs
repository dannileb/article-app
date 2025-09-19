import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
    { ignores: ['dist', 'build', '*.config.js', '*.config.ts'] },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { js, react, 'react-hooks': reactHooks },
        extends: [js.configs.recommended],
        languageOptions: { globals: globals.browser },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            'react/jsx-indent': [2],
            'react/jsx-indent-props': [2],
            'react/jsx-closing-bracket-location': 'warn',
        },
    },
    tseslint.configs.recommended,
]);
