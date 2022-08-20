module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'standard',
      'plugin:@typescript-eslint/recommended',
      'eslint-config-prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: [
      '@typescript-eslint', 'unused-imports'
    ],
    rules: {
      'unused-imports/no-unused-imports-ts': 2,
      'camelcase': 0
    }
}