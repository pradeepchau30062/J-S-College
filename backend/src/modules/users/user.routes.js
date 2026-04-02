import { Router } from 'express';
import { createStaff, listUsers } from './user.controller.js';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';

const router = Router();
router.use(auth, allowRoles('admin'));
router.post('/staff', createStaff);
router.get('/', listUsers);

export default router;
