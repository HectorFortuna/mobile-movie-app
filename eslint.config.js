// .eslintrc.js
const {defineConfig} = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*'],
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
        }

    },
]);
