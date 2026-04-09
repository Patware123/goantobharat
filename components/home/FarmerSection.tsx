import { farmerData } from "@/lib/homeData";

export default function FarmerSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <img src={farmerData.bg} alt="farm" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Farmer card */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-72 h-80 rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={farmerData.farmer.image} alt={farmerData.farmer.name} className="w-full h-full object-cover" />
            </div>
            {/* Info card */}
            <div className="absolute -bottom-8 -right-8 bg-surface rounded-3xl p-6 shadow-xl w-64">
              <p className="font-[family-name:var(--font-display)] font-bold text-on-surface text-xl">Meet {farmerData.farmer.name}</p>
              <p className="text-[10px] text-secondary font-bold tracking-widest uppercase mt-1">{farmerData.farmer.location}</p>
              <p className="text-on-surface-variant font-medium text-xs mt-3 leading-relaxed">"{farmerData.farmer.quote}"</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-on-primary space-y-6 md:pl-16 pt-12 md:pt-0">
          <span className="text-xs font-bold tracking-widest text-secondary-container uppercase bg-secondary/20 px-3 py-1 rounded-full">{farmerData.badge}</span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-semibold leading-tight">{farmerData.heading}</h2>
          <p className="text-primary-container font-medium text-lg max-w-lg leading-relaxed">{farmerData.sub}</p>
          <button className="mt-6 bg-surface text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition duration-300 shadow-md">
            {farmerData.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
