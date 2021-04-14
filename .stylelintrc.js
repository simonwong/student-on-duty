module.exports = {
  extends: [require.resolve('@yueqing/lint/lib/stylelint')],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['extends', 'tailwind']
    }]
  },
};
