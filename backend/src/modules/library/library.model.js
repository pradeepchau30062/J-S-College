import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    isbn: String,
    category: String,
    quantity: Number,
    availableQuantity: Number,
    finePerDay: { type: Number, default: 10 }
  },
  { timestamps: true }
);

const issueSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: Date,
    returnDate: Date,
    fineAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
export const BookIssue = mongoose.model('BookIssue', issueSchema);
