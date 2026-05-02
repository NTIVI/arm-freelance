import { neon } from '@neondatabase/serverless';

/**
 * Neon Database Connection
 * To use this, add NEON_DATABASE_URL to your environment variables.
 */
const sql = neon(import.meta.env.VITE_NEON_DATABASE_URL || '');

export default sql;

// Example Usage:
// const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
