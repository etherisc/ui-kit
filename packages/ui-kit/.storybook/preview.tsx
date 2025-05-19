import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../src/styles/globals.css'
import { initializeTheme } from '../src/theme'

// Theme switcher
const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Initialize theme when component mounts
        initializeTheme()
    }, [])

    return <>{children}</>
}

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            // axe-core configuration options
            element: '#root',
            config: {},
            disable: false,
        },
        layout: 'centered',
        darkMode: {
            dark: { ...themes.dark },
            light: { ...themes.light },
            current: 'light',
        },
    },
    decorators: [
        (Story) => (
            <ThemeInitializer>
                <div className="p-4">
                    <Story />
                </div>
            </ThemeInitializer>
        ),
    ],
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                icon: 'circlehollow',
                items: [
                    { value: 'light', icon: 'sun', title: 'Light' },
                    { value: 'dark', icon: 'moon', title: 'Dark' },
                ],
                showName: true,
                dynamicTitle: true,
                onChange: (theme) => {
                    const isDark = theme === 'dark'
                    if (isDark) {
                        document.documentElement.classList.add('dark')
                    } else {
                        document.documentElement.classList.remove('dark')
                    }
                }
            },
        },
    },
}

export default preview 