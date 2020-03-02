module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './packages/*/tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'no-shadow': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off'
  }
}
