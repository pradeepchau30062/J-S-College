import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { StatsGrid } from '../../components/ui/StatsGrid';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const RoleDashboardPage = ({ title }) => {
  const stats = [
    { label: 'Total Items', value: 128 },
    { label: 'Pending Tasks', value: 14, meta: '+4 today' },
    { label: 'Notifications', value: 9 },
    { label: 'Completion', value: '82%' }
  ];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: `${title} Analytics`, data: [12, 19, 17, 24, 26, 30], backgroundColor: '#0891b2' }]
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title} Dashboard</h2>
      <StatsGrid stats={stats} />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-4 dark:bg-slate-950">
          <h3 className="font-semibold">Analytics</h3>
          <Bar data={data} />
        </div>
        <div className="rounded-xl border bg-white p-4 dark:bg-slate-950">
          <h3 className="font-semibold">Quick Actions</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Create new record</li>
            <li>View pending approvals</li>
            <li>Export report PDF/CSV</li>
            <li>Check announcements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
