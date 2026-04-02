import { User } from './user.model.js';
import { TeacherProfile } from '../teachers/teacherProfile.model.js';
import { LibrarianProfile } from '../librarians/librarianProfile.model.js';
import { CashierProfile } from '../cashiers/cashierProfile.model.js';
import { generateEmployeeId } from '../../utils/idGenerator.js';

export const createStaff = async (req, res, next) => {
  try {
    const { fullName, email, password, role, designation, department } = req.body;
    if (!['teacher', 'librarian', 'cashier'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.create({ fullName, email, password, role, status: 'active', createdBy: req.user.id, emailVerified: true });

    if (role === 'teacher') {
      const teacherId = await generateEmployeeId(TeacherProfile, 'JSC-TEA');
      await TeacherProfile.create({ user: user._id, teacherId, designation, department });
    }
    if (role === 'librarian') {
      const librarianId = await generateEmployeeId(LibrarianProfile, 'JSC-LIB');
      await LibrarianProfile.create({ user: user._id, librarianId, designation });
    }
    if (role === 'cashier') {
      const cashierId = await generateEmployeeId(CashierProfile, 'JSC-CAS');
      await CashierProfile.create({ user: user._id, cashierId, designation });
    }

    res.status(201).json({ message: 'Staff account created', userId: user._id });
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};
    const users = await User.find(query).select('-password -refreshToken -resetToken');
    res.json(users);
  } catch (err) {
    next(err);
  }
};
