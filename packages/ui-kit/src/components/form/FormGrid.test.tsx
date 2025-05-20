import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormGrid } from './FormGrid';

describe('FormGrid', () => {
    it('renders children correctly', () => {
        const { getByText } = render(
            <FormGrid>
                <div>Child Element</div>
            </FormGrid>
        );

        expect(getByText('Child Element')).toBeInTheDocument();
    });

    it('applies the correct column classes based on props', () => {
        const { container: oneColContainer } = render(
            <FormGrid columns={1}>
                <div>One Column</div>
            </FormGrid>
        );
        const { container: twoColContainer } = render(
            <FormGrid columns={2}>
                <div>Two Columns</div>
            </FormGrid>
        );

        expect(oneColContainer.firstChild).toHaveClass('grid-cols-1');
        expect(twoColContainer.firstChild).toHaveClass('grid-cols-1');
        expect(twoColContainer.firstChild).toHaveClass('md:grid-cols-2');
    });

    it('applies the correct gap classes based on props', () => {
        const { container: smGapContainer } = render(
            <FormGrid gap="sm">
                <div>Small Gap</div>
            </FormGrid>
        );
        const { container: lgGapContainer } = render(
            <FormGrid gap="lg">
                <div>Large Gap</div>
            </FormGrid>
        );

        expect(smGapContainer.firstChild).toHaveClass('gap-2');
        expect(lgGapContainer.firstChild).toHaveClass('gap-6');
    });

    it('applies additional className prop correctly', () => {
        const { container } = render(
            <FormGrid className="test-class">
                <div>With Class</div>
            </FormGrid>
        );

        expect(container.firstChild).toHaveClass('test-class');
    });
}); 