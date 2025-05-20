import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './primitives/Button';
import { TextInput } from './primitives/TextInput';
import { NumberInput } from './primitives/NumberInput';
import { Select } from './primitives/Select';
import { Checkbox } from './primitives/Checkbox';
import { RadioGroup } from './primitives/RadioGroup';

const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow', disabled: true },
];

const contactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'post', label: 'Post' },
];

const FormExample = () => {
    const [formState, setFormState] = React.useState({
        firstName: '',
        age: '',
        color: '',
        contactMethod: '',
        newsletter: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify(formState, null, 2));
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div className="space-y-4">
                <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formState.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('firstName', e.target.value)}
                />

                <NumberInput
                    label="Age"
                    placeholder="Enter your age"
                    min={0}
                    max={120}
                    value={formState.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('age', e.target.value)}
                    description="Must be between 0 and 120"
                />

                <Select
                    label="Favorite Color"
                    placeholder="Select a color"
                    options={colorOptions}
                    value={formState.color}
                    onValueChange={(value) => handleChange('color', value)}
                />

                <RadioGroup
                    label="Preferred Contact Method"
                    options={contactOptions}
                    value={formState.contactMethod}
                    onValueChange={(value) => handleChange('contactMethod', value)}
                />

                <Checkbox
                    label="Subscribe to newsletter"
                    checked={formState.newsletter}
                    onCheckedChange={(checked) => handleChange('newsletter', !!checked)}
                    description="Receive updates about our products and services"
                />
            </div>

            <div className="flex space-x-4">
                <Button type="submit" intent="primary">Submit</Button>
                <Button type="reset" intent="outline">Reset</Button>
            </div>
        </form>
    );
};

const meta = {
    title: 'Examples/FormExample',
    component: FormExample,
    parameters: {
        layout: 'centered',
        a11y: {
            // Run accessibility tests on the form example
            config: {
                rules: [
                    // Include relevant a11y rules
                    { id: 'label', enabled: true },
                    { id: 'button-name', enabled: true },
                    { id: 'color-contrast', enabled: true },
                ],
            },
        },
    },
} satisfies Meta<typeof FormExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}; 