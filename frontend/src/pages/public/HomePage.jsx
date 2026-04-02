import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';

const sections = ['Home', 'About', 'Programs', 'Admission', 'Notices', 'Contact'];

export const HomePage = () => (
  <div className="min-h-screen">
    <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex gap-4">{sections.map((s) => <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-cyan-600">{s}</a>)}</div>
        <Link className="px-4 py-2 bg-slate-900 text-white rounded-lg" to="/login">Login</Link>
      </div>
    </nav>

    <header id="home" className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-4xl font-extrabold">J & S College Management ERP</h1>
        <p className="mt-4 text-slate-600">A modern all-in-one campus platform for admissions, academics, communication, finance, library, and results.</p>
        <Link to="/register" className="mt-6 inline-block px-5 py-3 rounded-xl bg-cyan-600 text-white">Apply Now</Link>
      </div>
      <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-2xl font-bold">Announcement Ticker</h3>
        <p className="mt-2">Semester Midterm Exam Routine will be published on May 15.</p>
      </div>
    </header>

    {['about', 'programs', 'admission', 'notices', 'contact', 'faq', 'testimonials'].map((id) => (
      <section key={id} id={id} className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold capitalize">{id}</h2>
        <p className="text-slate-600 mt-2">Professional section content for {id} in production-ready landing page.</p>
      </section>
    ))}
    <footer className="border-t p-6 text-center text-slate-500">© {new Date().getFullYear()} J & S College. All rights reserved.</footer>
  </div>
);
