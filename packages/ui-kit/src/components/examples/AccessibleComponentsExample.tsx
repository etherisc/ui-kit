import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

/**
 * AccessibleComponentsExample demonstrates how to use shadcn components with proper
 * accessibility attributes without modifying the base components.
 * 
 * Key accessibility patterns:
 * 1. Associate labels with form controls using htmlFor/id
 * 2. Group related form elements
 * 3. Provide descriptive text for controls
 * 4. Use semantic HTML elements
 */
export function AccessibleComponentsExample() {
    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold">Accessible Component Examples</h2>

            {/* Checkbox with associated label */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Checkbox</h3>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <p className="text-sm text-gray-500">
                    The key to accessible checkboxes is using a proper <code>id</code> attribute and
                    associating it with a <code>Label</code> using <code>htmlFor</code>.
                </p>
            </div>

            {/* Radio group with proper labeling */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Radio Group</h3>
                <p className="text-sm text-gray-500 mb-2">Select your preferred contact method:</p>
                <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="r1" />
                        <Label htmlFor="r1">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="r2" />
                        <Label htmlFor="r2">Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mail" id="r3" />
                        <Label htmlFor="r3">Mail</Label>
                    </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">
                    For radio groups, each radio item needs its own unique <code>id</code> and
                    associated <code>Label</code>.
                </p>
            </div>

            {/* Select with proper labeling */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Select</h3>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="user">
                        <SelectTrigger id="role" className="w-[180px]">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className="text-sm text-gray-500">
                    For select components, the <code>SelectTrigger</code> needs an <code>id</code>
                    that matches the <code>htmlFor</code> of the <code>Label</code>.
                </p>
            </div>

            <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="text-md font-medium mb-2">Accessibility Best Practices:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Always associate labels with form controls using proper IDs</li>
                    <li>Use semantic HTML elements when possible</li>
                    <li>Ensure keyboard navigation works for all interactive elements</li>
                    <li>Provide enough color contrast for text and interactive elements</li>
                    <li>Use proper heading hierarchy (h1, h2, h3, etc.)</li>
                    <li>Add descriptive text for complex form controls</li>
                </ul>
            </div>
        </div>
    );
} 