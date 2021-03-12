const reactRules = require('@yueqing/lint/lib/rules/react')
const importRules = require('@yueqing/lint/lib/rules/import')
const jsxRules = require('@yueqing/lint/lib/rules/jsx')
const unicornRules = require('@yueqing/lint/lib/rules/unicorn')
const esRules = require('@yueqing/lint/lib/rules/es')

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    // 'prettier/react',
  ],
  plugins: ['prettier', 'eslint-comments', 'jest', 'unicorn', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'prettier/prettier': 'error',
    ...importRules,
    ...unicornRules,
    ...esRules,
    ...reactRules,
    ...jsxRules,
  },
}
