import { testimonialsData } from "@/lib/homeData";

export default function TestimonialsSection() {
  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary text-center mb-12">{testimonialsData.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.items.map((t) => (
            <div key={t.id} className="bg-surface-container-highest rounded-3xl p-8 shadow-[0_10px_30px_rgba(28,28,25,0.02)] hover:-translate-y-1 transition duration-500 space-y-6 flex flex-col justify-between">
              <p className="text-on-surface-variant font-medium leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-surface-container">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-inner">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] font-bold text-on-surface text-lg">{t.name}</p>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mt-1">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
