import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  teacherId: { type: String, unique: true },
  department: String,
  subjectSpecialization: String,
  designation: String,
  qualification: String,
  joiningDate: Date
}, { timestamps: true });

export const TeacherProfile = mongoose.model('TeacherProfile', schema);
