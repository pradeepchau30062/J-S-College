import { Router } from 'express';
import { auth, allowRoles } from '../../middlewares/auth.middleware.js';
import { User } from '../users/user.model.js';

const router = Router();
router.get('/admin-summary', auth, allowRoles('admin'), async (req, res) => {
  const [students, teachers, librarians, cashiers, pendingAdmissions] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'teacher' }),
    User.countDocuments({ role: 'librarian' }),
    User.countDocuments({ role: 'cashier' }),
    User.countDocuments({ role: 'student', status: 'pending' })
  ]);
  res.json({ students, teachers, librarians, cashiers, pendingAdmissions });
});

export default router;
