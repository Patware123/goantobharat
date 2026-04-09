"use client";
import { useEffect, useState } from "react";

type OrderItem = { id: string; quantity: number; priceAtPurchase: number; variant: { weight: string; product: { name: string } } };
type Order = {
  id: string; status: string; createdAt: string; totalAmount: number; paymentMethod: string;
  shippingName: string; shippingPhone: string; address: string; city: string; pincode: string;
  user: { name?: string; email: string };
  items: OrderItem[];
};

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "CANCELLED", "COMPLETED"];

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-surface-container-low text-tertiary",
  CONFIRMED: "bg-primary-fixed text-primary",
  SHIPPED: "bg-secondary-container text-secondary",
  CANCELLED: "bg-error-container text-error",
  COMPLETED: "bg-primary-container text-on-primary",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    fetch("/api/orders").then((r) => r.json()).then((data) => { 
       setOrders(Array.isArray(data) ? data : []); 
       setLoading(false); 
    });

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  if (loading) return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary">Manage Orders</h1>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-container rounded-3xl overflow-hidden animate-pulse">
              <div className="bg-surface-container-low p-8 flex flex-wrap items-start justify-between gap-6 border-b border-surface-container-highest">
                <div className="space-y-3">
                  <div className="h-8 bg-surface-container-highest rounded w-48"></div>
                  <div className="h-4 bg-surface-container-highest rounded w-64"></div>
                  <div className="h-24 bg-surface-container-highest rounded-xl w-72 mt-4"></div>
                </div>
                <div className="h-10 bg-surface-container-highest rounded-xl w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary">Manage Orders</h1>
        {orders.length === 0 && <p className="text-on-surface-variant bg-surface-container p-6 rounded-3xl">No orders yet.</p>}
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-surface-container rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
              <div className="bg-surface-container-low p-8 flex flex-wrap items-start justify-between gap-6 border-b border-surface-container-highest">
                <div>
                  <p className="font-[family-name:var(--font-display)] font-bold text-tertiary text-2xl">{order.shippingName || order.user.name || order.user.email}</p>
                  <p className="text-sm text-on-surface-variant mt-2 font-semibold">{new Date(order.createdAt).toLocaleString()} • {order.paymentMethod}</p>
                  <div className="text-sm text-on-surface mt-4 bg-surface px-4 py-3 rounded-xl shadow-inner inline-block">
                    <span className="font-bold block mb-1 text-primary uppercase tracking-widest text-xs">Shipping Info</span>
                    {order.address}, {order.city} - {order.pincode}
                    <br/>
                    📞 {order.shippingPhone}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className={`text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-widest ${STATUS_COLOR[order.status] ?? "bg-surface-container-highest text-on-surface"}`}>
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-sm font-bold bg-surface-container-highest border-transparent rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface uppercase tracking-widest"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-4">Order Items</span>
                <ul className="text-sm text-on-surface space-y-4">
                  {order.items.map((item, i) => (
                    <li key={item.id} className={`flex justify-between items-center pb-4 ${i !== order.items.length - 1 ? 'border-b border-surface-container' : ''}`}>
                      <div>
                          <span className="font-bold text-lg">{item.variant?.product?.name}</span>
                          <span className="text-on-surface-variant ml-2 font-semibold">({item.variant?.weight})</span>
                          <span className="text-on-surface-variant ml-2 font-bold select-none">× {item.quantity}</span>
                      </div>
                      <span className="font-bold text-on-surface text-lg">₹{item.priceAtPurchase * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-surface-container-highest text-right">
                  <span className="font-bold text-on-surface-variant uppercase tracking-widest mr-4 text-xs">Total Amount</span>
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-primary">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
