module.exports = {
  extends: [
    'airbnb-base',
  ],
  overrides: [
    // src ts
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
    // test
    {
      files: ['test/*.{js,ts}'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
      extends: [
        'airbnb-typescript/base',
      ],
      parserOptions: {
        project: './test/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {
    'no-plusplus': 'off',
  },
};
