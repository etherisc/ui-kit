import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
import { z } from 'zod';

/**
 * A wrapper around react-hook-form that adds Zod integration
 */
export function useForm<T extends z.ZodType>(
    schema: T,
    defaultValues?: z.infer<T>,
    options?: Omit<Parameters<typeof useRHF>[0], 'resolver' | 'defaultValues'>
) {
    return useRHF({
        resolver: zodResolver(schema),
        defaultValues,
        ...options,
    });
}

export type { FieldValues, UseFormReturn } from 'react-hook-form';
export { z }; 