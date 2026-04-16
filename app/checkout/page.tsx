"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    agreeToTerms: false
  });
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
       ...prev,
       [name]: type === "checkbox" ? checked : value
    }));
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { router.push("/login"); return; }
    if (!formData.agreeToTerms) return alert("You must agree to terms");

    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
         items: items.map((i) => ({ variantId: i.id, quantity: i.quantity, price: i.price })),
         shipping: formData,
         total 
      }),
    });
    setPlacing(false);
    if (res.ok) {
      const order = await res.json();
      dispatch(clearCart());
      router.push(`/success?id=${order.id}`);
    } else {
      const data = await res.json();
      alert(data.error || "Failed to place order. Please try again.");
    }
  };

  if (!session) {
    return (
      <div className="py-32 text-center bg-surface min-h-screen">
        <div className="max-w-md mx-auto bg-surface-container rounded-3xl p-10">
          <h2 className="text-xl font-[family-name:var(--font-display)] font-semibold mb-6 text-tertiary">Please login to continue</h2>
          <button onClick={() => router.push("/login")} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary-container transition shadow-md">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
         <div>
            <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-8 text-tertiary">Checkout</h1>
            <form onSubmit={placeOrder} className="bg-surface-container p-8 rounded-3xl space-y-6">
               <div>
                 <label className="text-sm font-semibold text-on-surface-variant mb-2 block">Full Name</label>
                 <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" />
               </div>
               <div>
                 <label className="text-sm font-semibold text-on-surface-variant mb-2 block">Phone</label>
                 <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" />
               </div>
               <div>
                 <label className="text-sm font-semibold text-on-surface-variant mb-2 block">Full Address</label>
                 <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="text-sm font-semibold text-on-surface-variant mb-2 block">City</label>
                   <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" />
                 </div>
                 <div>
                   <label className="text-sm font-semibold text-on-surface-variant mb-2 block">Pincode</label>
                   <input required name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" />
                 </div>
               </div>
               
               <div className="pt-6 flex items-start gap-4">
                 <input required name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} className="mt-1 w-5 h-5 accent-secondary-container" />
                 <label className="text-sm text-on-surface-variant leading-relaxed">
                   I agree to the <a href="/legal/terms" className="text-secondary font-bold hover:underline">Terms & Conditions</a> and <a href="/legal/refund" className="text-secondary font-bold hover:underline">Refund Policy</a>.
                 </label>
               </div>

               <button disabled={placing || !formData.agreeToTerms} className="w-full bg-primary text-on-primary py-4 mt-8 rounded-xl font-bold hover:bg-primary-container transition disabled:opacity-50 shadow-[0_10px_30px_rgba(1,45,29,0.15)] text-lg">
                 {placing ? "Confirming..." : "Confirm Cash on Delivery"}
               </button>
            </form>
         </div>

         {/* summary */}
         <div>
            <h2 className="text-2xl font-[family-name:var(--font-display)] font-semibold mb-8 text-tertiary">Order Summary</h2>
            <div className="bg-surface-container p-8 rounded-3xl">
              {items.map((item, i) => (
                <div key={item.id} className={`flex justify-between items-center pb-6 ${i !== items.length - 1 ? 'border-b border-surface-container-highest mb-6' : ''}`}>
                   <div>
                     <p className="font-bold text-lg text-on-surface">{item.name}</p>
                     <p className="text-sm text-on-surface-variant mt-1 font-semibold uppercase tracking-wider">Qty: {item.quantity}</p>
                   </div>
                   <p className="font-bold text-on-surface text-lg">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="mt-8 bg-surface-container-low p-6 rounded-xl flex justify-between items-center">
                <p className="font-bold text-on-surface-variant uppercase tracking-widest text-sm">Total</p>
                <p className="text-3xl font-[family-name:var(--font-display)] font-bold text-primary">₹{total}</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
