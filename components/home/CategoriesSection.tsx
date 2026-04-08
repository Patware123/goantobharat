import Link from "next/link";
import { categoriesData } from "@/lib/homeData";

export default function CategoriesSection() {
  const [large, ...small] = categoriesData.items;
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{categoriesData.heading}</h2>
            <p className="text-gray-400 text-sm mt-1 max-w-sm">{categoriesData.sub}</p>
          </div>
          <Link href="/products" className="text-sm text-green-700 font-semibold hover:underline whitespace-nowrap">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 h-80">
          {/* Large left card */}
          <div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src={large.image} alt={large.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold text-lg">{large.name}</p>
              <p className="text-xs text-gray-300">{large.sub}</p>
            </div>
          </div>

          {/* 4 small cards */}
          {small.map((cat) => (
            <div key={cat.id} className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
