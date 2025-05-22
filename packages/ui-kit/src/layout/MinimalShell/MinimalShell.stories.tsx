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
        image: <AlertTriangleIcon className="h-16 w-16 text-warning" />,
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
        image: <AlertCircleIcon className="h-16 w-16 text-destructive" />,
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
        image: <CheckCircleIcon className="h-16 w-16 text-success" />,
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
            <div className="border border-border rounded-md p-4 my-4 bg-muted/30">
                <h3 className="font-medium mb-2">Estimated Downtime</h3>
                <p>From: June 15, 2023 22:00 UTC</p>
                <p>To: June 16, 2023 02:00 UTC</p>
            </div>
        ),
        actions: (
            <Button intent="primary">Subscribe to Updates</Button>
        ),
    },
}; 