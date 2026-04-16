"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Product = { id: string; name: string; basePrice: number; stock: number; image?: string };

export default function AdminProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", weight: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (status === "authenticated" && (session?.user as { role?: string })?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  const load = () => {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = "";
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }
    }

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock), image: imageUrl }),
    });

    setSaving(false);
    setForm({ name: "", description: "", price: "", stock: "", weight: "" });
    setImageFile(null);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary">Products</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-on-primary px-6 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition duration-300 font-bold shadow-md">
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-surface-container rounded-[2rem] p-8 mb-8 grid grid-cols-2 gap-6 shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
          {(["name", "description", "price", "stock", "weight"] as const).map((field) => (
            <div key={field} className={field === "description" ? "col-span-2" : ""}>
              <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">{field}</label>
              <input
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required={field === "name" || field === "price"}
                className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
            </div>
          ))}
          
          <div className="col-span-2">
            <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>

          <div className="col-span-2 mt-2">
            <button type="submit" disabled={saving} className="bg-secondary text-on-secondary px-8 py-3.5 rounded-xl hover:bg-secondary-container transition duration-300 disabled:opacity-50 font-bold shadow-lg flex items-center justify-center gap-2">
              {saving ? (
                <><div className="w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></div> Saving...</>
              ) : "Save Product"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface-container rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(28,28,25,0.02)] min-h-[300px]">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-12 bg-surface-container-highest flex-1 rounded-xl"></div>
                <div className="h-12 bg-surface-container-highest w-24 rounded-xl"></div>
                <div className="h-12 bg-surface-container-highest w-24 rounded-xl"></div>
                <div className="h-12 bg-surface-container-highest w-32 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-surface-container-highest text-on-surface-variant text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5 text-left font-bold">Name</th>
                <th className="px-6 py-5 text-left font-bold">Price</th>
                <th className="px-6 py-5 text-left font-bold">Stock</th>
                <th className="px-6 py-5 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface/5">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-highest transition duration-200">
                  <td className="px-6 py-5 font-bold text-on-surface text-base flex flex-col">
                    {p.name}
                    {p.image && <a href={p.image} target="_blank" rel="noreferrer" className="text-xs text-secondary mt-1 font-normal underline">View Image</a>}
                  </td>
                  <td className="px-6 py-5 text-primary font-bold">₹{p.basePrice}</td>
                  <td className="px-6 py-5 text-on-surface-variant font-medium">{p.stock}</td>
                  <td className="px-6 py-5 flex gap-4 text-sm font-bold uppercase tracking-widest">
                    <Link href={`/admin/products/${p.id}`} className="text-secondary hover:text-primary transition">Edit</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-error hover:text-red-700 transition">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant font-medium text-lg">No products yet.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
