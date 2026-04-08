import { supabaseServer } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") redirect("/login");

  const [{ count: productCount }, { count: orderCount }, { count: userCount }, { data: recentOrders }] = await Promise.all([
    supabaseServer.from("products").select("*", { count: "exact", head: true }),
    supabaseServer.from("orders").select("*", { count: "exact", head: true }),
    supabaseServer.from("users").select("*", { count: "exact", head: true }),
    supabaseServer.from("orders").select("*, users(name, email)").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Products", value: productCount ?? 0 },
    { label: "Orders", value: orderCount ?? 0 },
    { label: "Users", value: userCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-indigo-600">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-semibold text-gray-700 mb-4">Recent Orders</h2>
        {!recentOrders?.length && <p className="text-gray-400 text-sm">No orders yet.</p>}
        <ul className="space-y-2 text-sm">
          {recentOrders?.map((o: { id: string; status: string; created_at: string; users: { name?: string; email: string } }) => (
            <li key={o.id} className="flex justify-between text-gray-600">
              <span>{o.users?.name ?? o.users?.email}</span>
              <span className="font-medium">{o.status}</span>
              <span className="text-gray-400">{new Date(o.created_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
