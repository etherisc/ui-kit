import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database file path
const DB_PATH = join(__dirname, '../../database.sqlite');

// Schema file path
const SCHEMA_PATH = join(__dirname, 'schema.sql');

let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

/**
 * Initialize SQL.js and database connection
 */
export async function initializeDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  try {
    // Initialize SQL.js
    if (!SQL) {
      SQL = await initSqlJs();
    }

    // Load existing database or create new one
    let data: Uint8Array | undefined;
    if (existsSync(DB_PATH)) {
      data = readFileSync(DB_PATH);
    }

    // Create database connection
    db = new SQL.Database(data);

    // Read and execute schema
    const schema = readFileSync(SCHEMA_PATH, 'utf-8');
    db.exec(schema);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Get the database connection (initialize if not already done)
 */
export async function getDatabase(): Promise<Database> {
  if (!db) {
    return await initializeDatabase();
  }
  return db;
}

/**
 * Save database to file
 */
export async function saveDatabase(): Promise<void> {
  if (db) {
    const data = db.export();
    writeFileSync(DB_PATH, data);
  }
}

/**
 * Close the database connection
 */
export function closeDatabase(): void {
  if (db) {
    // Save database before closing
    const data = db.export();
    writeFileSync(DB_PATH, data);
    db.close();
    db = null;
    console.log('Database connection closed');
  }
}

/**
 * Execute a query with promise wrapper
 */
export async function runQuery(sql: string, params: (string | number | null)[] = []): Promise<{ lastID: number; changes: number }> {
  const database = await getDatabase();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  stmt.step();
  stmt.free();
  
  // Save database after write operations
  if (sql.trim().toUpperCase().startsWith('INSERT') || 
      sql.trim().toUpperCase().startsWith('UPDATE') || 
      sql.trim().toUpperCase().startsWith('DELETE')) {
    await saveDatabase();
  }
  
  // Get last insert rowid and changes from database
  const lastIDResult = database.exec('SELECT last_insert_rowid() as lastID')[0];
  const changesResult = database.exec('SELECT changes() as changes')[0];
  
  const lastID = lastIDResult?.values[0]?.[0] as number || 0;
  const changes = changesResult?.values[0]?.[0] as number || 0;
  
  return { lastID, changes };
}

/**
 * Execute a query and get all results
 */
export async function getAllQuery(sql: string, params: (string | number | null)[] = []): Promise<unknown[]> {
  const database = await getDatabase();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const results: unknown[] = [];
  
  while (stmt.step()) {
    const row = stmt.getAsObject();
    results.push(row);
  }
  
  stmt.free();
  return results;
}

/**
 * Execute a query and get first result
 */
export async function getQuery(sql: string, params: (string | number | null)[] = []): Promise<unknown> {
  const database = await getDatabase();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  
  let result: unknown = null;
  if (stmt.step()) {
    result = stmt.getAsObject();
  }
  
  stmt.free();
  return result;
}

// Cleanup on process exit
process.on('exit', closeDatabase);
process.on('SIGINT', () => {
  closeDatabase();
  process.exit(0);
});
process.on('SIGTERM', () => {
  closeDatabase();
  process.exit(0);
}); 