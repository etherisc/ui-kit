import React from "react";
import { AppShell } from "@etherisc/ui-kit";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  ClipboardIcon,
  HelpCircleIcon,
  UserIcon,
  CreditCardIcon,
  LogOutIcon,
  BellIcon,
  ChevronDownIcon,
} from "lucide-react";

export function EnhancedAppShellTestPage() {
  // Enhanced topbar with dropdown navigation
  const enhancedTopBar = (
    <div className="flex items-center gap-6">
      <a
        href="/dashboard"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg border border-blue-200"
      >
        <HomeIcon className="h-4 w-4" />
        Dashboard
      </a>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
          <ShoppingCartIcon className="h-4 w-4" />
          Insurance Products
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="py-1">
            <a
              href="/insurance/auto"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Auto Insurance
            </a>
            <a
              href="/insurance/home"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <HomeIcon className="h-4 w-4" />
              Home Insurance
            </a>
            <a
              href="/insurance/life"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <UserIcon className="h-4 w-4" />
              Life Insurance
            </a>
            <a
              href="/insurance/business"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FileTextIcon className="h-4 w-4" />
              Business Insurance
            </a>
          </div>
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
          <ClipboardIcon className="h-4 w-4" />
          Claims
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="py-1">
            <a
              href="/claims/new"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <ClipboardIcon className="h-4 w-4" />
              File New Claim
            </a>
            <a
              href="/claims/track"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <BarChartIcon className="h-4 w-4" />
              Track Claims
            </a>
            <a
              href="/claims/history"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FileTextIcon className="h-4 w-4" />
              Claims History
            </a>
          </div>
        </div>
      </div>

      <a
        href="/customers"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <UsersIcon className="h-4 w-4" />
        Customers
      </a>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
          <BarChartIcon className="h-4 w-4" />
          Reports & Analytics
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="py-1">
            <a
              href="/reports/sales"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <TrendingUpIcon className="h-4 w-4" />
              Sales Reports
            </a>
            <a
              href="/reports/financial"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <DollarSignIcon className="h-4 w-4" />
              Financial Reports
            </a>
            <a
              href="/reports/customers"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <UsersIcon className="h-4 w-4" />
              Customer Analytics
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced user actions with dropdown
  const enhancedUserActions = (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-200">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        Welcome, Demo User!
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
          <UserIcon className="h-4 w-4" />
          Account
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Account
            </div>
            <a
              href="/notifications"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <BellIcon className="h-4 w-4" />
              Notifications
            </a>
            <a
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <UserIcon className="h-4 w-4" />
              My Profile
            </a>
            <a
              href="/billing"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <CreditCardIcon className="h-4 w-4" />
              Billing & Payments
            </a>
            <a
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <SettingsIcon className="h-4 w-4" />
              Account Settings
            </a>
            <div className="border-t border-gray-100 my-1"></div>
            <a
              href="/help"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <HelpCircleIcon className="h-4 w-4" />
              Help & Support
            </a>
            <button
              onClick={() => alert("Logout clicked!")}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              <LogOutIcon className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar navigation
  const sidebarNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon size={18} />,
      href: "/dashboard",
      isActive: false,
    },
    {
      id: "enhanced-test",
      label: "Enhanced Test",
      icon: <BarChartIcon size={18} />,
      href: "/enhanced-test",
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
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon size={18} />,
      href: "/settings",
      isActive: false,
    },
  ];

  // Enhanced logo
  const enhancedLogo = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">E</span>
      </div>
      <div className="hidden sm:block">
        <span className="font-bold text-xl text-black">Enhanced Portal</span>
        <div className="text-xs text-gray-500 -mt-1">
          Dropdown Navigation Demo
        </div>
      </div>
    </div>
  );

  return (
    <AppShell
      logo={enhancedLogo}
      navItems={sidebarNavItems}
      userActions={enhancedUserActions}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Top Navigation Demo */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Enhanced Navigation Bar Demo
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            This is how the enhanced topbar will look with dropdown menus:
          </p>
          {enhancedTopBar}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <BarChartIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Enhanced AppShell Demo
              </h1>
              <p className="text-lg text-gray-600">
                Showcasing dropdown navigation and enhanced UI components
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                🎯 Dropdown Navigation
              </h3>
              <p className="text-sm text-gray-600">
                The top navigation bar features dropdown menus for Insurance
                Products, Claims, and Reports & Analytics.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                👤 Enhanced User Menu
              </h3>
              <p className="text-sm text-gray-600">
                User actions dropdown includes organized sections with proper
                separators and icons.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                🧭 Smart Breadcrumbs
              </h3>
              <p className="text-sm text-gray-600">
                Enhanced breadcrumb navigation with better styling and hover
                states.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interactive Demo Features
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">
                Try hovering over the dropdown menus in the top navigation
              </span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800 font-medium">
                Click on the Account dropdown to see the enhanced user menu
              </span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-800 font-medium">
                Notice the improved breadcrumb styling and navigation
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
