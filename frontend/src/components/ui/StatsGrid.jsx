export const StatsGrid = ({ stats }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat) => (
      <div key={stat.label} className="rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-950">
        <p className="text-sm text-slate-500">{stat.label}</p>
        <p className="mt-2 text-2xl font-bold">{stat.value}</p>
        {stat.meta && <p className="text-xs text-emerald-600">{stat.meta}</p>}
      </div>
    ))}
  </div>
);
