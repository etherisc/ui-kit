import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-toolbars',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    core: {
        builder: '@storybook/builder-vite',
    },
    async viteFinal(config) {
        return {
            ...config,
            plugins: [...(config.plugins ?? []), tailwindcss()],
            define: {
                ...config.define,
                global: 'window',
            },
        }
    },
}

export default config 