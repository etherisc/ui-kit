import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
    const sampleItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', isActive: true },
    ];

    it('renders all items', () => {
        render(<Breadcrumbs items={sampleItems} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Laptops')).toBeInTheDocument();
    });

    it('renders links for items with href', () => {
        render(<Breadcrumbs items={sampleItems} />);

        const homeLink = screen.getByText('Home').closest('a');
        const productsLink = screen.getByText('Products').closest('a');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(productsLink).toHaveAttribute('href', '/products');
    });

    it('renders active item without link', () => {
        render(<Breadcrumbs items={sampleItems} />);

        const activeItem = screen.getByText('Laptops');
        expect(activeItem.closest('a')).toBeNull();
        expect(activeItem.closest('span')).toHaveAttribute('aria-current', 'page');
    });

    it('renders custom separator', () => {
        render(<Breadcrumbs items={sampleItems} separator=">" />);

        // There should be two separators for three items
        const separators = screen.getAllByText('>');
        expect(separators).toHaveLength(2);
    });

    it('truncates items when there are too many', () => {
        const manyItems = [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Computers', href: '/products/electronics/computers' },
            { label: 'Laptops', isActive: true },
        ];

        render(<Breadcrumbs items={manyItems} truncate maxVisibleItems={3} />);

        // Should show first item
        expect(screen.getByText('Home')).toBeInTheDocument();

        // Should show ellipsis
        expect(screen.getByText('...')).toBeInTheDocument();

        // Should show last two items
        expect(screen.getByText('Computers')).toBeInTheDocument();
        expect(screen.getByText('Laptops')).toBeInTheDocument();

        // Middle item should be hidden
        expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Breadcrumbs items={sampleItems} className="custom-class" />);

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('custom-class');
    });
}); 