/**
 * Database entity types for the showcase application
 */

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
  email?: string;
  created_at: string;
}

// Input types for creating new records (without auto-generated fields)
export interface CreateCustomerInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  company?: string;
  status?: 'active' | 'inactive' | 'pending';
}

export interface CreateUserInput {
  username: string;
  password: string;
  role?: 'admin' | 'user';
  email?: string;
}

// Update types (all fields optional except id)
export interface UpdateCustomerInput {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  company?: string;
  status?: 'active' | 'inactive' | 'pending';
}

// Pagination types
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Authentication types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  role: 'admin' | 'user';
  email?: string;
} 