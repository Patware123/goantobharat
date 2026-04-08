import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <aside className="w-48 shrink-0">
        <nav className="bg-white rounded-xl shadow p-4 space-y-2 text-sm sticky top-20">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">Admin Panel</p>
          <Link href="/admin" className="block px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700">Dashboard</Link>
          <Link href="/admin/products" className="block px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700">Products</Link>
          <Link href="/admin/orders" className="block px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700">Orders</Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
