import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import admissionRoutes from './modules/admissions/admission.routes.js';
import noticeRoutes from './modules/notices/notice.routes.js';
import academicRoutes from './modules/academics/academic.routes.js';
import feeRoutes from './modules/fees/fee.routes.js';
import libraryRoutes from './modules/library/library.routes.js';
import resultRoutes from './modules/results/result.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';
import auditRoutes from './modules/audit/audit.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import { env } from './config/env.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => res.json({ ok: true, app: 'J & S College API' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/audit', auditRoutes);

app.use(notFound);
app.use(errorHandler);
