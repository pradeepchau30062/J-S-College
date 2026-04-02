import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    level: { type: String, enum: ['Intermediate', 'Bachelor', 'Master', 'PhD'] },
    program: String,
    semester: Number,
    section: String,
    remarks: String,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date
  },
  { timestamps: true }
);

export const Admission = mongoose.model('Admission', admissionSchema);
