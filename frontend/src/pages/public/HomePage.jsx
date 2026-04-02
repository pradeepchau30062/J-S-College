import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';

const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-7xl px-4 py-12">
    <h2 className="text-3xl font-bold">{title}</h2>
    <div className="mt-4 text-slate-600 dark:text-slate-300">{children}</div>
  </section>
);

export const HomePage = () => (
  <div>
    <PublicNavbar />
    <header id="home" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
      <div>
        <p className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700 inline-block">J & S College ERP</p>
        <h1 className="mt-4 text-5xl font-black leading-tight">Future-ready digital campus management</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Admissions, academics, library, finance, attendance, results, chat, and role dashboards in one secure platform.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/register" className="rounded-xl bg-cyan-600 px-5 py-3 text-white">Apply for Admission</Link>
          <Link to="/login" className="rounded-xl border px-5 py-3">Portal Login</Link>
        </div>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-700 p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold">Announcement Ticker</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Spring 2026 admission review in progress.</li>
          <li>• Midterm routine publish date: May 15, 2026.</li>
          <li>• Tuition installment deadline: May 30, 2026.</li>
        </ul>
      </div>
    </header>

    <Section id="about" title="About J & S College">Modern institution focused on academic excellence, student wellbeing, and digital-first operations.</Section>
    <Section id="programs" title="Programs">Intermediate, Bachelor, Master, and PhD with semester-wise curriculum and outcomes.</Section>
    <Section id="admission" title="Admission">Students can self-register, verify email via OTP, and track application status in real time.</Section>
    <Section id="notices" title="Notices">Role-specific notices with attachments (PDF/JPG), expiry control, and email/in-app delivery.</Section>
    <Section id="contact" title="Contact + FAQ + Testimonials">Admission Office: admissions@jandscollege.edu • +1 (555) 010-2026</Section>

    <footer className="border-t px-4 py-8 text-center text-sm text-slate-500">© 2026 J & S College. Built with MERN.</footer>
  </div>
);
