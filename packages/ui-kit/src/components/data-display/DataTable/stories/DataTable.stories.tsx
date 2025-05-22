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
                <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center font-semibold ${status === 'active' ? 'bg-success/30 text-success-content' :
                    status === 'inactive' ? 'bg-error/40 text-error-content' :
                        'bg-warning/40 text-warning-content'
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
        docs: {
            description: {
                component: `
## DataTable

A flexible data table component built on top of TanStack Table v8. The DataTable component provides:

- **Pagination**: Navigate through large datasets with ease
- **Column Resizing**: Adjust column widths by dragging
- **Sorting**: Sort data by clicking column headers
- **Accessibility**: Fully accessible with keyboard navigation and screen reader support

### Usage

\`\`\`tsx
import { DataTable } from '@org/ui-kit';

// Define your column configuration
const columns = [
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
  // Add more columns as needed
];

// Your data array
const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  // ...more data
];

// Render the component
<DataTable
  data={data}
  columns={columns}
  pageSize={10}
  enableResizing={true}
  enableSorting={true}
/>
\`\`\`

### Accessibility

This component passes all axe-core accessibility tests and includes:
- Properly labeled pagination controls
- Accessible page size selection
- Semantic table markup
- Keyboard navigation support

### Customization

You can customize cell rendering using the \`cell\` property in column definitions:

\`\`\`tsx
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const status = row.getValue('status');
    return (
      <div className="status-badge">
        {status}
      </div>
    );
  },
}
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        data: { control: 'object' },
        columns: { control: 'object' },
        pageSize: {
            control: { type: 'number', min: 5, max: 50, step: 5 },
            description: 'Number of rows to display per page',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' },
            }
        },
        enableResizing: {
            control: 'boolean',
            description: 'Allow columns to be resized',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            }
        },
        enableSorting: {
            control: 'boolean',
            description: 'Enable column sorting',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            }
        },
        columnResizeMode: {
            control: { type: 'select', options: ['onChange', 'onEnd'] },
            description: 'When to apply column resize changes',
            table: {
                type: { summary: 'ColumnResizeMode' },
                defaultValue: { summary: 'onChange' },
            }
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
            table: {
                type: { summary: 'string' },
            }
        },
    },
    tags: ['autodocs'],
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