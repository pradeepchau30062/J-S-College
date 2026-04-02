import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetRoles: [{ type: String, enum: ['admin', 'student', 'teacher', 'librarian', 'cashier'] }],
    targetSemester: Number,
    attachmentUrl: String,
    publishDate: { type: Date, default: Date.now },
    expiryDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const Notice = mongoose.model('Notice', noticeSchema);
