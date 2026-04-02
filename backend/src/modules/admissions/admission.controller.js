import { Admission } from './admission.model.js';
import { StudentProfile } from '../students/studentProfile.model.js';
import { User } from '../users/user.model.js';
import { generateStudentId } from '../../utils/idGenerator.js';
import { logAudit } from '../audit/audit.service.js';

export const listAdmissions = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const list = await Admission.find(query).populate('student', 'fullName email status createdAt').sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const upsertAdmission = async (req, res, next) => {
  try {
    const { studentId, level, program, semester, section, remarks } = req.body;
    const admission = await Admission.findOneAndUpdate(
      { student: studentId },
      { student: studentId, level, program, semester, section, remarks },
      { new: true, upsert: true }
    );
    res.status(201).json(admission);
  } catch (err) {
    next(err);
  }
};

export const reviewAdmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, level, program, semester, section, remarks } = req.body;
    const admission = await Admission.findById(id);
    if (!admission) return res.status(404).json({ message: 'Admission not found' });

    admission.status = status;
    admission.level = level ?? admission.level;
    admission.program = program ?? admission.program;
    admission.semester = semester ?? admission.semester;
    admission.section = section ?? admission.section;
    admission.remarks = remarks;
    admission.reviewedBy = req.user.id;
    admission.reviewedAt = new Date();
    await admission.save();

    if (status === 'approved') {
      const student = await User.findById(admission.student);
      const profile = await StudentProfile.findOne({ user: admission.student });
      profile.level = admission.level;
      profile.program = admission.program;
      profile.semester = admission.semester;
      profile.section = admission.section;
      if (!profile.studentId) {
        const levelCodeMap = { Intermediate: 'INT', Bachelor: 'BSC', Master: 'MSC', PhD: 'PHD' };
        profile.studentId = await generateStudentId(StudentProfile, levelCodeMap[admission.level] || 'GEN', admission.semester || 1);
      }
      profile.admissionStatus = 'approved';
      student.status = 'active';
      await Promise.all([profile.save(), student.save()]);
    }

    await logAudit({ actor: req.user.id, action: `admission.${status}`, module: 'admissions', targetId: admission._id, meta: { student: admission.student } });
    res.json(admission);
  } catch (err) {
    next(err);
  }
};
