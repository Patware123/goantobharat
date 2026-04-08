"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type OrderItem = { id: string; quantity: number; price: number; product: { name: string } };
type Order = { id: string; status: string; payment: string; createdAt: string; items: OrderItem[] };

const STATUS_COLOR: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => { setOrders(data); setLoading(false); });
    }
  }, [status, router]);

  if (loading) return <p className="text-gray-400 text-center py-20">Loading orders...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>
      {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400">#{order.id.slice(-8).toUpperCase()}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[order.status] ?? "bg-gray-100"}`}>
                {order.status}
              </span>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t flex justify-between text-sm">
              <span className="text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
              <span className="font-bold text-indigo-600">
                ${order.items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
