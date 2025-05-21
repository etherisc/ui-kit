import React from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

/**
 * This file demonstrates how to use shadcn components with proper accessibility
 * while NOT modifying the base components themselves.
 * 
 * Key principles:
 * 1. Use unique IDs for form elements
 * 2. Associate labels with form controls using htmlFor/id
 * 3. Use aria-describedby for descriptions
 * 4. Group related form elements with fieldset and legend when appropriate
 */

export function A11yFormExamples() {
    const [formValues, setFormValues] = React.useState({
        name: '',
        acceptTerms: false,
        contactMethod: 'email',
        role: ''
    });

    // Unique ID generation for form controls - in a real app use useId() from React
    const ids = {
        name: 'user-name',
        terms: 'accept-terms',
        termsDescription: 'terms-description',
        contactMethod: 'contact-method',
        contactEmail: 'contact-email',
        contactPhone: 'contact-phone',
        contactMail: 'contact-mail',
        role: 'user-role',
        roleDescription: 'role-description',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md">
            <h2 className="text-xl font-semibold">Accessible Form Example</h2>

            {/* Input with associated label */}
            <div className="space-y-2">
                <Label htmlFor={ids.name}>Name</Label>
                <Input
                    id={ids.name}
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    placeholder="Enter your name"
                />
            </div>

            {/* Checkbox with associated label and description */}
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id={ids.terms}
                        checked={formValues.acceptTerms}
                        onCheckedChange={(checked) => setFormValues({ ...formValues, acceptTerms: checked as boolean })}
                        aria-describedby={ids.termsDescription}
                    />
                    <Label htmlFor={ids.terms}>Accept terms and conditions</Label>
                </div>
                <p id={ids.termsDescription} className="text-sm text-gray-500 ml-6">
                    By checking this box, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>

            {/* Radio group with fieldset and legend for proper grouping */}
            <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Preferred contact method</legend>
                <RadioGroup
                    value={formValues.contactMethod}
                    onValueChange={(value) => setFormValues({ ...formValues, contactMethod: value })}
                    className="flex flex-col space-y-1"
                    aria-labelledby={ids.contactMethod}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id={ids.contactEmail} />
                        <Label htmlFor={ids.contactEmail}>Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id={ids.contactPhone} />
                        <Label htmlFor={ids.contactPhone}>Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mail" id={ids.contactMail} />
                        <Label htmlFor={ids.contactMail}>Mail</Label>
                    </div>
                </RadioGroup>
            </fieldset>

            {/* Select with associated label and description */}
            <div className="space-y-2">
                <Label htmlFor={ids.role}>Role</Label>
                <Select
                    value={formValues.role}
                    onValueChange={(value) => setFormValues({ ...formValues, role: value })}
                >
                    <SelectTrigger id={ids.role} aria-describedby={ids.roleDescription}>
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">Regular User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                </Select>
                <p id={ids.roleDescription} className="text-sm text-gray-500">
                    This determines your permissions within the system.
                </p>
            </div>

            {/* Button with descriptive text */}
            <Button type="submit" className="w-full">
                Submit Form
            </Button>
        </form>
    );
} 