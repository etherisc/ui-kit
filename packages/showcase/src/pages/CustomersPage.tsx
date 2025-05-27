import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppShell, Button, DataTable } from "@etherisc/ui-kit";
import { useAuth } from "../hooks/useAuth";
import {
  MockCustomerQueries,
  type Customer as DBCustomer,
} from "../data/mockCustomers";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
  ArrowLeftIcon,
  UserPlusIcon,
  DownloadIcon,
  FilterIcon,
} from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  company: string;
  joinDate: string;
}

interface TableCellProps {
  row: {
    original: Customer;
  };
}

export function CustomersPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Load customers from database
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        const result = await MockCustomerQueries.getCustomers({
          page: 1,
          limit: 100,
        });
        const dbCustomers: Customer[] = result.customers.map(
          (dbCustomer: DBCustomer) => ({
            id: dbCustomer.id,
            name: `${dbCustomer.first_name} ${dbCustomer.last_name}`,
            email: dbCustomer.email,
            phone: dbCustomer.phone || "N/A",
            status: dbCustomer.status,
            company: dbCustomer.company || "N/A",
            joinDate: dbCustomer.created_at,
          }),
        );
        setCustomers(dbCustomers);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // Navigation items for the sidebar
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon size={18} />,
      href: "/dashboard",
      isActive: false,
    },
    {
      id: "customers",
      label: "Customers",
      icon: <UsersIcon size={18} />,
      href: "/customers",
      isActive: true,
    },
    {
      id: "policies",
      label: "Policies",
      icon: <FileTextIcon size={18} />,
      href: "#",
      isActive: false,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChartIcon size={18} />,
      href: "#",
      isActive: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon size={18} />,
      href: "#",
      isActive: false,
    },
  ];

  // User actions for the top bar
  const userActions = (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-light-theme text-primary rounded-lg text-sm font-medium">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        Welcome, {user?.name || "Demo User"}!
      </div>
      <Button
        variant="outline"
        onClick={handleLogout}
        size="sm"
        className="ring-1 ring-inset ring-gray-300 bg-white text-gray hover:bg-gray-200 border-0"
      >
        Logout
      </Button>
    </div>
  );

  // Logo for the top bar
  const logo = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-lg">UI</span>
      </div>
      <div className="hidden sm:block">
        <span className="font-bold text-xl text-black">Insurance Portal</span>
        <div className="text-xs text-gray -mt-1">Customer Management</div>
      </div>
    </div>
  );

  // Breadcrumbs for the page
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Customers", href: "/customers" },
  ];

  const columns = [
    {
      header: "Customer",
      accessorKey: "name",
      cell: ({ row }: TableCellProps) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-medium text-sm">
              {row.original.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-medium text-black">{row.original.name}</div>
            <div className="text-xs text-gray">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }: TableCellProps) => (
        <span className="text-sm text-gray">{row.original.phone}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: TableCellProps) => {
        const status = row.original.status;
        const statusColors = {
          active: "bg-success-light text-success",
          inactive: "bg-gray-200 text-gray",
          pending: "bg-light-orange text-warning",
        };
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${statusColors[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: ({ row }: TableCellProps) => (
        <span className="text-sm font-medium text-black">
          {row.original.company}
        </span>
      ),
    },
    {
      header: "Join Date",
      accessorKey: "joinDate",
      cell: ({ row }: TableCellProps) => (
        <span className="text-sm text-gray">
          {new Date(row.original.joinDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="ring-1 ring-inset ring-gray-300 bg-white text-gray hover:bg-gray-200 border-0 text-xs px-2 py-1"
          >
            View
          </Button>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary-hover text-xs px-2 py-1"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const pendingCustomers = customers.filter(
    (c) => c.status === "pending",
  ).length;
  const totalCustomers = customers.length;

  return (
    <AppShell
      logo={logo}
      navItems={navItems}
      userActions={userActions}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="ring-1 ring-inset ring-gray-300 bg-white text-gray hover:bg-gray-200 border-0"
              >
                <ArrowLeftIcon size={16} />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-2xl font-semibold text-black mb-1">
              Customers
            </h1>
            <p className="text-sm font-medium text-gray">
              Manage your customer database and relationships
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="ring-1 ring-inset ring-gray-300 bg-white text-gray hover:bg-gray-200 border-0"
            >
              <FilterIcon size={16} />
              Filter
            </Button>
            <Button
              variant="outline"
              className="ring-1 ring-inset ring-gray-300 bg-white text-gray hover:bg-gray-200 border-0"
            >
              <DownloadIcon size={16} />
              Export
            </Button>
            <Button className="bg-primary text-white hover:bg-primary-hover">
              <UserPlusIcon size={16} />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="nexadash-card p-6" data-testid="active-customers">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray mb-1">
                  Active Customers
                </p>
                <p className="text-2xl font-bold text-black">
                  {activeCustomers}
                </p>
              </div>
              <div className="p-3 bg-success-light rounded-lg">
                <UsersIcon className="size-6 text-success" />
              </div>
            </div>
          </div>
          <div className="nexadash-card p-6" data-testid="pending-customers">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray mb-1">
                  Pending Approvals
                </p>
                <p className="text-2xl font-bold text-black">
                  {pendingCustomers}
                </p>
              </div>
              <div className="p-3 bg-light-orange rounded-lg">
                <UsersIcon className="size-6 text-warning" />
              </div>
            </div>
          </div>
          <div className="nexadash-card p-6" data-testid="total-customers">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray mb-1">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-black">
                  {totalCustomers}
                </p>
              </div>
              <div className="p-3 bg-light-blue rounded-lg">
                <UsersIcon className="size-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="nexadash-card">
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black">
                  Customer List
                </h2>
                <p className="text-sm text-gray">
                  Manage and view all customer information
                </p>
              </div>
              <div className="text-sm text-gray">
                Showing {customers.length} customers
              </div>
            </div>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray">Loading customers...</div>
              </div>
            ) : (
              <div data-testid="customer-table">
                <DataTable data={customers} columns={columns} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
