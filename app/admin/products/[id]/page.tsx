"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

type Product = { id: string; name: string; description?: string; price: number; stock: number; image?: string };

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", image: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((p: Product) =>
        setForm({
          name: p.name,
          description: p.description ?? "",
          price: String(p.price),
          stock: String(p.stock),
          image: p.image ?? "",
        })
      );
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
    });
    setSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        {(["name", "description", "price", "stock", "image"] as const).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
            <input
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required={field === "name" || field === "price"}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
        <button type="submit" disabled={saving} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold">
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
