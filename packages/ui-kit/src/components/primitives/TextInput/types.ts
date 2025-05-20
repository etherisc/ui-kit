import { Input } from '@/components/ui/input';

export interface TextInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'size'> {
    /** Label text displayed above the input */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
    /** Visual size of the input */
    size?: 'default' | 'sm' | 'lg';
    /** Optional CSS class name */
    className?: string;
} 