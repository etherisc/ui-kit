import { CheckboxProps as ShadcnCheckboxProps } from '@radix-ui/react-checkbox';

export interface CheckboxProps extends ShadcnCheckboxProps {
    /** Label text displayed next to the checkbox */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks checkbox as invalid */
    error?: string;
    /** Optional CSS class name */
    className?: string;
} 