import { Router } from 'express';
import { auth, allowRoles } from '../../middlewares/auth.middleware.js';
import { Notice } from './notice.model.js';

const router = Router();
router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const base = { $or: [{ expiryDate: null }, { expiryDate: { $gte: new Date() } }] };
    if (req.user.role !== 'admin') {
      base.$and = [{ $or: [{ targetRoles: req.user.role }, { targetRoles: { $size: 0 } }] }];
    }
    const notices = await Notice.find(base).sort({ publishDate: -1 });
    res.json(notices);
  } catch (err) {
    next(err);
  }
});

router.post('/', allowRoles('admin'), async (req, res, next) => {
  try {
    const notice = await Notice.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(notice);
  } catch (err) {
    next(err);
  }
});

export default router;
