import { runQuery, getAllQuery, getQuery } from './connection.js';
import type {
  Customer,
  User,
  CreateCustomerInput,
  CreateUserInput,
  UpdateCustomerInput,
  PaginationOptions,
  PaginatedResult,
  LoginCredentials,
  AuthenticatedUser,
} from './types.js';
import bcrypt from 'bcryptjs';

/**
 * Customer queries
 */
export class CustomerQueries {
  /**
   * Get all customers with pagination
   */
  static async getCustomers(options: PaginationOptions): Promise<PaginatedResult<Customer>> {
    const { page, limit, sortBy = 'id', sortOrder = 'asc' } = options;
    const offset = (page - 1) * limit;

    // Validate sort column to prevent SQL injection
    const allowedSortColumns = ['id', 'first_name', 'last_name', 'email', 'company', 'status', 'created_at'];
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'id';
    const safeSortOrder = sortOrder === 'desc' ? 'DESC' : 'ASC';

    // Get total count
    const countResult = await getQuery('SELECT COUNT(*) as count FROM customers');
    const total = (countResult as { count: number }).count;

    // Get paginated data
    const data = await getAllQuery(`
      SELECT * FROM customers 
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT ? OFFSET ?
    `, [limit, offset]) as Customer[];

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get customer by ID
   */
  static async getCustomerById(id: number): Promise<Customer | null> {
    const result = await getQuery('SELECT * FROM customers WHERE id = ?', [id]);
    return result as Customer | null;
  }

  /**
   * Create a new customer
   */
  static async createCustomer(customer: CreateCustomerInput): Promise<Customer> {
    const result = await runQuery(`
      INSERT INTO customers (
        first_name, last_name, email, phone, address, city, state, 
        zip_code, country, company, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      customer.first_name,
      customer.last_name,
      customer.email,
      customer.phone || null,
      customer.address || null,
      customer.city || null,
      customer.state || null,
      customer.zip_code || null,
      customer.country || null,
      customer.company || null,
      customer.status || 'active'
    ]);

    return await this.getCustomerById(result.lastID) as Customer;
  }

  /**
   * Update a customer
   */
  static async updateCustomer(customer: UpdateCustomerInput): Promise<Customer | null> {
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    // Build dynamic update query
    Object.entries(customer).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return await this.getCustomerById(customer.id);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(customer.id);

    await runQuery(`
      UPDATE customers 
      SET ${updates.join(', ')}
      WHERE id = ?
    `, values);

    return await this.getCustomerById(customer.id);
  }

  /**
   * Delete a customer
   */
  static async deleteCustomer(id: number): Promise<boolean> {
    const result = await runQuery('DELETE FROM customers WHERE id = ?', [id]);
    return result.changes > 0;
  }

  /**
   * Search customers by name or email
   */
  static async searchCustomers(query: string, options: PaginationOptions): Promise<PaginatedResult<Customer>> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;
    const searchTerm = `%${query}%`;

    // Get total count
    const countResult = await getQuery(`
      SELECT COUNT(*) as count FROM customers 
      WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ?
    `, [searchTerm, searchTerm, searchTerm, searchTerm]);
    const total = (countResult as { count: number }).count;

    // Get paginated data
    const data = await getAllQuery(`
      SELECT * FROM customers 
      WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ?
      ORDER BY first_name ASC
      LIMIT ? OFFSET ?
    `, [searchTerm, searchTerm, searchTerm, searchTerm, limit, offset]) as Customer[];

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

/**
 * User queries
 */
export class UserQueries {
  /**
   * Create a new user with hashed password
   */
  static async createUser(user: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    const result = await runQuery(`
      INSERT INTO users (username, password, role, email)
      VALUES (?, ?, ?, ?)
    `, [
      user.username,
      hashedPassword,
      user.role || 'user',
      user.email || null
    ]);

    return await this.getUserById(result.lastID) as User;
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: number): Promise<User | null> {
    const result = await getQuery('SELECT * FROM users WHERE id = ?', [id]);
    return result as User | null;
  }

  /**
   * Get user by username
   */
  static async getUserByUsername(username: string): Promise<User | null> {
    const result = await getQuery('SELECT * FROM users WHERE username = ?', [username]);
    return result as User | null;
  }

  /**
   * Authenticate user with username and password
   */
  static async authenticateUser(credentials: LoginCredentials): Promise<AuthenticatedUser | null> {
    const user = await this.getUserByUsername(credentials.username);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(): Promise<User[]> {
    const result = await getAllQuery('SELECT * FROM users ORDER BY created_at DESC');
    return result as User[];
  }
} 