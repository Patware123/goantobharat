import Link from "next/link";
import { categoriesData } from "@/lib/homeData";

export default function CategoriesSection() {
  const [large, ...small] = categoriesData.items;
  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary">{categoriesData.heading}</h2>
            <p className="text-on-surface-variant font-medium text-base mt-2 max-w-sm leading-relaxed">{categoriesData.sub}</p>
          </div>
          <Link href="/products" className="text-sm text-secondary font-bold hover:text-secondary-container transition duration-300 whitespace-nowrap uppercase tracking-widest mt-2">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 h-[400px]">
          {/* Large left card */}
          <div className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-md">
            <img src={large.image} alt={large.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-[family-name:var(--font-display)] font-bold text-3xl">{large.name}</p>
              <p className="text-sm text-white/80 mt-1 font-medium">{large.sub}</p>
            </div>
          </div>

          {/* 4 small cards */}
          {small.map((cat) => (
            <div key={cat.id} className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute bottom-4 left-5 text-white font-[family-name:var(--font-display)] font-semibold text-xl">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
