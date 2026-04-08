"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeItem, updateQuantity, clearCart, selectCartItems, selectCartTotal } from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const { data: session } = useSession();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const placeOrder = async () => {
    if (!session) { router.push("/login"); return; }
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map((i) => ({ productId: i.id, quantity: i.quantity })) }),
    });
    setPlacing(false);
    if (res.ok) {
      dispatch(clearCart());
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Your order request has been sent. We will confirm it shortly.</p>
        <button onClick={() => router.push("/orders")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          View My Orders
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <button onClick={() => router.push("/products")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">No img</div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
              >−</button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
              >+</button>
            </div>
            <button onClick={() => dispatch(removeItem(item.id))} className="text-red-400 hover:text-red-600 text-sm ml-2">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl shadow p-4 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => dispatch(clearCart())} className="text-sm text-gray-400 hover:text-red-500">Clear</button>
          <button
            onClick={placeOrder}
            disabled={placing}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
          >
            {placing ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
