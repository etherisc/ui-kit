import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

async function globalSetup() {
  // Ensure database is seeded before tests run
  const dbPath = path.join(process.cwd(), 'showcase.db');

  if (!existsSync(dbPath)) {
    console.log('🌱 Database not found, running seed script...');
    execSync('pnpm run seed', { stdio: 'inherit' });
  } else {
    console.log('✅ Database already exists, skipping seed');
  }
}

export default globalSetup; 