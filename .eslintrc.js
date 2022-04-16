/* eslint-disable */

module.exports = {
  env: {
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['airbnb-base'],
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'error',
    'import/extensions': 'off',
    'no-console': 'off',
    'no-magic-numbers': 'off',
    'no-fallthrough': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './' // path to tsconfig.json
      }
    }
  }
};
