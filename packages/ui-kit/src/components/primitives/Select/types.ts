import { Select as ShadcnSelect } from '@/components/ui/select';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof ShadcnSelect> {
    /** Label text displayed above the select */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks select as invalid */
    error?: string;
    /** Placeholder text when no option is selected */
    placeholder?: string;
    /** Array of options for the select */
    options: SelectOption[];
    /** Current value of the select */
    value?: string;
    /** Callback when value changes */
    onValueChange?: (value: string) => void;
    /** Optional CSS class name */
    className?: string;
} 