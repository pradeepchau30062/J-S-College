import { Router } from 'express';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';
import { Book, BookIssue } from './library.model.js';

const router = Router();
router.use(auth);

router.get('/books', async (req, res, next) => {
  try {
    res.json(await Book.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});
router.post('/books', allowRoles('admin', 'librarian'), async (req, res, next) => {
  try {
    const body = req.body;
    body.availableQuantity = body.availableQuantity ?? body.quantity;
    res.status(201).json(await Book.create(body));
  } catch (err) {
    next(err);
  }
});

router.get('/issues', async (req, res, next) => {
  try {
    const query = req.user.role === 'student' ? { student: req.user.id } : {};
    res.json(await BookIssue.find(query).populate('book student', 'title fullName studentId').sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});
router.post('/issues', allowRoles('admin', 'librarian'), async (req, res, next) => {
  try {
    res.status(201).json(await BookIssue.create({ ...req.body, issuedBy: req.user.id }));
  } catch (err) {
    next(err);
  }
});

export default router;
