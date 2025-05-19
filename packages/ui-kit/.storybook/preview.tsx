import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

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
    },
    decorators: [
        (Story) => (
            <div className="p-4">
                <Story />
            </div>
        ),
    ],
}

export default preview 