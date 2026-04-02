import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/public/HomePage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

const Placeholder = ({ title }) => <div className="p-6 text-2xl">{title} Dashboard (Phase scaffold)</div>;

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/admin/*" element={<Placeholder title="Admin" />} />
    <Route path="/student/*" element={<Placeholder title="Student" />} />
    <Route path="/teacher/*" element={<Placeholder title="Teacher" />} />
    <Route path="/librarian/*" element={<Placeholder title="Librarian" />} />
    <Route path="/cashier/*" element={<Placeholder title="Cashier" />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
