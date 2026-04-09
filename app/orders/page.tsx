"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type OrderItem = { id: string; quantity: number; priceAtPurchase: number; variant: { weight: string; product: { name: string; image?: string } } };
type Order = { id: string; status: string; paymentMethod: string; createdAt: string; totalAmount: number; items: OrderItem[] };

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-tertiary-container text-on-tertiary-container",
  CONFIRMED: "bg-primary-container text-on-primary-container",
  SHIPPED: "bg-secondary-container text-on-secondary-container",
  CANCELLED: "bg-error-container text-on-error-container",
  COMPLETED: "bg-primary text-on-primary",
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login?redirect=/orders"); return; }
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => { 
          if(Array.isArray(data)) setOrders(data); 
          setLoading(false); 
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  if (loading) return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary">My Orders</h1>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 bg-surface-container rounded-3xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary">My Orders</h1>
        </div>

        {orders.length === 0 ? (
           <div className="bg-surface-container p-16 rounded-[2.5rem] text-center shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
             <div className="text-4xl mb-6">📦</div>
             <p className="text-on-surface-variant mb-8 text-lg font-medium">You haven't placed any orders yet.</p>
             <Link href="/products" className="bg-primary text-on-primary py-4 px-10 rounded-xl font-bold hover:bg-primary-container shadow-[0_10px_30px_rgba(1,45,29,0.15)] inline-block transition duration-300">
                Start Exploring
             </Link>
           </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-surface-container rounded-3xl p-8 overflow-hidden shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-surface-container-highest">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase bg-surface-container-highest px-3 py-1 rounded-md">Order #{order.id.slice(-8).toUpperCase()}</span>
                    <p className="text-sm text-on-surface-variant mt-3 font-semibold">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} • {order.paymentMethod}</p>
                  </div>
                  <span className={`text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-widest ${STATUS_COLOR[order.status] ?? "bg-surface-container-highest text-on-surface"}`}>
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <ul className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl">
                      <div className="flex gap-4 items-center">
                         {item.variant.product.image ? (
                             <img src={item.variant.product.image} className="w-12 h-12 rounded-lg object-cover bg-surface-container-highest" alt="" />
                         ) : (
                             <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-xs font-bold text-on-surface-variant">IMG</div>
                         )}
                         <div>
                            <span className="font-bold text-on-surface text-base">{item.variant.product.name}</span>
                            <div className="text-xs mt-1 font-bold text-on-surface-variant uppercase tracking-widest">
                               <span className="text-secondary">{item.variant.weight}</span>
                               <span className="mx-2">•</span>
                               <span>Qty: {item.quantity}</span>
                            </div>
                         </div>
                      </div>
                      <span className="font-bold text-lg text-primary">₹{item.priceAtPurchase * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="pt-6 border-t border-surface-container-highest flex justify-between items-center bg-surface-container-low -mx-8 -mb-8 px-8 py-6">
                  <span className="font-bold text-on-surface-variant uppercase text-xs tracking-widest">Total Amount</span>
                  <span className="font-bold text-3xl font-[family-name:var(--font-display)] text-tertiary">
                    ₹{order.totalAmount}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
