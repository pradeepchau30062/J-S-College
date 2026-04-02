import crypto from 'crypto';
import { z } from 'zod';
import { User } from '../users/user.model.js';
import { StudentProfile } from '../students/studentProfile.model.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import { sendEmail } from '../../utils/mailer.js';

const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

export const studentRegister = async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: payload.email });
    if (exists) return res.status(409).json({ message: 'Email already exists' });

    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const user = await User.create({ ...payload, role: 'student', otpCode, otpExpiresAt, status: 'pending' });
    await StudentProfile.create({ user: user._id });

    await sendEmail({
      to: user.email,
      subject: 'Verify your J & S College account',
      html: `<p>Your OTP is <b>${otpCode}</b>. It expires in 10 minutes.</p>`
    });

    res.status(201).json({ message: 'Registered. Verify OTP sent to email.' });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, role: 'student' });
    if (!user || user.otpCode !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid/expired OTP' });
    }
    user.emailVerified = true;
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (role === 'student' && !user.emailVerified) return res.status(403).json({ message: 'Email not verified' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const tokenPayload = { id: user._id, role: user.role, email: user.email };
    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);
    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' });
    res.json({ accessToken, user: tokenPayload });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: 'Missing refresh token' });
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) return res.status(401).json({ message: 'Invalid refresh token' });
    const accessToken = signAccessToken({ id: user._id, role: user.role, email: user.email });
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, role: { $ne: 'admin' } });
    if (!user) return res.json({ message: 'If account exists, email sent' });
    const resetToken = crypto.randomBytes(24).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendEmail({ to: email, subject: 'Reset your password', html: `<a href='${link}'>Reset Password</a>` });
    res.json({ message: 'If account exists, email sent' });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ resetToken: token, resetTokenExpiresAt: { $gt: new Date() } });
    if (!user || user.role === 'admin') return res.status(400).json({ message: 'Invalid token' });
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save();
    res.json({ message: 'Password reset success' });
  } catch (err) {
    next(err);
  }
};
