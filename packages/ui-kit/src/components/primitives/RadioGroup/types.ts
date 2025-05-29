import { RadioGroup as ShadcnRadioGroup } from '@/components/ui/radio-group';

export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup> {
    /** Label text displayed above the radio group */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks radio group as invalid */
    error?: string;
    /** Array of options for the radio group */
    options: RadioOption[];
    /** Optional CSS class name */
    className?: string;
} 