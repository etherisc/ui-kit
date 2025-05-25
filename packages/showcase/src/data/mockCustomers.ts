import { faker } from '@faker-js/faker';

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
}

// Generate 100 mock customers
function generateMockCustomers(): Customer[] {
  const customers: Customer[] = [];
  
  for (let i = 1; i <= 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    
    customers.push({
      id: i,
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
      country: faker.location.country(),
      company,
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending'] as const),
      created_at: faker.date.past({ years: 2 }).toISOString(),
    });
  }
  
  return customers;
}

// Export the mock data
export const mockCustomers = generateMockCustomers();

// Mock queries interface to match the database queries
export const MockCustomerQueries = {
  async getCustomers(options: { page: number; limit: number }) {
    const { page, limit } = options;
    const offset = (page - 1) * limit;
    const paginatedCustomers = mockCustomers.slice(offset, offset + limit);
    
    return {
      customers: paginatedCustomers,
      total: mockCustomers.length,
      page,
      limit,
      totalPages: Math.ceil(mockCustomers.length / limit),
    };
  },

  async getCustomerStats() {
    const active = mockCustomers.filter(c => c.status === 'active').length;
    const pending = mockCustomers.filter(c => c.status === 'pending').length;
    const inactive = mockCustomers.filter(c => c.status === 'inactive').length;
    
    return {
      active,
      pending,
      inactive,
      total: mockCustomers.length,
    };
  },
}; 