module.exports = {
  extends: [
    'airbnb-base',
  ],
  overrides: [
    // ts
    {
      files: ['**/*.ts'],
      extends: [
        'airbnb-typescript/base',
      ],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    // test.js
    {
      files: ['test/*.js'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
  rules: {
    'no-plusplus': 'off',
  },
};
