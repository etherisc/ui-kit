import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './primitives/Button';
import { TextInput } from './primitives/TextInput';
import { NumberInput } from './primitives/NumberInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './primitives/Checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

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

    // Generate unique IDs for form elements
    const ids = {
        firstName: React.useId(),
        age: React.useId(),
        color: React.useId(),
        newsletter: React.useId(),
        contactMethod: React.useId(),
        email: React.useId(),
        phone: React.useId(),
        post: React.useId(),
    };

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
                    id={ids.firstName}
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formState.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('firstName', e.target.value)}
                />

                <NumberInput
                    id={ids.age}
                    label="Age"
                    placeholder="Enter your age"
                    min={0}
                    max={120}
                    value={formState.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('age', e.target.value)}
                    description="Must be between 0 and 120"
                />

                {/* Custom implementation of Select to fix accessibility */}
                <div className="space-y-2">
                    <Label htmlFor={ids.color}>Favorite Color</Label>
                    <Select
                        value={formState.color}
                        onValueChange={(value) => handleChange('color', value)}
                    >
                        <SelectTrigger id={ids.color} aria-label="Select favorite color">
                            <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                            {colorOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Custom implementation of RadioGroup to fix accessibility */}
                <fieldset className="space-y-3">
                    <legend className="text-sm font-medium" id={`${ids.contactMethod}-label`}>Preferred Contact Method</legend>
                    <RadioGroup
                        aria-labelledby={`${ids.contactMethod}-label`}
                        value={formState.contactMethod}
                        onValueChange={(value) => handleChange('contactMethod', value)}
                        className="flex flex-col space-y-2"
                    >
                        {contactOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={option.value}
                                    id={ids[option.value as keyof typeof ids]}
                                    aria-label={`Contact by ${option.label}`}
                                />
                                <Label htmlFor={ids[option.value as keyof typeof ids]}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </fieldset>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id={ids.newsletter}
                        checked={formState.newsletter}
                        onCheckedChange={(checked) => handleChange('newsletter', !!checked)}
                        aria-label="Subscribe to newsletter"
                    />
                    <Label htmlFor={ids.newsletter} className="text-sm font-medium leading-none">
                        Subscribe to newsletter
                    </Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                    Receive updates about our products and services
                </p>
            </div>

            <div className="flex space-x-4">
                <Button type="submit" intent="primary">Submit</Button>
                <Button type="reset" intent="outline">Reset</Button>
            </div>
        </form >
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