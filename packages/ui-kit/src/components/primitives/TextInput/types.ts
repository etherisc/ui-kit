import type { InputProps as ShadInputProps } from '@/components/ui/input';

export interface TextInputProps extends Omit<ShadInputProps, 'size'> {
    /** Visual size of the input */
    size?: 'default' | 'sm' | 'lg';
} 