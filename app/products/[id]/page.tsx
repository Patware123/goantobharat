import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

type Product = { id: string; name: string; price: number; image?: string; description?: string; stock: number };

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-6" />
      ) : (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-6">No image</div>
      )}
      <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-indigo-600 text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
      {product.description && <p className="text-gray-600 mt-3">{product.description}</p>}
      <p className="text-sm text-gray-400 mt-2">Stock: {product.stock}</p>
      <AddToCartButton id={product.id} name={product.name} price={product.price} image={product.image} />
    </div>
  );
}
