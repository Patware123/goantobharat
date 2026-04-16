import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4 py-8">
      <aside className="w-56 shrink-0">
        <nav className="bg-surface-container rounded-3xl p-6 space-y-3 text-sm sticky top-24 shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Admin Panel</p>
          <Link href="/admin" className="block px-4 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container text-on-surface font-semibold transition duration-300">Dashboard</Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container text-on-surface font-semibold transition duration-300">Products</Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container text-on-surface font-semibold transition duration-300">Orders</Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
