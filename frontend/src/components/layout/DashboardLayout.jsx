import { Bell, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeToggle } from '../ui/ThemeToggle';
import { logout } from '../../store/store';

export const DashboardLayout = ({ title, navItems, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="grid min-h-screen md:grid-cols-[250px_1fr]">
        <aside className="border-r bg-white p-4 dark:bg-slate-950">
          <Link to="/" className="text-xl font-bold text-cyan-600">J & S College</Link>
          <p className="mt-1 text-sm text-slate-500">{title}</p>
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-cyan-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <header className="flex items-center justify-between border-b bg-white px-4 py-3 dark:bg-slate-950">
            <div>
              <h1 className="text-lg font-semibold">Welcome, {user?.email}</h1>
              <p className="text-xs text-slate-500">Role: {user?.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border p-2"><Bell size={16} /></button>
              <ThemeToggle />
              <button className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white" onClick={onLogout}><LogOut size={16} />Logout</button>
            </div>
          </header>
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};
