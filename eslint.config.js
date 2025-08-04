const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            plugins: {
                '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            },
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'],
                },
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
            'import/no-unresolved': 'off',
        },
    },
]);
