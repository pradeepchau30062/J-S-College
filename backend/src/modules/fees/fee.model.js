import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema(
  {
    level: String,
    semester: Number,
    session: String,
    items: [
      {
        category: String,
        amount: Number
      }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feeStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure' },
    receiptNo: { type: String, unique: true },
    paidAmount: Number,
    discountAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: 'cash' },
    status: { type: String, enum: ['paid', 'partial', 'refunded'], default: 'paid' },
    paidAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
export const Payment = mongoose.model('Payment', paymentSchema);
