# SkillLift

SkillLift is a full-stack job/placement portal connecting **colleges** and **recruiters**. Recruiters can register companies and post job openings, while colleges can browse jobs, apply on behalf of students, and track application status — all through a single platform.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## About

SkillLift is organized as a monorepo with two main parts:

- **`backend/`** — Express + MongoDB REST API handling authentication, user/company/job/application management, and file uploads (resumes, profile photos, logos) via Cloudinary.
- **`frontend/`** — React (Vite) single-page app for both college and recruiter user experiences, built with Redux Toolkit for state management and Radix UI + Tailwind CSS for the interface.

The backend also serves the built frontend (`frontend/dist`) as static files, so the app can be deployed as a single service.

## Features

**Shared**
- Role-based authentication (JWT + cookies) for two user types: **College** and **Recruiter**
- Profile management with photo/resume uploads (Cloudinary)

**Recruiter**
- Register and manage a company profile
- Post, view, and delete job listings
- View applicants per job and update applicant/student status

**College**
- Browse and filter available jobs
- View job details
- Apply to jobs (supports uploading multiple resumes for students)
- Track applied jobs and their status

## Tech Stack

**Frontend**
- React 19, React Router
- Redux Toolkit, Redux Persist
- Vite
- Tailwind CSS
- Radix UI primitives (avatar, dialog, popover, select, radio-group, label)
- Axios, Framer Motion, Embla Carousel, Sonner (toasts)

**Backend**
- Node.js, Express 5
- MongoDB with Mongoose
- JWT authentication, bcryptjs, cookie-parser
- Multer + Cloudinary + multer-storage-cloudinary (file uploads)
- datauri (in-memory file handling)

## Project Structure

```
SkillLift-main/
├── backend/
│   ├── controllers/     # Route handlers (user, company, job, application)
│   ├── middlewares/     # Auth middleware, multer configs
│   ├── models/           # Mongoose schemas (User, Company, Job, Application)
│   ├── routes/            # API route definitions
│   ├── utils/              # DB connection, Cloudinary, datauri helpers
│   └── index.js             # App entry point (also serves frontend/dist)
├── frontend/
│   └── src/
│       ├── components/     # Shared, admin, auth, and UI components
│       ├── hooks/            # Data-fetching hooks (jobs, companies, applications, colleges)
│       ├── redux/             # Redux slices and store
│       └── App.jsx
└── package.json          # Root scripts (dev/build combine backend + frontend)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for resume/photo uploads)

### Installation

From the project root:

```bash
npm install
npm install --prefix frontend
```

### Running Locally

**Backend (from root):**

```bash
npm run dev
```

This runs `nodemon backend/index.js`. Create a `.env` file at the project root first (see below).

**Frontend (in a separate terminal):**

```bash
cd frontend
npm run dev
```

Runs the Vite dev server (default `http://localhost:5173`).

**Production build (from root):**

```bash
npm run build
```

This installs frontend dependencies and builds the frontend into `frontend/dist`, which the backend serves automatically when `npm start` is run.

## Environment Variables

Create a `.env` file at the project root with:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string

# JWT
SECRET_KEY=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

> Confirm the exact variable names expected by `backend/utils/cloudinary.js` and the auth controller/middleware, since naming may differ slightly in your implementation.

Also note: `backend/index.js` currently has CORS locked to a specific deployed origin (`https://skilllift-1-yb8u.onrender.com`). Update this to `http://localhost:5173` (or your dev URL) for local development, or make it environment-driven.

## API Overview

Base URL: `/api/v1`

| Route | Description |
|---|---|
| `/user/register` | Register a new user (college or recruiter) |
| `/user/login` | Log in |
| `/user/logout` | Log out |
| `/user/profile/update` | Update user profile (with file upload) |
| `/user/colleges` | Get all colleges |
| `/company/register` | Register a company (recruiter only) |
| `/company/get`, `/company/get/:id` | Fetch company data |
| `/company/update/:id` | Update company profile (with logo upload) |
| `/job/post` | Post a new job |
| `/job/get` | Get all jobs |
| `/job/getadminjobs` | Get jobs posted by the logged-in recruiter |
| `/job/get/:id` | Get a single job |
| `/job/delete/:id` | Delete a job |
| `/application/apply/:id` | Apply to a job (college only, supports multiple resume uploads) |
| `/application/applied` | Get applied jobs (college only) |
| `/application/job/:id/applicants` | Get applicants for a job (recruiter only) |
| `/application/:applicationId/student/:studentId/status` | Update an applicant's status (recruiter only) |

## Deployment

The backend is set up to serve the built frontend directly (`express.static` + SPA fallback to `index.html`), so the whole app can be deployed as a single Node service (e.g. Render, Railway). Make sure to:

1. Run `npm run build` to generate `frontend/dist`
2. Set all required environment variables on your hosting platform
3. Update the CORS `origin` in `backend/index.js` to match your deployed frontend URL

## Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source. Add your preferred license here (e.g. MIT).
