import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary">Direct from Farms</h1>
        {products.length === 0 && (
          <p className="text-on-surface-variant font-medium bg-surface-container p-6 rounded-3xl">No products available yet.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="bg-surface-container rounded-3xl shadow-[0_10px_30px_rgba(28,28,25,0.02)] hover:-translate-y-1 hover:shadow-lg transition duration-500 overflow-hidden group flex flex-col"
            >
              {p.image ? (
                <div className="relative h-64 w-full overflow-hidden bg-surface-container-highest">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-tertiary uppercase tracking-widest rounded-xl shadow-sm">
                    {p.category}
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-surface-container-highest flex items-center justify-center text-on-surface-variant text-sm font-bold uppercase tracking-widest">No image</div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] font-bold text-on-surface text-2xl leading-tight">{p.name}</h2>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-primary font-bold text-2xl">₹{p.basePrice}<span className="text-sm text-on-surface-variant font-semibold uppercase tracking-widest ml-1">/kg</span></p>
                  <span className="text-xs bg-secondary hover:bg-secondary-container transition duration-300 text-on-secondary px-4 py-2 rounded-xl font-bold tracking-widest uppercase shadow-sm">Add +</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
