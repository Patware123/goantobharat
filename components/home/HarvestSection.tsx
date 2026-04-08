"use client";
import { harvestData } from "@/lib/homeData";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/cartSlice";

const BADGE_COLOR: Record<string, string> = {
  "IN STOCK": "bg-green-100 text-green-700",
  "NEW ARRIVAL": "bg-blue-100 text-blue-700",
  "BESTSELLER": "bg-amber-100 text-amber-700",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function HarvestSection() {
  const dispatch = useAppDispatch();
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{harvestData.heading}</h2>
          <p className="text-gray-400 text-sm mt-1">{harvestData.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {harvestData.products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="relative h-52 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_COLOR[p.badge] ?? "bg-gray-100 text-gray-600"}`}>
                  {p.badge}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-gray-400">({p.reviews})</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-green-700 font-bold text-lg">
                    ₹{p.price} <span className="text-gray-400 text-xs font-normal">/{p.unit}</span>
                  </p>
                  <button
                    onClick={() => dispatch(addItem({ id: String(p.id), name: p.name, price: p.price, image: p.image }))}
                    className="bg-green-700 text-white text-xs px-3 py-1.5 rounded-full hover:bg-green-800 transition font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
