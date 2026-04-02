import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  librarianId: { type: String, unique: true },
  designation: String
}, { timestamps: true });
export const LibrarianProfile = mongoose.model('LibrarianProfile', schema);
