import Link from "next/link";
import { heroData } from "@/lib/homeData";

export default function HeroSection() {
  return (
    <section className="bg-surface py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary-container/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-8">
          <span className="text-xs font-bold tracking-widest text-secondary uppercase bg-secondary-container px-4 py-2 rounded-full">
            {heroData.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] font-semibold text-on-surface leading-[1.1]">
            {heroData.headline[0]}
            <em className="text-tertiary not-italic block">{heroData.headline[1]}</em>
            {heroData.headline[2]}
            <span className="text-secondary">{heroData.headline[3]}</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-md font-medium leading-relaxed">{heroData.subtext}</p>
          <div className="flex gap-4 flex-wrap pt-4">
            <Link href="/products" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-primary-container shadow-[0_10px_30px_rgba(1,45,29,0.15)] transition duration-300">
              {heroData.cta.primary}
            </Link>
            <button className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-container-low transition duration-300 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-xs">▶</span>
              {heroData.cta.secondary}
            </button>
          </div>
        </div>
        <div className="flex-1 relative flex justify-center w-full">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(28,28,25,0.05)] bg-surface-container-highest">
            <img src={heroData.image} alt="Farmer" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container/60 to-transparent"></div>
          </div>
          <div className="absolute bottom-8 left-0 md:-left-8 bg-surface/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg">
            <p className="text-tertiary font-bold tracking-widest uppercase text-sm mb-1">100% Fresh</p>
            <p className="text-on-surface-variant font-medium text-xs">{heroData.badge2.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
