import { statsData } from "@/lib/homeData";

export default function StatsBar() {
  return (
    <section className="border-y border-gray-100 bg-white py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {statsData.map((s) => (
          <div key={s.title} className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl">{s.icon}</span>
            <p className="font-semibold text-gray-800 text-sm">{s.title}</p>
            <p className="text-gray-400 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
