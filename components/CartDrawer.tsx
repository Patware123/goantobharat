"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCartItems, selectCartTotal, removeItem, updateQuantity } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-[100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface-container shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-container-highest">
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-tertiary">Your Basket</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition">
            <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl mb-4 block">🌾</span>
              <p className="text-on-surface-variant font-bold text-lg">Your basket is empty</p>
              <button onClick={() => { onClose(); router.push('/products'); }} className="mt-6 text-primary hover:underline font-bold">Start Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-surface-container-highest rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-on-surface-variant">NO IMG</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-on-surface leading-tight text-sm pr-2">{item.name}</p>
                    <button onClick={() => dispatch(removeItem(item.id))} className="text-error hover:text-red-600 p-1">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  <p className="text-primary font-bold mt-1">₹{item.price}</p>
                  
                  {/* Qty Controls */}
                  <div className="flex items-center gap-3 mt-3 bg-surface-container-low w-fit rounded-lg px-2 py-1">
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                      className="w-6 h-6 flex items-center justify-center text-on-surface font-bold hover:bg-surface-container-highest rounded transition"
                    >-</button>
                    <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="w-6 h-6 flex items-center justify-center text-on-surface font-bold hover:bg-surface-container-highest rounded transition"
                    >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-surface border-t border-surface-container-highest shrink-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">Total</span>
              <span className="text-2xl font-[family-name:var(--font-display)] font-bold text-primary">₹{total}</span>
            </div>
            <button 
              onClick={() => { onClose(); router.push('/checkout'); }}
              className="w-full bg-secondary text-on-secondary py-4 rounded-xl hover:bg-secondary-container transition duration-300 shadow-[0_5px_15px_rgba(128,85,51,0.2)] font-bold text-lg"
            >
              Secure Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
