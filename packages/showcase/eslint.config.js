import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    // global ignores – applied before other configs
    {
        ignores: ['dist/**', 'node_modules/**', '../../vendors/**']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.{js,jsx,ts,tsx}', 'tailwind.config.js', 'vite.config.ts', 'postcss.config.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                console: 'readonly',
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly'
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ],
            '@typescript-eslint/no-require-imports': 'off'
        }
    }
]; 