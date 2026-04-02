# J & S College Management System (MERN)

Production-style multi-role College ERP for **J & S College** with React + Vite frontend and Express + MongoDB backend.

## Features delivered in this implementation
- Multi-role architecture: `admin`, `student`, `teacher`, `librarian`, `cashier`.
- Secure auth: JWT access token + refresh token, bcrypt hashed passwords, student OTP verification.
- Strict admin bootstrap via backend seed/env only (no public admin registration/reset).
- Student self-registration + admission review pipeline.
- Admin staff creation with role-based ID generation.
- Academic configuration and semester promotion endpoints.
- Notices, fees/payments, library inventory/issue, result publishing modules.
- Audit log module for privileged actions.
- Socket.IO real-time chat + WebRTC signaling hooks + presence status.
- Professional responsive UI, role dashboards, chart widgets, theme toggle.

---

## Monorepo structure
```txt
backend/
frontend/
```

---

## Backend setup
```bash
cd backend
npm install
cp .env.example .env
npm run seed:admin
npm run dev
```

## Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Environment sample
- `backend/.env.example` includes MongoDB, JWT, admin seed, SMTP values.
- `frontend/.env.example` includes API base URL.

---

## API endpoint summary
### Auth
- `POST /api/auth/register/student`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Users & dashboard
- `POST /api/users/staff` (admin)
- `GET /api/users` (admin)
- `GET /api/dashboard/admin-summary` (admin)

### Admissions
- `GET /api/admissions` (admin)
- `POST /api/admissions` (admin)
- `PATCH /api/admissions/:id/review` (admin)

### Academics
- `GET /api/academics/config`
- `POST /api/academics/config` (admin)
- `POST /api/academics/promote` (admin)

### Notices
- `GET /api/notices`
- `POST /api/notices` (admin)

### Fees
- `GET /api/fees/structures`
- `POST /api/fees/structures` (admin/cashier)
- `GET /api/fees/payments`
- `POST /api/fees/payments` (admin/cashier)

### Library
- `GET /api/library/books`
- `POST /api/library/books` (admin/librarian)
- `GET /api/library/issues`
- `POST /api/library/issues` (admin/librarian)

### Results
- `GET /api/results`
- `POST /api/results` (admin)

### Chat / Audit
- `GET /api/chat/:roomId`
- `GET /api/audit` (admin)

---

## Database schema summary
- **User**: core identity + auth + role + lifecycle fields.
- **StudentProfile**: admission, guardian, level/semester/program metadata.
- **TeacherProfile/LibrarianProfile/CashierProfile**: role-specific staff metadata.
- **Admission**: pending/approved/rejected workflow state.
- **AcademicConfig**: levels, semester constraints, promotion settings.
- **Notice**: role-targeted announcements with publish/expiry.
- **FeeStructure/Payment**: semester/session fees and receipt-tracked payments.
- **Book/BookIssue**: inventory + circulation + overdue/fine basis.
- **Result**: semester-wise subject marks and GPA/pass-fail.
- **ChatMessage**: persisted chat timeline for teacher-student interactions.
- **AuditLog**: admin-sensitive action trail.

---

## Deployment notes
- Build frontend and serve with CDN/static host (Vercel/Netlify/S3+CloudFront).
- Deploy backend to container/PaaS (Render/Railway/EC2) with persistent MongoDB Atlas.
- Enable HTTPS + secure cookies + trusted proxy in production.
- Route `/uploads` to object storage adapter (Cloudinary/S3 ready extension point).
- Add CI checks (lint/test/build), observability (Sentry/OTel), backups, and job scheduler for reminders.

---

## Next expansion phases
- Full module CRUD screens and form validation for all role pages.
- Google OAuth, advanced OTP provider, and token rotation hardening.
- Assignment/test workflows, attendance monthly reports, transcripts/certificates.
- Bulk import/export (CSV/Excel/PDF), alumni/hostel/transport placeholders.
- Notification center, email templates, and scheduled messaging/dues automation.
