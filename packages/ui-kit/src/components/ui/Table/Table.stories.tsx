import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ArrowUpDown,
  User,
  Mail,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "./Table";
import { Badge } from "../Badge/Badge";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A responsive table component for displaying structured data with support for sorting, selection, and custom styling.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data
const invoices = [
  {
    id: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
  },
  {
    id: "INV002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-16",
  },
  {
    id: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
    customer: "Bob Johnson",
    email: "bob@example.com",
    date: "2024-01-17",
  },
  {
    id: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
    customer: "Alice Brown",
    email: "alice@example.com",
    date: "2024-01-18",
  },
  {
    id: "INV005",
    status: "Pending",
    method: "PayPal",
    amount: "$200.00",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    date: "2024-01-19",
  },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-20",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-19",
    avatar: "JS",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "Inactive",
    lastLogin: "2024-01-15",
    avatar: "BJ",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-20",
    avatar: "AB",
  },
];

const salesData = [
  {
    product: "Premium Plan",
    revenue: "$12,450",
    growth: "+12%",
    orders: 145,
    conversion: "3.2%",
    trend: "up",
  },
  {
    product: "Basic Plan",
    revenue: "$8,920",
    growth: "+8%",
    orders: 234,
    conversion: "2.8%",
    trend: "up",
  },
  {
    product: "Enterprise Plan",
    revenue: "$24,800",
    growth: "-2%",
    orders: 67,
    conversion: "4.1%",
    trend: "down",
  },
  {
    product: "Starter Plan",
    revenue: "$3,200",
    growth: "+15%",
    orders: 189,
    conversion: "2.1%",
    trend: "up",
  },
];

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return <Badge variant="default">Paid</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "unpaid":
      return <Badge variant="destructive">Unpaid</Badge>;
    case "active":
      return <Badge variant="default">Active</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <Table>
      <TableCaption>
        Table with selection checkboxes. 2 of {invoices.length} selected.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-[50px]" aria-label="Actions"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow
            key={invoice.id}
            data-state={index < 2 ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                checked={index < 2}
                aria-label={`Select ${invoice.id}`}
              />
            </TableCell>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" aria-label="More actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSorting: Story = {
  render: () => (
    <Table>
      <TableCaption>Table with sortable columns (click headers).</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 font-medium hover:bg-transparent"
              aria-label="Sort by Invoice"
            >
              Invoice
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 font-medium hover:bg-transparent"
              aria-label="Sort by Customer"
            >
              Customer
              <ChevronUp className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 font-medium hover:bg-transparent"
              aria-label="Sort by Date"
            >
              Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 font-medium hover:bg-transparent"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 font-medium hover:bg-transparent"
            >
              Amount
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const UserManagement: Story = {
  render: () => (
    <Table>
      <TableCaption>
        User management dashboard with detailed information.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {user.lastLogin}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const SalesReport: Story = {
  render: () => (
    <Table>
      <TableCaption>Sales performance report for Q1 2024.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Growth</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Conversion</TableHead>
          <TableHead className="text-right">Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {salesData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.product}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                {item.revenue}
              </div>
            </TableCell>
            <TableCell>
              <div
                className={`flex items-center gap-2 ${
                  item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {item.growth}
              </div>
            </TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>{item.conversion}</TableCell>
            <TableCell className="text-right">
              {item.trend === "up" ? (
                <Badge variant="default">↗ Growing</Badge>
              ) : (
                <Badge variant="secondary">↘ Declining</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$49,370</TableCell>
          <TableCell className="text-green-600">+8.25%</TableCell>
          <TableCell>635</TableCell>
          <TableCell>3.05%</TableCell>
          <TableCell className="text-right">
            <Badge variant="default">Overall Growth</Badge>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <Table>
      <TableCaption>Loading table data...</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-32 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-40 animate-pulse rounded bg-muted"></div>
            </TableCell>
            <TableCell>
              <div className="h-6 w-16 animate-pulse rounded bg-muted"></div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
                <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableCaption>No data available at the moment.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="h-24 text-center">
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <div className="rounded-full bg-muted p-3">
                <Building className="h-6 w-6" />
              </div>
              <div>No results found.</div>
              <div className="text-sm">
                Try adjusting your search or filter criteria.
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const ResponsiveTable: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>
          This table adapts to different screen sizes. Try resizing the
          viewport.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden lg:table-cell">Stock</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <div>
                <div>MacBook Pro</div>
                <div className="text-sm text-muted-foreground sm:hidden">
                  Electronics • MBP-001
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Electronics</TableCell>
            <TableCell className="hidden md:table-cell">MBP-001</TableCell>
            <TableCell>$2,999</TableCell>
            <TableCell className="hidden lg:table-cell">15 units</TableCell>
            <TableCell className="text-right">
              <Badge variant="default">In Stock</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <div>
                <div>iPhone 15</div>
                <div className="text-sm text-muted-foreground sm:hidden">
                  Electronics • IPH-015
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Electronics</TableCell>
            <TableCell className="hidden md:table-cell">IPH-015</TableCell>
            <TableCell>$999</TableCell>
            <TableCell className="hidden lg:table-cell">32 units</TableCell>
            <TableCell className="text-right">
              <Badge variant="default">In Stock</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <div>
                <div>AirPods Pro</div>
                <div className="text-sm text-muted-foreground sm:hidden">
                  Electronics • APP-002
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Electronics</TableCell>
            <TableCell className="hidden md:table-cell">APP-002</TableCell>
            <TableCell>$249</TableCell>
            <TableCell className="hidden lg:table-cell">0 units</TableCell>
            <TableCell className="text-right">
              <Badge variant="destructive">Out of Stock</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
