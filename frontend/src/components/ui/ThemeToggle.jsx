import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/store';

export const ThemeToggle = () => {
  const theme = useSelector((s) => s.auth.theme);
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />} {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
