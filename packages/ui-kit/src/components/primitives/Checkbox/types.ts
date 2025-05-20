import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof ShadcnCheckbox> {
    /** Label text displayed next to the checkbox */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks checkbox as invalid */
    error?: string;
    /** Optional CSS class name */
    className?: string;
} 