import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    roomId: { type: String, index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: String,
    attachmentUrl: String,
    seenAt: Date
  },
  { timestamps: true }
);

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
