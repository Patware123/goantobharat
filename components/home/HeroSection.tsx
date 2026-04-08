import Link from "next/link";
import { heroData } from "@/lib/homeData";

export default function HeroSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-5">
          <span className="text-xs font-bold tracking-widest text-amber-600 border border-amber-300 bg-amber-50 px-3 py-1 rounded-full">
            {heroData.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-3">
            {heroData.headline[0]}
            <em className="not-italic text-green-700">{heroData.headline[1]}</em>
            {heroData.headline[2]}
            <span className="text-amber-600">{heroData.headline[3]}</span>
          </h1>
          <p className="text-gray-500 text-base max-w-md">{heroData.subtext}</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/products" className="bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-800 transition text-sm">
              {heroData.cta.primary}
            </Link>
            <button className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full font-semibold hover:bg-gray-50 transition text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">▶</span>
              {heroData.cta.secondary}
            </button>
          </div>
        </div>
        <div className="flex-1 relative flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <img src={heroData.image} alt="Farmer" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-6 left-4 bg-white rounded-xl shadow-lg px-4 py-2 text-xs border border-gray-100">
            <p className="text-green-700 font-bold">100% ORGANIC</p>
            <p className="text-gray-400 text-[10px]">{heroData.badge2.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
