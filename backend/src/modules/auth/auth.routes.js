import { Router } from 'express';
import { forgotPassword, login, refresh, resetPassword, studentRegister, verifyEmailOtp } from './auth.controller.js';

const router = Router();
router.post('/register/student', studentRegister);
router.post('/verify-otp', verifyEmailOtp);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
