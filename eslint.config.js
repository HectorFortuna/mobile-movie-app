// .eslintrc.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'], // adiciona png aqui
        },
      },
    },
    rules: {
      // Se quiser, desabilita import/no-unresolved temporariamente ou ajusta como preferir
      'import/no-unresolved': 'off',
    },
  },
]);
