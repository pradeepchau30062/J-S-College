import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ui/ThemeToggle';

const links = ['Home', 'About', 'Programs', 'Admission', 'Notices', 'Contact'];

export const PublicNavbar = () => (
  <nav className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur dark:bg-slate-950/90">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Logo />
      <div className="hidden gap-4 md:flex">
        {links.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-cyan-600">
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white" to="/login">
          Login
        </Link>
      </div>
    </div>
  </nav>
);
