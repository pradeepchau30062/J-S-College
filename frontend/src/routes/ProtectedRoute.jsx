import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ allowRoles, children }) => {
  const { token, user } = useSelector((s) => s.auth);
  if (!token || !user) return <Navigate to="/login" replace />;
  if (allowRoles && !allowRoles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
};
