#!/usr/bin/env node

import { faker } from '@faker-js/faker';
import { initializeDatabase, closeDatabase } from '../src/database/connection.js';
import { CustomerQueries, UserQueries } from '../src/database/queries.js';
import type { CreateCustomerInput, CreateUserInput } from '../src/database/types.js';

/**
 * Generate realistic customer data using faker
 */
function generateCustomer(): CreateCustomerInput {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = faker.company.name();
  
  return {
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
  };
}

/**
 * Generate user data
 */
function generateUsers(): CreateUserInput[] {
  return [
    {
      username: 'admin',
      password: 'admin',
      role: 'admin',
      email: 'admin@example.com',
    },
    {
      username: 'user',
      password: 'user',
      role: 'user',
      email: 'user@example.com',
    },
  ];
}

/**
 * Clear existing data from tables
 */
async function clearTables(): Promise<void> {
  const { runQuery } = await import('../src/database/connection.js');
  
  console.log('Clearing existing data...');
  await runQuery('DELETE FROM customers');
  await runQuery('DELETE FROM users');
  
  // Reset auto-increment counters
  await runQuery('DELETE FROM sqlite_sequence WHERE name IN ("customers", "users")');
  
  console.log('Existing data cleared.');
}

/**
 * Seed customers
 */
async function seedCustomers(): Promise<void> {
  console.log('Generating 100 customers...');
  
  const customers: CreateCustomerInput[] = [];
  for (let i = 0; i < 100; i++) {
    customers.push(generateCustomer());
  }
  
  console.log('Inserting customers into database...');
  
  for (let i = 0; i < customers.length; i++) {
    try {
      await CustomerQueries.createCustomer(customers[i]);
      if ((i + 1) % 20 === 0) {
        console.log(`Inserted ${i + 1} customers...`);
      }
    } catch (error) {
      console.error(`Failed to insert customer ${i + 1}:`, error);
      throw error;
    }
  }
  
  console.log('✅ Successfully inserted 100 customers');
}

/**
 * Seed users
 */
async function seedUsers(): Promise<void> {
  console.log('Creating admin and user accounts...');
  
  const users = generateUsers();
  
  for (const user of users) {
    try {
      await UserQueries.createUser(user);
      console.log(`✅ Created user: ${user.username} (${user.role})`);
    } catch (error) {
      console.error(`Failed to create user ${user.username}:`, error);
      throw error;
    }
  }
}

/**
 * Verify seeded data
 */
async function verifyData(): Promise<void> {
  console.log('\nVerifying seeded data...');
  
  const customerResult = await CustomerQueries.getCustomers({ page: 1, limit: 1 });
  const customerCount = customerResult.total;
  const users = await UserQueries.getAllUsers();
  
  console.log(`📊 Database contains:`);
  console.log(`   - ${customerCount} customers`);
  console.log(`   - ${users.length} users`);
  
  users.forEach(user => {
    console.log(`   - User: ${user.username} (${user.role})`);
  });
  
  if (customerCount === 100 && users.length === 2) {
    console.log('\n✅ Database seeding completed successfully!');
  } else {
    console.log('\n❌ Database seeding verification failed!');
    process.exit(1);
  }
}

/**
 * Main seeding function
 */
async function main(): Promise<void> {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Initialize database
    await initializeDatabase();
    
    // Clear existing data
    await clearTables();
    
    // Seed data
    await seedUsers();
    await seedCustomers();
    
    // Verify results
    await verifyData();
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log('  Admin: username=admin, password=admin');
    console.log('  User:  username=user, password=user');
    
  } catch (error) {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    closeDatabase();
  }
}

// Run the seeding script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
} 