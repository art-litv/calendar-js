module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    radix: 0,
    'prefer-rest-params': 0,
    'no-case-declarations': 0,
  },
};
