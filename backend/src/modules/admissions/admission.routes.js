import { Router } from 'express';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';
import { listAdmissions, reviewAdmission, upsertAdmission } from './admission.controller.js';

const router = Router();
router.use(auth);
router.get('/', allowRoles('admin'), listAdmissions);
router.post('/', allowRoles('admin'), upsertAdmission);
router.patch('/:id/review', allowRoles('admin'), reviewAdmission);

export default router;
