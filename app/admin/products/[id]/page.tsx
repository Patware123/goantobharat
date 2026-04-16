"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", weight: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((p: any) => {
        const variant = p.variants?.[0];
        setForm({
          name: p.name ?? "",
          description: p.description ?? "",
          price: String(variant?.price ?? p.basePrice ?? ""),
          stock: String(variant?.stock ?? ""),
          weight: variant?.weight ?? "",
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl: string | undefined;
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (uploadRes.ok) imageUrl = (await uploadRes.json()).url;
    }

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        weight: form.weight,
        ...(imageUrl ? { image: imageUrl } : {}),
      }),
    });

    setSaving(false);
    router.push("/admin/products");
  };

  if (loading) return (
    <div className="space-y-4 animate-pulse max-w-2xl">
      <div className="h-10 bg-surface-container rounded-xl w-48"></div>
      <div className="h-64 bg-surface-container rounded-[2rem]"></div>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push("/admin/products")} className="text-on-surface-variant hover:text-on-surface transition text-sm font-bold uppercase tracking-widest">← Back</button>
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container rounded-[2rem] p-8 grid grid-cols-2 gap-6 shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
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
          <p className="text-xs text-on-surface-variant mt-1">Leave empty to keep existing image.</p>
        </div>

        <div className="col-span-2 mt-2">
          <button type="submit" disabled={saving} className="bg-secondary text-on-secondary px-8 py-3.5 rounded-xl hover:bg-secondary-container transition duration-300 disabled:opacity-50 font-bold shadow-lg flex items-center justify-center gap-2">
            {saving ? <><div className="w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></div> Saving...</> : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
