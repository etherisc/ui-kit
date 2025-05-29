import { describe, expect, it } from 'vitest';
import { z } from 'zod';

// Import the useForm function to inspect its type, but don't call it outside of renderHook
import { useForm } from './useForm';

describe('useForm', () => {
    it('exports the useForm function', () => {
        // Check if useForm is a function
        expect(typeof useForm).toBe('function');
    });

    it('exports the Zod library', () => {
        // Check if z is an object with the expected methods
        expect(z).toBeDefined();
        expect(typeof z.object).toBe('function');
        expect(typeof z.string).toBe('function');
        expect(typeof z.number).toBe('function');
    });
}); 