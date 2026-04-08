"use client";
import { useEffect, useState } from "react";

type OrderItem = { id: string; quantity: number; price: number; product: { name: string } };
type Order = {
  id: string; status: string; createdAt: string;
  user: { name?: string; email: string };
  items: OrderItem[];
};

const STATUSES = ["NEW", "CONFIRMED", "CANCELLED", "COMPLETED"];

const STATUS_COLOR: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    fetch("/api/orders").then((r) => r.json()).then((data) => { setOrders(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  if (loading) return <p className="text-gray-400 py-10 text-center">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>
      {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800">{order.user.name ?? order.user.email}</p>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="text-xs border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="text-right font-bold text-indigo-600 mt-2 text-sm">
              Total: ${order.items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
