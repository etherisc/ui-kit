import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useCallback } from "react";
import { DataTable, PaginationConfig } from "../DataTable";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

// Generate mock data
interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive" | "pending";
}

function generateMockData(count: number): Person[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    age: 20 + (i % 50),
    email: `user${i + 1}@example.com`,
    status: ["active", "inactive", "pending"][i % 3] as Person["status"],
  }));
}

// Define columns with different alignments and sorting configurations
const columns: ColumnDef<Person, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
    enableSorting: true,
    meta: {
      className: "text-right", // Right-aligned numbers
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    size: 150,
    enableSorting: true,
    meta: {
      className: "text-left", // Left-aligned text (default)
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    size: 150,
    enableSorting: true,
    meta: {
      className: "text-left", // Left-aligned text (default)
    },
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 80,
    enableSorting: true,
    meta: {
      className: "text-right", // Right-aligned numbers
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250,
    enableSorting: true,
    meta: {
      className: "text-left", // Left-aligned text (default)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    enableSorting: false, // Not sortable
    meta: {
      className: "text-center", // Center-aligned status badges
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={`px-2 py-1 rounded-full text-xs inline-flex items-center font-semibold ${
            status === "active"
              ? "bg-success/30 text-success-content"
              : status === "inactive"
                ? "bg-error/40 text-error-content"
                : "bg-warning/40 text-warning-content"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
];

const meta = {
  title: "Data Display/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Enhanced DataTable with Comprehensive Pagination

A feature-rich data table component built on top of TanStack Table v8 with enterprise-grade pagination features. The DataTable component provides:

- **Smart Pagination**: Auto-detects when pagination is needed (≤15 items = no pagination)
- **Server-side Pagination**: Full support for manual pagination with TanStack Table props
- **Rich Navigation**: Fast navigation, jump-to-page, boundary controls
- **Page Size Selection**: Configurable page size options
- **Pagination Info**: "Showing X-Y of Z entries" display
- **Column Resizing**: Adjust column widths by dragging
- **Sorting**: Sort data by clicking column headers
- **Accessibility**: Fully accessible with keyboard navigation and screen reader support

### Usage Examples

#### Smart Defaults - Small Dataset (No Pagination)
\`\`\`tsx
<DataTable
  data={smallData} // ≤15 items
  columns={columns}
  // Pagination automatically disabled
/>
\`\`\`

#### Client-side Pagination with Rich Controls
\`\`\`tsx
<DataTable
  data={largeData}
  columns={columns}
  pagination={{
    enableFastNavigation: true,
    enableJumpToPage: true,
    pageSizeOptions: [10, 25, 50, 100],
  }}
/>
\`\`\`

#### Server-side Pagination
\`\`\`tsx
<DataTable
  data={currentPageData}
  columns={columns}
  manualPagination={true}
  pageCount={totalPages}
  rowCount={totalRows}
  onPaginationChange={(pagination) => {
    fetchData(pagination.pageIndex, pagination.pageSize);
  }}
  pagination={{
    enableFastNavigation: true,
    enableJumpToPage: true,
  }}
  loading={isLoading}
/>
\`\`\`

### Accessibility

This component passes all axe-core accessibility tests and includes:
- Properly labeled pagination controls with ARIA attributes
- Accessible page size selection
- Semantic table markup
- Keyboard navigation support (←→ for pages, Home/End for boundaries)
- Screen reader announcements for page changes

### Performance

- Efficient rendering for large datasets
- Minimal re-renders with optimized state management
- Virtual scrolling ready
- Memory-efficient pagination
                `,
      },
    },
  },
  argTypes: {
    data: { control: "object" },
    columns: { control: "object" },
    pageSize: {
      control: { type: "number", min: 5, max: 50, step: 5 },
      description:
        "Number of rows to display per page (deprecated - use pagination.pageSize)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "10" },
      },
    },
    enableResizing: {
      control: "boolean",
      description: "Allow columns to be resized",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    enableSorting: {
      control: "boolean",
      description: "Enable column sorting",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    manualPagination: {
      control: "boolean",
      description: "Enable server-side pagination",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    columnResizeMode: {
      control: { type: "select", options: ["onChange", "onEnd"] },
      description: "When to apply column resize changes",
      table: {
        type: { summary: "ColumnResizeMode" },
        defaultValue: { summary: "onChange" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
      table: {
        type: { summary: "string" },
      },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Existing stories
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

export const LargeTable = {
  args: {
    data: generateMockData(200),
    columns,
    pageSize: 15,
    enableResizing: true,
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

export const WithoutResizing = {
  args: {
    data: generateMockData(50),
    columns,
    pageSize: 10,
    enableResizing: false,
    enableSorting: true,
  },
} as Story;

// NEW ENHANCED STORIES

export const SmartDefaults_SmallDataset: Story = {
  name: "Smart Defaults - Small Dataset (No Pagination)",
  args: {
    data: generateMockData(12), // ≤15 items - pagination auto-disabled
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When data has ≤15 items, pagination is automatically disabled for a cleaner interface.",
      },
    },
  },
};

export const SmartDefaults_LargeDataset: Story = {
  name: "Smart Defaults - Large Dataset (Auto Pagination)",
  args: {
    data: generateMockData(150), // >15 items - pagination auto-enabled
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When data has >15 items, pagination is automatically enabled with smart defaults.",
      },
    },
  },
};

export const RichNavigation_AllFeatures: Story = {
  name: "Rich Navigation - All Features",
  args: {
    data: generateMockData(500),
    columns,
    pagination: {
      pageSize: 25,
      showSizeSelector: true,
      showPageInfo: true,
      showNavigation: true,
      pageSizeOptions: [10, 25, 50, 100, 200],
      enableFastNavigation: true,
      enableJumpToPage: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all rich navigation features: fast navigation (±5 pages), jump-to-page, page size selection, and pagination info.",
      },
    },
  },
};

// Component for server-side pagination demo
function ServerSidePaginationDemo() {
  const [data, setData] = useState<Person[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [loading, setLoading] = useState(false);

  // Simulate server-side data fetching
  const fetchData = useCallback(async (pageIndex: number, pageSize: number) => {
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allData = generateMockData(1000); // Simulate large dataset
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const pageData = allData.slice(start, end);

    setData(pageData);
    setLoading(false);
  }, []);

  // Fetch initial data
  React.useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize);
  }, [fetchData, pagination.pageIndex, pagination.pageSize]);

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      setPagination(newPagination);
    },
    [],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      manualPagination={true}
      pageCount={Math.ceil(1000 / pagination.pageSize)} // Total pages
      rowCount={1000} // Total rows
      state={{ pagination }}
      onPaginationChange={handlePaginationChange}
      pagination={{
        showSizeSelector: true,
        showPageInfo: true,
        enableFastNavigation: true,
        enableJumpToPage: true,
        pageSizeOptions: [10, 20, 50, 100],
      }}
      loading={loading}
    />
  );
}

export const ServerSidePagination: Story = {
  name: "Server-side Pagination",
  render: () => <ServerSidePaginationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Example of server-side pagination with loading states, controlled pagination state, and data fetching.",
      },
    },
  },
};

export const CustomPaginationConfig: Story = {
  name: "Custom Pagination Configuration",
  args: {
    data: generateMockData(200),
    columns,
    pagination: {
      pageSize: 15,
      showSizeSelector: true,
      showPageInfo: true,
      showNavigation: true,
      pageSizeOptions: [15, 30, 60, 120],
      enableFastNavigation: false, // Disabled
      enableJumpToPage: false, // Disabled
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom pagination configuration with some features disabled (no fast navigation or jump-to-page).",
      },
    },
  },
};

export const MinimalPagination: Story = {
  name: "Minimal Pagination",
  args: {
    data: generateMockData(100),
    columns,
    pagination: {
      pageSize: 10,
      showSizeSelector: false,
      showPageInfo: false,
      showNavigation: true,
      enableFastNavigation: false,
      enableJumpToPage: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal pagination with only basic navigation controls (Previous, Next, page numbers).",
      },
    },
  },
};

export const NoPagination: Story = {
  name: "Pagination Disabled",
  args: {
    data: generateMockData(25),
    columns,
    pagination: false, // Explicitly disabled
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination explicitly disabled even for larger datasets.",
      },
    },
  },
};

export const LoadingState: Story = {
  name: "Loading State",
  args: {
    data: generateMockData(50),
    columns,
    loading: true,
    pagination: {
      enableFastNavigation: true,
      enableJumpToPage: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "DataTable with loading state affecting pagination controls.",
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  name: "Keyboard Navigation",
  args: {
    data: generateMockData(300),
    columns,
    pagination: {
      pageSize: 20,
      enableFastNavigation: true,
      enableJumpToPage: true,
      showPageInfo: true,
      showSizeSelector: true,
    },
    enableKeyboardShortcuts: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Keyboard navigation enabled for efficient pagination control:
        
**Navigation Shortcuts:**
- **←/→ Arrow Keys**: Previous/Next page
- **Home/End**: First/Last page  
- **PageUp/PageDown**: Fast navigation (±5 pages)
- **Ctrl+G**: Focus jump-to-page input
- **Enter**: Submit jump-to-page (when input focused)
- **Escape**: Cancel jump-to-page (when input focused)

Try using these keyboard shortcuts to navigate through the table pages efficiently.`,
      },
    },
  },
};

export const KeyboardNavigationDisabled: Story = {
  name: "Keyboard Navigation Disabled",
  args: {
    data: generateMockData(100),
    columns,
    pagination: {
      enableFastNavigation: true,
      enableJumpToPage: true,
    },
    enableKeyboardShortcuts: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "DataTable with keyboard shortcuts disabled. Users must rely on mouse/touch interactions.",
      },
    },
  },
};

// Component for testing pagination dropdown synchronization
function PaginationSyncTestDemo() {
  const [testData] = useState(() => {
    // Generate test data with > 100 entries
    const departments = [
      "Engineering",
      "Marketing",
      "Sales",
      "HR",
      "Finance",
      "Operations",
    ];
    return Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      firstName: `User${i + 1}`,
      lastName: `Lastname${i + 1}`,
      age: 20 + (i % 50),
      email: `user${i + 1}@company.com`,
      status: ["active", "inactive", "pending"][i % 3] as Person["status"],
      department: departments[i % departments.length],
    }));
  });

  const [currentTest, setCurrentTest] = useState<string>("missingPageSize");

  const testScenarios: Record<
    string,
    { title: string; config: PaginationConfig }
  > = {
    missingPageSize: {
      title: "🐛 Bug: Page Size NOT in Options (35)",
      config: {
        pageSize: 35,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 25, 50, 100], // 35 is NOT in this list
      },
    },
    edgeCasePageSize: {
      title: "🐛 Edge Case: Page Size 1 (not in default options)",
      config: {
        pageSize: 1,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 25, 50, 100],
      },
    },
    duplicateOptions: {
      title: "✅ Working: Duplicate Page Size Options",
      config: {
        pageSize: 20,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 20, 25, 20, 50, 100, 25], // Duplicates should be handled
      },
    },
    customPageSize: {
      title: "✅ Working: Custom Page Size (15) - In dropdown",
      config: {
        pageSize: 15,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 15, 25, 50, 100],
      },
    },
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">
          Pagination Dropdown Sync Test
        </h3>
        <p className="text-sm text-yellow-700">
          <strong>Instructions:</strong> Test each scenario below. Look for:
        </p>
        <ul className="text-sm text-yellow-700 list-disc list-inside mt-2">
          <li>Does the dropdown show the correct current page size?</li>
          <li>Does changing the dropdown update the table immediately?</li>
          <li>Are there console errors or infinite re-renders?</li>
          <li>Does the table state stay synchronized with the dropdown?</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(testScenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setCurrentTest(key)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentTest === key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 border rounded-md p-3">
        <h4 className="font-medium mb-2">
          Current Test: {testScenarios[currentTest].title}
        </h4>
        <details className="text-sm text-gray-600">
          <summary className="cursor-pointer">Debug Config</summary>
          <pre className="mt-2 text-xs bg-white p-2 rounded border">
            {JSON.stringify(testScenarios[currentTest].config, null, 2)}
          </pre>
        </details>
      </div>

      <DataTable
        data={testData}
        columns={columns}
        pagination={testScenarios[currentTest].config}
        enableKeyboardShortcuts={true}
      />
    </div>
  );
}

export const PaginationSyncTest: Story = {
  name: "🔧 Debug: Pagination Dropdown Sync",
  render: () => <PaginationSyncTestDemo />,
  parameters: {
    docs: {
      description: {
        story: `**DEBUGGING TOOL**: Test pagination dropdown synchronization issues.

This story tests various edge cases where the pagination dropdown might become out of sync with the table state:

1. **Page Size NOT in Options**: When \`pageSize\` is not included in \`pageSizeOptions\`
2. **Edge Case Page Sizes**: Testing with unusual page sizes like 1
3. **Duplicate Options**: Testing with duplicate values in \`pageSizeOptions\`

**Expected Behavior**: The component should automatically add missing page sizes to the options array and handle duplicates gracefully.

**How to Test**:
1. Switch between test scenarios using the buttons
2. Check if the dropdown shows the correct current page size
3. Try changing the page size via the dropdown
4. Verify the table updates correctly
5. Check browser console for errors

**Issue #61**: If the dropdown doesn't sync properly or throws errors, this indicates the bug we're fixing.`,
      },
    },
  },
};
