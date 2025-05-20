import { Input } from '@/components/ui/input';

export interface NumberInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'type'> {
    /** Label text displayed above the input */
    label?: string;
    /** Description/help text rendered below */
    description?: string;
    /** Marks input as invalid */
    error?: string;
    /** Minimum value allowed */
    min?: number;
    /** Maximum value allowed */
    max?: number;
    /** Step value for incrementing/decrementing */
    step?: number;
} 