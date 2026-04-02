import { Router } from 'express';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';
import { FeeStructure, Payment } from './fee.model.js';

const router = Router();
router.use(auth);

router.get('/structures', async (req, res, next) => {
  try {
    res.json(await FeeStructure.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/structures', allowRoles('admin', 'cashier'), async (req, res, next) => {
  try {
    const doc = await FeeStructure.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

router.get('/payments', allowRoles('admin', 'cashier', 'student'), async (req, res, next) => {
  try {
    const query = req.user.role === 'student' ? { student: req.user.id } : {};
    res.json(await Payment.find(query).populate('student', 'fullName email').sort({ paidAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/payments', allowRoles('admin', 'cashier'), async (req, res, next) => {
  try {
    const receiptNo = `JSC-REC-${String(Date.now()).slice(-8)}`;
    const payment = await Payment.create({ ...req.body, receiptNo });
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
});

export default router;
