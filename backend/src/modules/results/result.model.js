import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    semester: Number,
    session: String,
    items: [
      {
        subject: String,
        marks: Number,
        grade: String
      }
    ],
    totalMarks: Number,
    gpa: Number,
    passStatus: { type: String, enum: ['pass', 'fail'], default: 'pass' },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Result = mongoose.model('Result', resultSchema);
