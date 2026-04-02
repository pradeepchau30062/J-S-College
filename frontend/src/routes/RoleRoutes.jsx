import { Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { RoleDashboardPage } from '../features/dashboard/RoleDashboardPage';

const GenericPage = ({ title }) => <div className="rounded-xl border bg-white p-5 dark:bg-slate-950"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Production module scaffold with filters, tables, actions, upload support, and analytics integrations.</p></div>;

export const createRoleRoutes = ({ baseTitle, navItems }) => (
  <DashboardLayout title={baseTitle} navItems={navItems}>
    <Routes>
      <Route index element={<RoleDashboardPage title={baseTitle} />} />
      {navItems.filter((n) => n.to !== '.').map((n) => <Route key={n.to} path={n.to} element={<GenericPage title={n.label} />} />)}
    </Routes>
  </DashboardLayout>
);
