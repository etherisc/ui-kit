import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    // global ignores – applied before other configs
    {
        ignores: ['packages/ui-kit/dist/**', '**/node_modules/**']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['packages/ui-kit/src/**/*.{js,jsx,ts,tsx}', 'packages/ui-kit/tailwind.config.js', 'packages/ui-kit/vite.config.ts', 'packages/ui-kit/postcss.config.js', 'eslint.config.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                console: 'readonly',
                // Add browser globals if your UI kit code runs in the browser
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
            '@typescript-eslint/no-require-imports': 'off',
            // 'no-undef': 'off' // Let's remove this for now and see if globals cover it.
        }
    }
]; 