// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import i18next from 'eslint-plugin-i18next';
import pathChecker from './eslint-rules/index.mjs';

export default defineConfig(
    {
        ignores: [
            'dist',
            'build',
            'node_modules',
            '*.config.js',
            '*.config.ts',
            'storybook-static',
            'test-results',
            'jest-report',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{jsx,tsx}'],
        ...react.configs.flat.recommended,
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        ...react.configs.flat['jsx-runtime'],
    },
    i18next.configs['flat/recommended'],
    prettierConfig,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: { pathChecker },
        rules: {
            'pathChecker/path-checker': 'error',
        },
    },
);
