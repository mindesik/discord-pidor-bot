const rules = {
  'no-trailing-spaces': ['error'],
  'no-undef': ['error'],
  'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_|Sequelize|queryInterface|models|ctx|req|res', 'varsIgnorePattern': '^_' }],
  'no-multiple-empty-lines': ['error'],
  'object-curly-spacing': ['error', 'always'],
  'object-shorthand': 'error',
  'quotes': ['error', 'single'],
  'indent': ['error', 2],
  'comma-dangle': ['error', 'always-multiline'],
  'array-element-newline': ['error', 'consistent'],
  'space-infix-ops': ['error', { 'int32Hint': false }],
  'comma-spacing': ['warn', { "before": false, "after": true }],
  'eol-last': ['warn'],
  'semi': ['warn', 'never'],
  'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }],
}

module.exports = {
  overrides: [
    {
      files: ['*.js'],
      env: {
        es6: true,
        node: true
      },
      extends: [
        'eslint:recommended',
      ],
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 2018
      },
      rules: {
        ...rules
      }
    }
  ]
}
