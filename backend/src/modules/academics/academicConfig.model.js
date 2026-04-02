import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  levels: [{ name: String, totalSemesters: Number }],
  promotionIntervalMonths: { type: Number, default: 6 },
  activeAcademicYear: String,
  semesters: [{ code: String, title: String }]
}, { timestamps: true });

export const AcademicConfig = mongoose.model('AcademicConfig', schema);
