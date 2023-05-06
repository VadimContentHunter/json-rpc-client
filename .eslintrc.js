module.exports = {
    root: true,
    env: {
        browser: true,
    },
    extends: [
        // 'standard',
        'airbnb-base/legacy',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'prettier',
        // 'prettier-plugin-multiline-arrays',
    ],
    rules: {
        'no-unused-vars': [
            'error',
            {
                vars: 'local',
                argsIgnorePattern: '^event$', // regex для игнорирования аргументов функций
            },
        ],
        'class-methods-use-this': [
            'error',
            {
                exceptMethods: [
                    'handleEvent',
                    'toJSON',
                    'responseHandler',
                ],
            },
        ],
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        'no-console': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                useTabs: false,
                tabWidth: 4,
                printWidth: 120,
            },
        ],
        // 'prettier-multiline-arrays-next-threshold': 2,
    },
};
