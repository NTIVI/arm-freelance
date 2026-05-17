# bazaklientov Control Center

A high-end, premium fullstack database management system and client dashboard designed for maximum performance, clean developer ergonomics, and beautiful modern aesthetics. 

This template is fully optimized for **Vercel** (frontend), **Render** (backend), **Neon PostgreSQL** (serverless database), and **GitHub** (source control & automated deployments).

## 🚀 Key Architectural Pillars

- **Frontend (Vercel)**: React + TypeScript + Vite + Tailwind CSS with glassmorphism panels, fluid dark-mode transitions, and smooth micro-animations powered by Framer Motion.
- **Backend (Render)**: Minimalist, robust Express API that handles database pooling, health-monitoring, latency checks, and database record insertions and deletions.
- **Database (Neon)**: Serverless, lightning-fast PostgreSQL database with modern pooling enabled.
- **Source Control (GitHub)**: Unified codebase synced to [git@github.com:NTIVI/arm-freelance.git](git@github.com:NTIVI/arm-freelance.git).

---

## 🛠️ Stack & Infrastructure Setup

### 1. Database (Neon PostgreSQL)
1. Go to your dashboard at [Neon.tech](https://neon.tech).
2. Grab your connection string (`DATABASE_URL`).
3. Set the `DATABASE_URL` in your local `.env` file:
   ```env
   DATABASE_URL=postgresql://<user>:<password>@<host>/neondb?sslmode=require
   ```

### 2. Frontend Deployment (Vercel)
- Connect this repository to **Vercel**.
- The `vercel.json` rewrite configuration is already set up to route `/api/*` requests directly to the Express server, while serving the static Single Page Application (SPA) correctly on all other routes.
- **Build Settings**:
  - Build Command: `npm run build`
  - Output Directory: `dist`
- **Environment Variables**: Add `DATABASE_URL` as an environment variable in Vercel if needed.

### 3. Backend Deployment (Render)
- Deploy your web service on **Render** pointing to this repository.
- **Build Settings**:
  - Build Command: `npm install`
  - Start Command: `node api/index.js`
- **Environment Variables**:
  - Add `DATABASE_URL` pointing to your Neon PostgreSQL.
  - Set `PORT` to whatever port is requested by Render (defaults to `3001` locally).

---

## 💻 Local Development

### 1. Installation
Install the clean, essential dependencies:
```bash
npm install
```

### 2. Run Locally
Launch the Express backend server and the Vite React frontend dev server concurrently:
```bash
npm run dev
```
- Frontend will open at [http://localhost:5173](http://localhost:5173).
- Express API server will run at [http://localhost:3001](http://localhost:3001) and automatically connect to your Neon PostgreSQL database.

---
Built with ❤️ for a sleek, premium, and state-of-the-art Database Management experience.
