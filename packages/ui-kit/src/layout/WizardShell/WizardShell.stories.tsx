import type { Meta, StoryObj } from '@storybook/react';
import { WizardShell, WizardStep } from './WizardShell';
import { Button } from '../../components/primitives/Button/Button';
import { Logo } from '../../components/layout/Logo';

const meta: Meta<typeof WizardShell> = {
    title: 'Layout/WizardShell',
    component: WizardShell,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WizardShell>;

// Example steps for the wizard
const wizardSteps: WizardStep[] = [
    {
        id: 'personal',
        label: 'Personal Info',
        isCompleted: true,
    },
    {
        id: 'address',
        label: 'Address',
        isCompleted: false,
    },
    {
        id: 'payment',
        label: 'Payment',
        isCompleted: false,
    },
    {
        id: 'review',
        label: 'Review',
        isCompleted: false,
    },
];

// Example Logo
const CustomLogo = () => (
    <Logo
        text="Insurance Wizard"
        src="https://placekitten.com/32/32"
        alt="Company Logo"
    />
);

// Example form content for step 2 (Address)
const AddressFormContent = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <p className="text-muted-foreground mb-6">
                Please provide your current residential address information.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="font-medium">Street Address</label>
                <input className="w-full p-2 border rounded" placeholder="123 Main St" />
            </div>

            <div className="space-y-2">
                <label className="font-medium">Apartment/Unit</label>
                <input className="w-full p-2 border rounded" placeholder="Apt 4B (optional)" />
            </div>

            <div className="space-y-2">
                <label className="font-medium">City</label>
                <input className="w-full p-2 border rounded" placeholder="New York" />
            </div>

            <div className="space-y-2">
                <label className="font-medium">State</label>
                <select className="w-full p-2 border rounded">
                    <option>Select State</option>
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="font-medium">ZIP Code</label>
                <input className="w-full p-2 border rounded" placeholder="10001" />
            </div>

            <div className="space-y-2">
                <label className="font-medium">Country</label>
                <select className="w-full p-2 border rounded">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                </select>
            </div>
        </div>

        <div className="space-y-2">
            <label className="font-medium">Address Type</label>
            <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                    <input type="radio" name="addressType" className="h-4 w-4" defaultChecked />
                    <span>Residential</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="radio" name="addressType" className="h-4 w-4" />
                    <span>Business</span>
                </label>
            </div>
        </div>
    </div>
);

// Actions for step 2 (Address)
const StepActions = () => (
    <>
        <Button intent="ghost">Back</Button>
        <Button intent="primary">Continue</Button>
    </>
);

export const Step2Address: Story = {
    args: {
        title: 'New Insurance Application',
        subtitle: 'Please complete all required information to process your application',
        steps: wizardSteps,
        currentStepId: 'address',
        logo: <CustomLogo />,
        onExit: () => console.log('Exit clicked'),
        actions: <StepActions />,
        children: <AddressFormContent />,
    },
};

export const Step1Personal: Story = {
    args: {
        ...Step2Address.args,
        currentStepId: 'personal',
        children: (
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <p className="text-muted-foreground mb-6">
                        Please provide your personal details to get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="font-medium">First Name</label>
                        <input className="w-full p-2 border rounded" placeholder="John" />
                    </div>

                    <div className="space-y-2">
                        <label className="font-medium">Last Name</label>
                        <input className="w-full p-2 border rounded" placeholder="Doe" />
                    </div>

                    <div className="space-y-2">
                        <label className="font-medium">Email</label>
                        <input className="w-full p-2 border rounded" type="email" placeholder="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="font-medium">Phone Number</label>
                        <input className="w-full p-2 border rounded" placeholder="(555) 123-4567" />
                    </div>
                </div>
            </div>
        ),
    },
};

export const FinalStep: Story = {
    args: {
        ...Step2Address.args,
        currentStepId: 'review',
        steps: [
            ...wizardSteps.slice(0, 3).map(step => ({ ...step, isCompleted: true })),
            wizardSteps[3],
        ],
        children: (
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
                    <p className="text-muted-foreground mb-6">
                        Please review your application details before submitting.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-muted/30 p-4 rounded border border-border">
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                            <div>
                                <span className="text-muted-foreground">Name:</span>
                            </div>
                            <div>John Doe</div>
                            <div>
                                <span className="text-muted-foreground">Email:</span>
                            </div>
                            <div>john.doe@example.com</div>
                            <div>
                                <span className="text-muted-foreground">Phone:</span>
                            </div>
                            <div>(555) 123-4567</div>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded border border-border">
                        <h3 className="font-medium mb-2">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                            <div>
                                <span className="text-muted-foreground">Street:</span>
                            </div>
                            <div>123 Main St</div>
                            <div>
                                <span className="text-muted-foreground">City, State, ZIP:</span>
                            </div>
                            <div>New York, NY 10001</div>
                            <div>
                                <span className="text-muted-foreground">Country:</span>
                            </div>
                            <div>United States</div>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded border border-border">
                        <h3 className="font-medium mb-2">Payment Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                            <div>
                                <span className="text-muted-foreground">Payment Method:</span>
                            </div>
                            <div>Credit Card (ending in 4242)</div>
                            <div>
                                <span className="text-muted-foreground">Billing Address:</span>
                            </div>
                            <div>Same as residential address</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-4 w-4" />
                        <span>I confirm that all information provided is accurate and complete.</span>
                    </label>
                </div>
            </div>
        ),
        actions: (
            <>
                <Button intent="ghost">Back</Button>
                <Button intent="primary">Submit Application</Button>
            </>
        ),
    },
}; 