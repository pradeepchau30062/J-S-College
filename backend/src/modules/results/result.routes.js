import { Router } from 'express';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';
import { Result } from './result.model.js';

const router = Router();
router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const query = req.user.role === 'student' ? { student: req.user.id } : {};
    res.json(await Result.find(query).sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/', allowRoles('admin'), async (req, res, next) => {
  try {
    const data = await Result.create({ ...req.body, publishedBy: req.user.id });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
