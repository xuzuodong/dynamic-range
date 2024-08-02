import eslintConfig from '@sanomics/eslint-config'

export default eslintConfig({
    files: ['**/*.vue', '**/*.ts'],
    rules: {
        'ts/no-unused-expressions': 'off',
    },
})
