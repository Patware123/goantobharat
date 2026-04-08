import { farmerData } from "@/lib/homeData";

export default function FarmerSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <img src={farmerData.bg} alt="farm" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-green-900/80" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Farmer card */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-56 h-64 rounded-2xl overflow-hidden shadow-2xl">
              <img src={farmerData.farmer.image} alt={farmerData.farmer.name} className="w-full h-full object-cover" />
            </div>
            {/* Info card */}
            <div className="absolute -bottom-6 -right-6 bg-amber-50 rounded-xl p-3 shadow-lg w-52 border border-amber-100">
              <p className="font-bold text-gray-800 text-sm">Meet {farmerData.farmer.name}</p>
              <p className="text-[10px] text-amber-600 font-bold tracking-wider">{farmerData.farmer.location}</p>
              <p className="text-gray-500 text-[11px] mt-1 italic">"{farmerData.farmer.quote}"</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-white space-y-4 md:pl-10">
          <span className="text-xs font-bold tracking-widest text-amber-400">{farmerData.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">{farmerData.heading}</h2>
          <p className="text-green-100 text-sm max-w-lg">{farmerData.sub}</p>
          <button className="mt-4 border border-white text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white hover:text-green-800 transition">
            {farmerData.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
