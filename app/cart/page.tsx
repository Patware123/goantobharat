"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeItem, updateQuantity, clearCart, selectCartItems, selectCartTotal } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center py-32 bg-surface min-h-screen">
        <div className="max-w-md mx-auto bg-surface-container-low p-12 rounded-3xl shadow-sm">
          <p className="text-on-surface-variant text-lg mb-8 font-medium">Your basket is empty.</p>
          <button onClick={() => router.push("/products")} className="bg-primary text-on-primary px-10 py-4 rounded-xl hover:bg-primary-container font-semibold transition duration-300 shadow-[0_10px_30px_rgba(1,45,29,0.15)]">
            Explore Provisions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-10 text-tertiary">Your Basket</h1>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-surface-container rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-sm" />
              ) : (
                <div className="w-24 h-24 bg-surface-container-highest rounded-xl flex items-center justify-center text-on-surface-variant text-xs shadow-inner uppercase tracking-wider font-bold">No img</div>
              )}
              <div className="flex-1">
                <p className="font-bold text-on-surface text-xl">{item.name}</p>
                <p className="text-primary font-bold mt-2 text-lg">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <div className="flex items-center gap-3 bg-surface-container-highest px-2 py-1.5 rounded-xl">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    className="w-8 h-8 rounded-lg bg-surface shadow-sm text-on-surface font-bold hover:bg-surface-container-low transition"
                  >−</button>
                  <span className="w-6 text-center font-semibold text-on-surface">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="w-8 h-8 rounded-lg bg-surface shadow-sm text-on-surface font-bold hover:bg-surface-container-low transition"
                  >+</button>
                </div>
                <button onClick={() => dispatch(removeItem(item.id))} className="text-secondary hover:text-secondary-container text-sm font-semibold transition uppercase tracking-widest">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-surface-container-low rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <p className="text-on-surface-variant text-sm mb-2 font-bold uppercase tracking-widest">Subtotal</p>
            <p className="text-4xl font-[family-name:var(--font-display)] font-bold text-primary">₹{total}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center">
            <button onClick={() => dispatch(clearCart())} className="text-sm text-on-surface-variant hover:text-on-surface font-semibold px-4 py-2 uppercase tracking-widest transition">Clear Basket</button>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-surface px-10 py-4 rounded-xl font-bold shadow-[0_10px_30px_rgba(128,85,51,0.2)] transition duration-300 w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
