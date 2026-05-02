# Armenia Freelance Platform

A premium freelance marketplace built with React, TypeScript, and Tailwind CSS.

## Features
- **Role-based Auth**: Separate flows for Clients and Freelancers.
- **Job Marketplace**: Browse, search, and apply for high-tier projects.
- **Client Dashboard**: Post jobs, manage applications, and track progress.
- **Freelancer Dashboard**: Track earnings, manage proposals, and discover opportunities.
- **Premium UI**: Modern glassmorphic design with a focus on professional aesthetics.

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Neon (PostgreSQL) - *Ready for integration*
- **Icons**: Lucide React

## Setup & Deployment

### 1. Database (Neon)
- Create a project at [Neon.tech](https://neon.tech).
- Get your connection string.
- Add `VITE_NEON_DATABASE_URL` to your `.env` or Vercel Environment Variables.

### 2. Deployment (Vercel/Render)
- Connect your GitHub repository.
- Use `npm run build` as the build command.
- Set the output directory to `dist`.

## Local Development
```bash
npm install
npm run dev
```

---
Built with ❤️ for the Armenian Freelance Ecosystem.
