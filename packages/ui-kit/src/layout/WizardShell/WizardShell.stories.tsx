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
    <form className="space-y-6" aria-labelledby="address-form-heading">
        <div>
            <h2 id="address-form-heading" className="text-xl font-semibold mb-4">Address Information</h2>
            <p className="text-muted-foreground mb-6">
                Please provide your current residential address information.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label htmlFor="street-address" className="font-medium">Street Address</label>
                <input
                    id="street-address"
                    name="street-address"
                    className="w-full p-2 border rounded"
                    placeholder="123 Main St"
                    aria-required="true"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="apartment" className="font-medium">Apartment/Unit</label>
                <input
                    id="apartment"
                    name="apartment"
                    className="w-full p-2 border rounded"
                    placeholder="Apt 4B (optional)"
                    aria-required="false"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="city" className="font-medium">City</label>
                <input
                    id="city"
                    name="city"
                    className="w-full p-2 border rounded"
                    placeholder="New York"
                    aria-required="true"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="state" className="font-medium">State</label>
                <select
                    id="state"
                    name="state"
                    className="w-full p-2 border rounded"
                    aria-required="true"
                >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="zipcode" className="font-medium">ZIP Code</label>
                <input
                    id="zipcode"
                    name="zipcode"
                    className="w-full p-2 border rounded"
                    placeholder="10001"
                    aria-required="true"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="country" className="font-medium">Country</label>
                <select
                    id="country"
                    name="country"
                    className="w-full p-2 border rounded"
                    aria-required="true"
                >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                </select>
            </div>
        </div>

        <fieldset className="space-y-2">
            <legend className="font-medium">Address Type</legend>
            <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id="residential"
                        name="addressType"
                        value="residential"
                        className="h-4 w-4"
                        defaultChecked
                    />
                    <label htmlFor="residential">Residential</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id="business"
                        name="addressType"
                        value="business"
                        className="h-4 w-4"
                    />
                    <label htmlFor="business">Business</label>
                </div>
            </div>
        </fieldset>
    </form>
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
            <form className="space-y-6" aria-labelledby="personal-form-heading">
                <div>
                    <h2 id="personal-form-heading" className="text-xl font-semibold mb-4">Personal Information</h2>
                    <p className="text-muted-foreground mb-6">
                        Please provide your personal details to get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="first-name" className="font-medium">First Name</label>
                        <input
                            id="first-name"
                            name="firstName"
                            className="w-full p-2 border rounded"
                            placeholder="John"
                            aria-required="true"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="last-name" className="font-medium">Last Name</label>
                        <input
                            id="last-name"
                            name="lastName"
                            className="w-full p-2 border rounded"
                            placeholder="Doe"
                            aria-required="true"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded"
                            type="email"
                            placeholder="john.doe@example.com"
                            aria-required="true"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="font-medium">Phone Number</label>
                        <input
                            id="phone"
                            name="phone"
                            className="w-full p-2 border rounded"
                            placeholder="(555) 123-4567"
                            aria-required="true"
                        />
                    </div>
                </div>
            </form>
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
                    <h2 id="review-heading" className="text-xl font-semibold mb-4">Review Your Information</h2>
                    <p className="text-muted-foreground mb-6">
                        Please review your application details before submitting.
                    </p>
                </div>

                <div className="space-y-6">
                    <section className="bg-muted/30 p-4 rounded border border-border" aria-labelledby="personal-section-heading">
                        <h3 id="personal-section-heading" className="font-medium mb-2">Personal Information</h3>
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
                    </section>

                    <section className="bg-muted/30 p-4 rounded border border-border" aria-labelledby="address-section-heading">
                        <h3 id="address-section-heading" className="font-medium mb-2">Address Information</h3>
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
                    </section>

                    <section className="bg-muted/30 p-4 rounded border border-border" aria-labelledby="payment-section-heading">
                        <h3 id="payment-section-heading" className="font-medium mb-2">Payment Information</h3>
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
                    </section>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="confirm-checkbox"
                            name="confirm"
                            className="h-4 w-4"
                        />
                        <label htmlFor="confirm-checkbox">
                            I confirm that all information provided is accurate and complete.
                        </label>
                    </div>
                </div>
            </div>
        ),
    },
}; 