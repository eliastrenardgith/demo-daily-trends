module.exports = {
    root: true, // Make sure ESLint stops looking for config files in parent directories
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: './tsconfig.json', // Required for rules that need type information
    },
    plugins: [
        '@typescript-eslint',
        'prettier', // Integrates Prettier into ESLint
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // Adds rules that require type information
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
    ],
    rules: {
        // Place to add your custom ESLint rules
        // For example:
        'no-console': 'warn', // Warns about console.log
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Often too strict for API controllers/services
        '@typescript-eslint/no-explicit-any': 'warn', // Warns about using 'any'
        // Ignores unused args starting with underscore
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'prettier/prettier': 'error', // Ensures Prettier formatting is enforced as an ESLint error
    },
};