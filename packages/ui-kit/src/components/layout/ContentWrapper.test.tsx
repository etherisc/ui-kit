import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContentWrapper } from './ContentWrapper';

describe('ContentWrapper', () => {
    it('renders children', () => {
        render(
            <ContentWrapper>
                <div data-testid="test-content">Content</div>
            </ContentWrapper>
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    it('renders as a main element', () => {
        render(<ContentWrapper>Content</ContentWrapper>);

        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('applies fixed width class when fixed prop is true', () => {
        render(<ContentWrapper fixed>Content</ContentWrapper>);

        const contentDiv = screen.getByText('Content').closest('div');
        expect(contentDiv).toHaveClass('container--960');
    });

    it('renders breadcrumbs when provided', () => {
        const breadcrumbs = [
            { label: 'Home', href: '/' },
            { label: 'Products', isActive: true },
        ];

        render(<ContentWrapper breadcrumbs={breadcrumbs}>Content</ContentWrapper>);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('renders header when provided', () => {
        render(
            <ContentWrapper header={<h1>Header</h1>}>
                Content
            </ContentWrapper>
        );

        expect(screen.getByRole('heading', { name: 'Header' })).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
        render(
            <ContentWrapper footer={<div>Footer</div>}>
                Content
            </ContentWrapper>
        );

        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(
            <ContentWrapper className="custom-class">
                Content
            </ContentWrapper>
        );

        const main = screen.getByRole('main');
        expect(main).toHaveClass('custom-class');
    });

    it('applies contentClassName to content area', () => {
        render(
            <ContentWrapper contentClassName="content-custom-class">
                Content
            </ContentWrapper>
        );

        const contentDiv = screen.getByText('Content').closest('div');
        expect(contentDiv).toHaveClass('content-custom-class');
    });
}); 