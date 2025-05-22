import { render, screen, within } from '@testing-library/react';
import { DataTable } from '../DataTable';
import { ColumnDef } from '@tanstack/react-table';

describe('DataTable', () => {
    type TestData = {
        id: number;
        name: string;
        age: number;
    };

    const testData: TestData[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Name ${i + 1}`,
        age: 20 + i,
    }));

    const columns: ColumnDef<TestData, unknown>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 80,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            size: 150,
        },
        {
            accessorKey: 'age',
            header: 'Age',
            size: 80,
        },
    ];

    it('renders the table with data', () => {
        const { container } = render(<DataTable data={testData} columns={columns} />);

        // Check headers
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();

        // Find the first row and check its cells
        const rows = container.querySelectorAll('tbody tr');
        expect(rows.length).toBeGreaterThan(0);

        const firstRow = rows[0] as HTMLElement;
        const cells = within(firstRow).getAllByRole('cell');

        expect(cells[0].textContent).toBe('1');
        expect(cells[1].textContent).toBe('Name 1');
        expect(cells[2].textContent).toBe('20');
    });

    it('shows empty state when no data', () => {
        render(<DataTable data={[]} columns={columns} />);

        expect(screen.getByText('No results.')).toBeInTheDocument();
    });
}); 