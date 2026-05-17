import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
async function update() {
  try {
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS level VARCHAR(50) DEFAULT \'Bronze\';');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS fired_reason TEXT;');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_fired BOOLEAN DEFAULT FALSE;');
    
    await pool.query('ALTER TABLE drivers ADD COLUMN IF NOT EXISTS car_photo_url TEXT;');
    await pool.query('ALTER TABLE drivers ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 2) DEFAULT 5.00;');
    await pool.query('ALTER TABLE drivers ADD COLUMN IF NOT EXISTS last_profile_edit TIMESTAMP;');
    console.log("DB Updated");
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
update();
