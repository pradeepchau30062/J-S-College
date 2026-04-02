import { Router } from 'express';
import { AcademicConfig } from './academicConfig.model.js';
import { StudentProfile } from '../students/studentProfile.model.js';
import { allowRoles, auth } from '../../middlewares/auth.middleware.js';

const router = Router();
router.use(auth);

router.get('/config', async (req, res, next) => {
  try {
    const config = await AcademicConfig.findOne({ isActive: true });
    res.json(config);
  } catch (err) {
    next(err);
  }
});

router.post('/config', allowRoles('admin'), async (req, res, next) => {
  try {
    await AcademicConfig.updateMany({}, { isActive: false });
    const config = await AcademicConfig.create({ ...req.body, isActive: true });
    res.status(201).json(config);
  } catch (err) {
    next(err);
  }
});

router.post('/promote', allowRoles('admin'), async (req, res, next) => {
  try {
    const { level, semester, dryRun = false } = req.body;
    const target = await StudentProfile.find({ level, semester, admissionStatus: 'approved' });
    if (!dryRun) {
      await StudentProfile.updateMany(
        { level, semester, admissionStatus: 'approved' },
        { $inc: { semester: 1 }, $set: { lastPromotionAt: new Date() } }
      );
    }
    res.json({ promotedCount: target.length, dryRun });
  } catch (err) {
    next(err);
  }
});

export default router;
