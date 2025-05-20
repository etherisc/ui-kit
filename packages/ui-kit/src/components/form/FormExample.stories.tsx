import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { z } from 'zod';
import { Form } from './Form';
import { FormGrid } from './FormGrid';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { CheckboxField } from './CheckboxField';
import { RadioGroupField } from './RadioGroupField';
import { useForm } from './useForm';

// Create a dummy component for the story
const FormExample = () => <div />;

const meta = {
    title: 'Form/FormExample',
    component: FormExample,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof FormExample>;

export default meta;
type Story = StoryObj<typeof meta>;

// Define form schema with zod
const formSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    age: z.number().min(18, { message: 'You must be at least 18 years old' }).optional(),
    role: z.string().min(1, { message: 'Please select a role' }),
    agreeToTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' }),
    notificationMethod: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Create a separate component to use hooks
function ExampleFormComponent() {
    const form = useForm(formSchema, {
        firstName: '',
        lastName: '',
        email: '',
        age: undefined,
        role: '',
        agreeToTerms: false,
        notificationMethod: 'email',
    });

    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

    const handleSubmit = (data: FormValues) => {
        setSubmittedData(data);
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 border rounded-lg bg-base-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
            <Form form={form} onSubmit={handleSubmit} className="space-y-6">
                <FormGrid columns={2} gap="md">
                    <TextField
                        name="firstName"
                        label="First Name"
                        required
                        placeholder="Enter your first name"
                    />
                    <TextField
                        name="lastName"
                        label="Last Name"
                        required
                        placeholder="Enter your last name"
                    />
                </FormGrid>
                <TextField
                    name="email"
                    label="Email Address"
                    required
                    placeholder="your.email@example.com"
                />
                <FormGrid columns={2} gap="md">
                    <NumberField
                        name="age"
                        label="Age"
                        placeholder="Enter your age"
                        min={0}
                        max={120}
                    />
                    <SelectField
                        name="role"
                        label="Role"
                        required
                        placeholder="Select your role"
                        options={[
                            { value: 'user', label: 'User' },
                            { value: 'admin', label: 'Administrator' },
                            { value: 'editor', label: 'Editor' },
                        ]}
                    />
                </FormGrid>
                <RadioGroupField
                    name="notificationMethod"
                    label="Preferred Notification Method"
                    options={[
                        { value: 'email', label: 'Email' },
                        { value: 'sms', label: 'SMS' },
                        { value: 'push', label: 'Push Notification' },
                    ]}
                />
                <CheckboxField
                    name="agreeToTerms"
                    label="I agree to the terms and conditions"
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </div>
            </Form>

            {submittedData && (
                <div className="mt-8 p-4 border rounded bg-base-200">
                    <h3 className="text-lg font-semibold mb-2">Submitted Data:</h3>
                    <pre className="text-sm overflow-auto">
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export const BasicExample: Story = {
    render: () => <ExampleFormComponent />,
}; 