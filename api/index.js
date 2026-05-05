import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create tables if they don't exist
const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        "fullName" VARCHAR(255),
        email VARCHAR(255),
        role VARCHAR(50),
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        title VARCHAR(255),
        avatar VARCHAR(255),
        bio TEXT,
        category VARCHAR(255),
        "experienceYears" INTEGER,
        age INTEGER,
        verified BOOLEAN DEFAULT false,
        online BOOLEAN DEFAULT true,
        "completedJobsCount" INTEGER DEFAULT 0,
        "postedJobsCount" INTEGER DEFAULT 0,
        "ratingCount" INTEGER DEFAULT 0,
        "ratingSum" NUMERIC DEFAULT 0,
        rating NUMERIC DEFAULT 5.0,
        "rateAMD" NUMERIC,
        "rateUSD" NUMERIC
      );

      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        budget NUMERIC,
        deadline VARCHAR(255),
        type VARCHAR(50),
        category VARCHAR(255),
        "clientId" VARCHAR(255),
        "clientName" VARCHAR(255),
        "createdAt" TIMESTAMP,
        "proposalsCount" INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'open',
        "selectedFreelancerId" VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS proposals (
        id VARCHAR(255) PRIMARY KEY,
        "jobId" VARCHAR(255),
        "freelancerId" VARCHAR(255),
        "freelancerName" VARCHAR(255),
        bid NUMERIC,
        "coverLetter" TEXT,
        "createdAt" TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending'
      );
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing db', err);
  } finally {
    client.release();
  }
};

initDb();

// USERS
app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/api/users', async (req, res) => {
  const user = req.body;
  const query = `
    INSERT INTO users (id, "fullName", email, role, "firstName", "lastName", title, avatar, bio, category, "experienceYears", age, verified, online, "rateAMD", "rateUSD")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    ON CONFLICT (id) DO UPDATE SET online = EXCLUDED.online, age = EXCLUDED.age, "rateAMD" = EXCLUDED."rateAMD", "rateUSD" = EXCLUDED."rateUSD"
  `;
  await pool.query(query, [
    user.id, user.fullName, user.email, user.role, user.firstName, user.lastName, 
    user.title, user.avatar, user.bio, user.category, user.experienceYears, user.age, 
    user.verified, user.online, user.rateAMD, user.rateUSD
  ]);
  res.json({ success: true });
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const setClauses = [];
  const values = [];
  let idx = 1;
  for (const key in updates) {
    if (key !== 'id') {
      setClauses.push(`"${key}" = $${idx}`);
      values.push(updates[key]);
      idx++;
    }
  }
  if (setClauses.length > 0) {
    values.push(id);
    await pool.query(`UPDATE users SET ${setClauses.join(', ')} WHERE id = $${idx}`, values);
  }
  res.json({ success: true });
});

// JOBS
app.get('/api/jobs', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM jobs ORDER BY "createdAt" DESC');
  res.json(rows);
});

app.post('/api/jobs', async (req, res) => {
  const job = req.body;
  const query = `
    INSERT INTO jobs (id, title, description, budget, deadline, type, category, "clientId", "clientName", "createdAt", "proposalsCount", status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `;
  await pool.query(query, [
    job.id, job.title, job.description, job.budget, job.deadline, job.type, 
    job.category, job.clientId, job.clientName, job.createdAt, job.proposalsCount, job.status
  ]);
  await pool.query(`UPDATE users SET "postedJobsCount" = "postedJobsCount" + 1 WHERE id = $1`, [job.clientId]);
  res.json({ success: true });
});

app.put('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const setClauses = [];
  const values = [];
  let idx = 1;
  for (const key in updates) {
    if (key !== 'id') {
      setClauses.push(`"${key}" = $${idx}`);
      values.push(updates[key]);
      idx++;
    }
  }
  if (setClauses.length > 0) {
    values.push(id);
    await pool.query(`UPDATE jobs SET ${setClauses.join(', ')} WHERE id = $${idx}`, values);
  }
  res.json({ success: true });
});

// PROPOSALS
app.get('/api/proposals', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM proposals ORDER BY "createdAt" DESC');
  res.json(rows);
});

app.post('/api/proposals', async (req, res) => {
  const p = req.body;
  const query = `
    INSERT INTO proposals (id, "jobId", "freelancerId", "freelancerName", bid, "coverLetter", "createdAt", status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  await pool.query(query, [p.id, p.jobId, p.freelancerId, p.freelancerName, p.bid, p.coverLetter, p.createdAt, p.status]);
  await pool.query(`UPDATE jobs SET "proposalsCount" = "proposalsCount" + 1 WHERE id = $1`, [p.jobId]);
  res.json({ success: true });
});

app.put('/api/proposals/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const setClauses = [];
  const values = [];
  let idx = 1;
  for (const key in updates) {
    if (key !== 'id') {
      setClauses.push(`"${key}" = $${idx}`);
      values.push(updates[key]);
      idx++;
    }
  }
  if (setClauses.length > 0) {
    values.push(id);
    await pool.query(`UPDATE proposals SET ${setClauses.join(', ')} WHERE id = $${idx}`, values);
  }
  res.json({ success: true });
});

// Local dev server listener
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

export default app;
