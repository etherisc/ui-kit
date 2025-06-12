import React, { useState } from "react";
import {
  DataTable,
  PaginationConfig,
} from "./packages/ui-kit/src/components/data-display/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";

// Test data type
interface TestPerson {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  startDate: string;
}

// Generate test data with > 100 entries
const generateTestData = (count: number): TestPerson[] => {
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ];
  const firstNames = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Emily",
    "Chris",
    "Lisa",
    "Alex",
    "Rachel",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `user${i + 1}@company.com`,
    department: departments[i % departments.length],
    salary: 50000 + Math.floor(Math.random() * 100000),
    startDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    )
      .toISOString()
      .split("T")[0],
  }));
};

// Column definitions
const columns: ColumnDef<TestPerson>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "department",
    header: "Department",
    size: 120,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    size: 100,
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    size: 120,
  },
];

// Test scenarios
export const PaginationSyncTest: React.FC = () => {
  const [testData] = useState(() => generateTestData(150)); // Generate 150 entries
  const [currentTest, setCurrentTest] = useState<string>("default");

  const testScenarios: Record<
    string,
    { title: string; config: PaginationConfig | undefined }
  > = {
    default: {
      title: "Default Configuration",
      config: undefined,
    },
    customPageSize: {
      title: "Custom Page Size (15) - Should be in dropdown",
      config: {
        pageSize: 15,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 25, 50, 100],
      },
    },
    missingPageSize: {
      title: "Page Size NOT in Options (35) - This should cause sync issue",
      config: {
        pageSize: 35,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 25, 50, 100], // 35 is NOT in this list
      },
    },
    edgeCasePageSize: {
      title: "Edge Case: Page Size 1 (not in default options)",
      config: {
        pageSize: 1,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 25, 50, 100],
      },
    },
    duplicateOptions: {
      title: "Duplicate Page Size Options",
      config: {
        pageSize: 20,
        showSizeSelector: true,
        showPageInfo: true,
        showNavigation: true,
        pageSizeOptions: [10, 20, 25, 20, 50, 100, 25], // Duplicates should be handled
      },
    },
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        DataTable Pagination Sync Test
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Scenarios</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(testScenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setCurrentTest(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentTest === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Current Test:{" "}
            {testScenarios[currentTest as keyof typeof testScenarios].title}
          </h3>
          <p className="text-sm text-yellow-700">
            <strong>Instructions:</strong> Test the page size dropdown. Check
            if:
          </p>
          <ul className="text-sm text-yellow-700 list-disc list-inside mt-2">
            <li>The dropdown shows the correct current page size</li>
            <li>Changing the dropdown updates the table immediately</li>
            <li>The table state stays synchronized with the dropdown</li>
            <li>No console errors or infinite re-renders occur</li>
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Dataset: {testData.length} entries | Current Test:{" "}
          {testScenarios[currentTest as keyof typeof testScenarios].title}
        </p>
      </div>

      <DataTable
        data={testData}
        columns={columns}
        pagination={testScenarios[currentTest].config}
        enableKeyboardShortcuts={true}
      />

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-md p-4">
        <h3 className="font-semibold mb-2">Debug Information</h3>
        <pre className="text-xs text-gray-600">
          {JSON.stringify(
            testScenarios[currentTest as keyof typeof testScenarios].config,
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
};

export default PaginationSyncTest;
