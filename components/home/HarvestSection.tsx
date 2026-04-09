"use client";
import { harvestData } from "@/lib/homeData";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/cartSlice";

const BADGE_COLOR: Record<string, string> = {
  "IN STOCK": "bg-primary-container text-on-primary-container",
  "NEW ARRIVAL": "bg-secondary-container text-on-secondary-container",
  "BESTSELLER": "bg-tertiary-container text-on-tertiary-container",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? "text-secondary" : "text-surface-container-highest"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function HarvestSection() {
  const dispatch = useAppDispatch();
  return (
    <section className="bg-surface-container-highest py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary">{harvestData.heading}</h2>
          <p className="text-on-surface-variant text-base mt-2 font-medium">{harvestData.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {harvestData.products.map((p) => (
            <div key={p.id} className="bg-surface rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(28,28,25,0.02)] hover:shadow-lg transition duration-500 group">
              <div className="relative h-64 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${BADGE_COLOR[p.badge] ?? "bg-surface-container text-on-surface"}`}>
                  {p.badge}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-on-surface-variant font-bold ml-1">({p.reviews})</span>
                </div>
                <p className="font-[family-name:var(--font-display)] font-bold text-on-surface text-xl">{p.name}</p>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-primary font-bold text-2xl">
                    ₹{p.price} <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-widest">/{p.unit}</span>
                  </p>
                  <button
                    onClick={() => dispatch(addItem({ id: String(p.id), name: p.name, price: p.price, image: p.image }))}
                    className="bg-primary text-on-primary text-sm px-5 py-2.5 rounded-xl hover:bg-primary-container shadow-sm transition font-bold"
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
