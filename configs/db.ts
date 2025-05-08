// configs/db.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'; // Import your schema

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const sql = neon(process.env.DATABASE_URL);

// Add schema to drizzle configuration
export const db = drizzle(sql, { schema });
console.log("Database connected successfully");

export default sql;