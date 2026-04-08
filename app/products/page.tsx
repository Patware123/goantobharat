import Link from "next/link";

type Product = { id: string; name: string; price: number; image?: string };

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Products</h1>
      {products.length === 0 && (
        <p className="text-gray-500">No products available yet.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden group"
          >
            {p.image ? (
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
            )}
            <div className="p-4">
              <h2 className="font-semibold text-gray-800">{p.name}</h2>
              <p className="text-indigo-600 font-bold mt-1">${p.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
