import { useNavigate } from "react-router-dom";
import { AppShell, Button } from "@etherisc/ui-kit";
import { useAuth } from "../hooks/useAuth";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  DollarSignIcon,
  CalendarCheck,
  Download,
  Ellipsis,
  TrendingDown,
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation items for the sidebar
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon size={18} />,
      href: "/dashboard",
      isActive: true,
    },
    {
      id: "customers",
      label: "Customers",
      icon: <UsersIcon size={18} />,
      href: "/customers",
      isActive: false,
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
        <div className="text-xs text-gray -mt-1">Dashboard Overview</div>
      </div>
    </div>
  );

  const stats = [
    {
      label: "Total Customers",
      value: "1,234",
      change: "+12%",
      status: "success" as const,
      icon: <UsersIcon size={18} />,
      bgColor: "bg-light-blue",
      iconColor: "text-primary",
    },
    {
      label: "Active Policies",
      value: "856",
      change: "+13%",
      status: "success" as const,
      icon: <FileTextIcon size={18} />,
      bgColor: "bg-success-light",
      iconColor: "text-success",
    },
    {
      label: "Pending Claims",
      value: "23",
      change: "-8%",
      status: "warning" as const,
      icon: <AlertCircleIcon size={18} />,
      bgColor: "bg-light-orange",
      iconColor: "text-warning",
    },
    {
      label: "Monthly Revenue",
      value: "$45,678",
      change: "-3%",
      status: "error" as const,
      icon: <DollarSignIcon size={18} />,
      bgColor: "bg-light-purple",
      iconColor: "text-primary",
    },
  ];

  return (
    <AppShell logo={logo} navItems={navItems} userActions={userActions}>
      <div className="space-y-4">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-black mb-1">Dashboard</h1>
          <p className="text-sm font-medium text-gray">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Main Content */}
        <div className="min-h-[calc(100vh-160px)] w-full">
          {/* Sales Overview Card */}
          <div className="nexadash-card mb-6">
            <div className="flex h-full grow flex-col">
              <div className="flex grow flex-col gap-5 p-6 sm:flex-row sm:justify-between">
                <div className="shrink-0 space-y-5 sm:space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-base font-semibold text-black">
                      Sales Overview
                    </h2>
                    <p className="text-xs font-medium text-gray">
                      10 March 2024 - 10 April 2024
                    </p>
                    <div className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-2 text-xs text-black transition hover:bg-gray-200">
                      <CalendarCheck className="size-4 shrink-0" />
                      <span>10 Mar, 2024 - 10 Apr, 2024</span>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-lg bg-gray-200 p-5">
                    <h3 className="text-[26px] font-bold text-black">
                      $75,485.57
                    </h3>
                    <div className="flex items-center gap-2.5">
                      <div className="inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs font-semibold bg-success-light text-success">
                        <TrendingUpIcon className="size-3.5" />
                        15.15%
                      </div>
                      <span className="text-xs text-gray">
                        + $150.48 Increased
                      </span>
                    </div>
                  </div>
                </div>
                <div className="m-auto grow flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChartIcon
                      size={48}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <p className="text-sm">Chart placeholder</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-300 border-t border-gray-300 sm:grid-cols-4 sm:divide-y-0">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`space-y-4 px-4 py-6 sm:px-[18px] sm:py-6 ${index === 1 ? "bg-gradient-to-b from-success/5 to-success/0" : ""}`}
                  >
                    <div className={`p-2 rounded-lg w-fit ${stat.bgColor}`}>
                      <div className={stat.iconColor}>{stat.icon}</div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray">
                        {stat.label}
                      </p>
                      <p className="text-lg font-bold text-black">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1">
                        {stat.change.startsWith("+") ? (
                          <TrendingUpIcon className="size-3 text-success" />
                        ) : (
                          <TrendingDown className="size-3 text-danger" />
                        )}
                        <span
                          className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-success" : "text-danger"}`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="nexadash-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      Recent Activity
                    </h2>
                    <p className="text-sm text-gray">
                      Latest updates and notifications
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Ellipsis className="size-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-success-light rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        New customer registration
                      </p>
                      <p className="text-xs text-gray mt-1">
                        John Smith joined the platform
                      </p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">
                        2h ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-light-blue rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        Policy renewal processed
                      </p>
                      <p className="text-xs text-gray mt-1">
                        Auto insurance policy #AI-2024-001
                      </p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">
                        4h ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-light-orange rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        Claim requires attention
                      </p>
                      <p className="text-xs text-gray mt-1">
                        Vehicle damage claim #VD-2024-089
                      </p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">
                        6h ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="nexadash-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      Quick Actions
                    </h2>
                    <p className="text-sm text-gray">
                      Frequently used operations
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Ellipsis className="size-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate("/customers")}
                    className="flex flex-col items-center gap-3 p-4 bg-light-theme rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <UsersIcon className="size-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-black">
                        View Customers
                      </p>
                      <p className="text-xs text-gray">Manage customer data</p>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 bg-light-theme rounded-lg hover:bg-primary/10 transition-colors group">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <FileTextIcon className="size-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-black">
                        New Policy
                      </p>
                      <p className="text-xs text-gray">
                        Create insurance policy
                      </p>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 bg-light-theme rounded-lg hover:bg-primary/10 transition-colors group">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <BarChartIcon className="size-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-black">Reports</p>
                      <p className="text-xs text-gray">View analytics</p>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 bg-light-theme rounded-lg hover:bg-primary/10 transition-colors group">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Download className="size-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-black">
                        Export Data
                      </p>
                      <p className="text-xs text-gray">Download reports</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
