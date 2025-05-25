import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../src/styles/globals.css'
import { initializeTheme } from '../src/theme'
import { I18nProvider } from '../src/providers/I18nProvider'
import { useTranslation } from 'react-i18next'

// Theme switcher
const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Initialize theme when component mounts
        initializeTheme()
    }, [])

    return <>{children}</>
}

// i18n wrapper that responds to locale changes
const I18nWrapper = ({ children, locale }: { children: React.ReactNode; locale: string }) => {
    const { i18n } = useTranslation()
    
    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale)
        }
    }, [locale, i18n])

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
            element: '#storybook-root',
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
        (Story, context) => (
            <I18nProvider>
                <ThemeInitializer>
                    <I18nWrapper locale={context.globals.locale || 'en'}>
                        <div className="p-4">
                            <Story />
                        </div>
                    </I18nWrapper>
                </ThemeInitializer>
            </I18nProvider>
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
        locale: {
            name: 'Locale',
            description: 'Internationalization locale',
            defaultValue: 'en',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'en', title: 'English', right: '🇺🇸' },
                    { value: 'de', title: 'Deutsch', right: '🇩🇪' },
                ],
                showName: true,
                dynamicTitle: true,
            },
        },
    },
}

export default preview 