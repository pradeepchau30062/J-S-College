import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'teacher', 'librarian', 'cashier'],
      default: 'student'
    },
    profilePhoto: String,
    phone: String,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: Date,
    address: String,
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otpCode: String,
    otpExpiresAt: Date,
    emailVerified: { type: Boolean, default: false },
    refreshToken: String,
    resetToken: String,
    resetTokenExpiresAt: Date,
    lastLoginAt: Date,
    googleProviderId: String
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
