import { RadioGroupProps as ShadcnRadioGroupProps } from '@radix-ui/react-radio-group';

export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioGroupProps extends ShadcnRadioGroupProps {
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