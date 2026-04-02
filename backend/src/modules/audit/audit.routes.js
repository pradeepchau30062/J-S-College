import { Router } from 'express';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';
import { AuditLog } from './audit.model.js';

const router = Router();
router.use(auth, allowRoles('admin'));

router.get('/', async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate('actor', 'fullName role').sort({ createdAt: -1 }).limit(200);
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

export default router;
