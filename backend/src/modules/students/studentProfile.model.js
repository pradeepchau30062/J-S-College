import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    studentId: { type: String, unique: true, sparse: true },
    level: { type: String, enum: ['Intermediate', 'Bachelor', 'Master', 'PhD'] },
    semester: Number,
    faculty: String,
    program: String,
    section: String,
    rollNumber: String,
    admissionStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    guardianName: String,
    guardianPhone: String,
    nationalId: String,
    bloodGroup: String,
    joinedYear: Number,
    currentAcademicStatus: { type: String, default: 'active' },
    lastPromotionAt: Date
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
