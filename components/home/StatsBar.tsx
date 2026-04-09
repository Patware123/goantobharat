import { statsData } from "@/lib/homeData";

export default function StatsBar() {
  return (
    <section className="bg-surface-container-low py-12 my-12 rounded-[2rem] mx-4 md:mx-auto max-w-6xl shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
        {statsData.map((s) => (
          <div key={s.title} className="flex flex-col items-center text-center gap-3">
            <span className="text-4xl text-secondary">{s.icon}</span>
            <p className="font-[family-name:var(--font-display)] font-semibold text-tertiary text-lg">{s.title}</p>
            <p className="text-on-surface-variant font-medium text-xs">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
