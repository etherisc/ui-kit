import type { Meta, StoryObj } from '@storybook/react';
import { MinimalShell } from './MinimalShell';
import { Button } from '../../components/primitives/Button/Button';
import { Logo } from '../../components/layout/Logo';
import { AlertTriangleIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

const meta: Meta<typeof MinimalShell> = {
    title: 'Layout/MinimalShell',
    component: MinimalShell,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MinimalShell>;

// Custom Logo example
const CustomLogo = () => (
    <Logo
        text="Test Application"
        src="https://placekitten.com/32/32"
        alt="Company Logo"
    />
);

export const Error404: Story = {
    args: {
        title: '404 - Page Not Found',
        message: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
        image: <AlertTriangleIcon className="h-16 w-16 text-warning" aria-hidden="true" />,
        logo: <CustomLogo />,
        actions: (
            <>
                <Button intent="ghost">Contact Support</Button>
                <Button intent="primary">Back to Home</Button>
            </>
        ),
    },
};

export const Error500: Story = {
    args: {
        title: '500 - Server Error',
        message: 'Sorry, something went wrong on our server. We are working to fix the problem. Please try again later.',
        image: <AlertCircleIcon className="h-16 w-16 text-destructive" aria-hidden="true" />,
        logo: <CustomLogo />,
        actions: (
            <>
                <Button intent="ghost">Reload Page</Button>
                <Button intent="primary">Back to Home</Button>
            </>
        ),
    },
};

export const Success: Story = {
    args: {
        title: 'Action Completed Successfully',
        message: 'Your request has been processed successfully.',
        image: <CheckCircleIcon className="h-16 w-16 text-success" aria-hidden="true" />,
        logo: <CustomLogo />,
        actions: (
            <Button intent="primary">Continue</Button>
        ),
    },
};

export const WithCustomContent: Story = {
    args: {
        title: 'Maintenance Mode',
        message: 'Our system is currently undergoing scheduled maintenance. Please check back later.',
        logo: <CustomLogo />,
        children: (
            <section
                className="border border-border rounded-md p-4 my-4 bg-muted/30"
                aria-labelledby="downtime-heading"
            >
                <h2 id="downtime-heading" className="font-medium mb-2">Estimated Downtime</h2>
                <dl className="grid grid-cols-1 gap-1">
                    <div className="flex">
                        <dt className="font-medium mr-2">From:</dt>
                        <dd>June 15, 2023 22:00 UTC</dd>
                    </div>
                    <div className="flex">
                        <dt className="font-medium mr-2">To:</dt>
                        <dd>June 16, 2023 02:00 UTC</dd>
                    </div>
                </dl>
            </section>
        ),
        actions: (
            <Button intent="primary">Subscribe to Updates</Button>
        ),
    },
}; 