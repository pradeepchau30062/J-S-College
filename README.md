# J & S College Management System (MERN)

Production-style scaffold for a multi-role college ERP.

## Structure
- `backend/` Express + MongoDB + JWT + Socket.IO API
- `frontend/` React + Vite + Tailwind SPA

## Run backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed:admin
npm run dev
```

## Run frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoint Summary
- `POST /api/auth/register/student`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/dashboard/admin-summary` (admin)
- `POST /api/users/staff` (admin)
- `GET /api/users` (admin)

## Database Schema Summary
- `User`: shared identity/profile/auth fields + role
- `StudentProfile`: admission and academic metadata
- `TeacherProfile`, `LibrarianProfile`, `CashierProfile`: role-specific metadata and generated IDs
- `AcademicConfig`: level/semester/promotion settings

## Security Notes
- Single super admin seeded only from backend env/script.
- No public admin registration/reset.
- Password hashing via bcrypt pre-save hook.
- JWT access + refresh flow.
- Helmet, CORS, rate limiting, role middleware.

## Deployment Notes
- Configure reverse proxy (Nginx) for frontend/backend domains.
- Use managed MongoDB Atlas.
- Set secure cookie, HTTPS, and trusted proxy in production.
- Replace local uploads with S3/Cloudinary adapter module.
- Add CI checks, tests, logging/monitoring (Sentry, OpenTelemetry).
