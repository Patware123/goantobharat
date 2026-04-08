import { testimonialsData } from "@/lib/homeData";

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{testimonialsData.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {testimonialsData.items.map((t) => (
            <div key={t.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
