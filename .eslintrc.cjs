/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    // '@vue/eslint-config-prettier/skip-formatting'
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // 'prettier/prettier': [
    //   'warn',
    //   {},
    //   {
    //     usePrettierrc: true,
    //     ignoreUnknown: true
    //   }
    // ]
  },
}
