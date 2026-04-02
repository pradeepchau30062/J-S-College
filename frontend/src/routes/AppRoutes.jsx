import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/public/HomePage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { ProtectedRoute } from './ProtectedRoute';
import { createRoleRoutes } from './RoleRoutes';

const roleNav = {
  admin: [
    { to: '.', label: 'Dashboard' }, { to: 'admissions', label: 'Admissions' }, { to: 'students', label: 'Students' },
    { to: 'teachers', label: 'Teachers' }, { to: 'librarians', label: 'Librarians' }, { to: 'cashiers', label: 'Cashiers' },
    { to: 'academic-setup', label: 'Academic Setup' }, { to: 'semester-promotion', label: 'Semester Promotion' },
    { to: 'departments', label: 'Departments' }, { to: 'programs', label: 'Programs' }, { to: 'subjects', label: 'Subjects' },
    { to: 'notices', label: 'Notices' }, { to: 'exams', label: 'Exams' }, { to: 'admit-cards', label: 'Admit Cards' },
    { to: 'results', label: 'Results' }, { to: 'fee-management', label: 'Fee Management' }, { to: 'library-overview', label: 'Library Overview' },
    { to: 'notifications', label: 'Notifications' }, { to: 'reports', label: 'Reports' }, { to: 'system-settings', label: 'System Settings' }, { to: 'profile', label: 'Profile' }
  ],
  student: [{ to: '.', label: 'Dashboard' }, { to: 'profile', label: 'Profile' }, { to: 'notices', label: 'Notices' }, { to: 'study-materials', label: 'Study Materials' }, { to: 'assignments-tests', label: 'Assignments/Tests' }, { to: 'submissions', label: 'Submissions' }, { to: 'exam-routine', label: 'Exam Routine' }, { to: 'admit-card', label: 'Admit Card' }, { to: 'results', label: 'Results' }, { to: 'fees', label: 'Fees' }, { to: 'receipts', label: 'Receipts' }, { to: 'chat', label: 'Chat' }, { to: 'settings', label: 'Settings' }],
  teacher: [{ to: '.', label: 'Dashboard' }, { to: 'profile', label: 'Profile' }, { to: 'assigned-subjects', label: 'Assigned Subjects' }, { to: 'materials', label: 'Materials' }, { to: 'tests-assignments', label: 'Tests/Assignments' }, { to: 'submissions', label: 'Submissions' }, { to: 'marks', label: 'Marks' }, { to: 'chat', label: 'Chat' }, { to: 'schedule', label: 'Schedule' }, { to: 'settings', label: 'Settings' }],
  librarian: [{ to: '.', label: 'Dashboard' }, { to: 'students', label: 'Students' }, { to: 'books', label: 'Books' }, { to: 'issue-return', label: 'Issue Return' }, { to: 'overdue', label: 'Overdue' }, { to: 'id-card-generator', label: 'ID Card Generator' }, { to: 'reports', label: 'Reports' }, { to: 'settings', label: 'Settings' }],
  cashier: [{ to: '.', label: 'Dashboard' }, { to: 'fee-structure', label: 'Fee Structure' }, { to: 'student-dues', label: 'Student Dues' }, { to: 'payments', label: 'Payments' }, { to: 'receipts', label: 'Receipts' }, { to: 'reports', label: 'Reports' }, { to: 'settings', label: 'Settings' }]
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />

    <Route path="/admin/*" element={<ProtectedRoute allowRoles={['admin']}>{createRoleRoutes({ baseTitle: 'Admin', navItems: roleNav.admin })}</ProtectedRoute>} />
    <Route path="/student/*" element={<ProtectedRoute allowRoles={['student']}>{createRoleRoutes({ baseTitle: 'Student', navItems: roleNav.student })}</ProtectedRoute>} />
    <Route path="/teacher/*" element={<ProtectedRoute allowRoles={['teacher']}>{createRoleRoutes({ baseTitle: 'Teacher', navItems: roleNav.teacher })}</ProtectedRoute>} />
    <Route path="/librarian/*" element={<ProtectedRoute allowRoles={['librarian']}>{createRoleRoutes({ baseTitle: 'Librarian', navItems: roleNav.librarian })}</ProtectedRoute>} />
    <Route path="/cashier/*" element={<ProtectedRoute allowRoles={['cashier']}>{createRoleRoutes({ baseTitle: 'Cashier', navItems: roleNav.cashier })}</ProtectedRoute>} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
