import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    "fullName" VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'client',
    phone VARCHAR(50),
    dob VARCHAR(50),
    shadow_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS drivers (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    car_model VARCHAR(255),
    car_number VARCHAR(100),
    capacity INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    passport_url TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS routes (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image TEXT,
    price DECIMAL(10, 2),
    duration VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS objects (
    id VARCHAR(50) PRIMARY KEY,
    route_id VARCHAR(50) REFERENCES routes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    image TEXT,
    price DECIMAL(10, 2),
    description TEXT,
    menu TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    client_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    route_id VARCHAR(50) REFERENCES routes(id) ON DELETE SET NULL,
    hotel_id VARCHAR(50) REFERENCES objects(id) ON DELETE SET NULL,
    restaurant_id VARCHAR(50) REFERENCES objects(id) ON DELETE SET NULL,
    driver_id VARCHAR(50) REFERENCES drivers(id) ON DELETE SET NULL,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    date VARCHAR(50),
    vip_transfer BOOLEAN DEFAULT FALSE,
    group_size INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function initDB() {
  console.log('Connecting to Neon Database to initialize schema...');
  try {
    await pool.query(schema);
    console.log('✅ Success! ArmTurn Database Schema initialized perfectly.');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

initDB();
