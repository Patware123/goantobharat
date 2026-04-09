import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") redirect("/login");

  const [productCount, orderCount, userCount, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: true }
    })
  ]);

  const stats = [
    { label: "Products Catalog", value: productCount, icon: "🌾", link: "/admin/products" },
    { label: "Total Orders", value: orderCount, icon: "📦", link: "/admin/orders" },
    { label: "Registered Users", value: userCount, icon: "👥", link: "#" },
  ];

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-10 text-tertiary">Farm Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((s) => (
            <Link href={s.link} key={s.label} className="bg-surface-container rounded-3xl p-8 flex items-center gap-6 hover:bg-surface-container-low transition duration-300 group">
              <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary-container group-hover:text-on-primary transition duration-300 shadow-inner">
                {s.icon}
              </div>
              <div>
                <p className="text-4xl font-[family-name:var(--font-display)] font-bold text-on-surface">{s.value}</p>
                <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs mt-2">{s.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-surface-container rounded-3xl p-10">
          <div className="flex justify-between items-center mb-8 border-b border-surface-container-highest pb-6">
            <h2 className="text-2xl font-[family-name:var(--font-display)] font-semibold text-tertiary">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-bold text-secondary hover:text-secondary-container transition uppercase tracking-widest">View All</Link>
          </div>
          
          {!recentOrders?.length && <p className="text-on-surface-variant py-10 text-center font-bold">No orders received yet.</p>}
          <ul className="space-y-4">
            {(recentOrders as any[]).map((o) => (
              <li key={o.id} className="flex flex-wrap md:flex-nowrap justify-between items-center bg-surface-container-highest p-5 rounded-2xl gap-6">
                <div className="flex-1 min-w-[200px]">
                  <p className="font-bold text-on-surface text-lg">{o.shippingName || o.user?.name || o.user?.email}</p>
                  <p className="text-xs text-on-surface-variant mt-1 font-mono">#{o.id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-bold text-primary text-xl">₹{o.totalAmount}</p>
                    <p className="text-xs text-on-surface-variant font-semibold mt-1">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="font-bold text-xs px-4 py-2 bg-surface text-on-surface rounded-xl shadow-sm text-center block uppercase tracking-widest">
                    {o.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
