import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../DataTable';
import { ColumnDef } from '@tanstack/react-table';

// Generate mock data
interface Person {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    status: 'active' | 'inactive' | 'pending';
}

const generateMockData = (count: number): Person[] => {
    const statusOptions: Person['status'][] = ['active', 'inactive', 'pending'];

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        firstName: `First${i + 1}`,
        lastName: `Last${i + 1}`,
        age: 20 + Math.floor(Math.random() * 40),
        email: `person${i + 1}@example.com`,
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    }));
};

// Define columns
const columns: ColumnDef<Person, unknown>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },
    {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
    },
    {
        accessorKey: 'age',
        header: 'Age',
        size: 80,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return (
                <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${status === 'active' ? 'bg-success/20 text-success' :
                    status === 'inactive' ? 'bg-error/20 text-error' :
                        'bg-warning/20 text-warning'
                    }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            );
        },
    },
];

const meta = {
    title: 'Data Display/DataTable',
    component: DataTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // Pass the generic parameters to the component
    argTypes: {
        data: { control: 'object' },
        columns: { control: 'object' },
    },
} as Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Cast the story args to any to bypass type checking
// This is necessary because Storybook can't properly infer the generic types
export const Default = {
    args: {
        data: generateMockData(50),
        columns,
        pageSize: 10,
        enableResizing: true,
        enableSorting: true,
    },
} as Story;

export const SmallTable = {
    args: {
        data: generateMockData(5),
        columns,
        pageSize: 10,
        enableResizing: true,
        enableSorting: true,
    },
} as Story;

export const WithoutResizing = {
    args: {
        data: generateMockData(50),
        columns,
        pageSize: 10,
        enableResizing: false,
        enableSorting: true,
    },
} as Story;

export const WithoutSorting = {
    args: {
        data: generateMockData(50),
        columns,
        pageSize: 10,
        enableResizing: true,
        enableSorting: false,
    },
} as Story; 