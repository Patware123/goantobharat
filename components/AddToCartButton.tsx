"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

type Variant = { id: string; weight: string; price: number; stock: number; productId: string };
type Product = { id: string; name: string; image?: string | null };

export default function AddToCartButton({ product, variants }: { product: Product, variants: Variant[] }) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const dispatch = useAppDispatch();

  if (!variants || variants.length === 0) return <p className="text-error font-bold mt-4">Out of Stock</p>;

  const handleAdd = () => {
    if (!selectedVariant) return;
    dispatch(addItem({ 
      id: selectedVariant.id, 
      name: `${product.name} (${selectedVariant.weight})`, 
      price: selectedVariant.price, 
      image: product.image || undefined,
      quantity // inject the local quantity!
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <p className="text-5xl font-[family-name:var(--font-display)] font-bold text-primary mb-8">₹{selectedVariant?.price}</p>
      
      <div className="mb-8">
        <label className="text-sm font-bold text-on-surface-variant mb-3 block uppercase tracking-widest">Select Variant</label>
        <div className="flex flex-wrap gap-4">
          {variants.map(v => (
            <button
              key={v.id}
              onClick={() => { setSelectedVariant(v); setQuantity(1); }}
              className={`px-5 py-3 rounded-xl font-bold transition duration-300 ${selectedVariant?.id === v.id ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-low'}`}
            >
              {v.weight}
            </button>
          ))}
        </div>
        
        {/* Quantity Controls */}
        <div className="mt-6">
           <label className="text-sm font-bold text-on-surface-variant mb-3 block uppercase tracking-widest">Quantity</label>
           <div className="flex items-center gap-4 bg-surface-container-highest w-fit rounded-xl px-2 py-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-on-surface text-xl font-bold hover:bg-surface-container-low rounded-lg transition"
              >-</button>
              <span className="w-8 text-center text-lg font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(selectedVariant?.stock || 99, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center text-on-surface text-xl font-bold hover:bg-surface-container-low rounded-lg transition"
              >+</button>
           </div>
        </div>

        {selectedVariant?.stock <= 5 && selectedVariant?.stock > 0 && (
          <p className="text-secondary font-bold text-sm mt-3 uppercase tracking-widest">Only {selectedVariant.stock} left in stock!</p>
        )}
      </div>

      <button
        onClick={handleAdd}
        disabled={selectedVariant?.stock <= 0 || added}
        className="w-full bg-secondary text-on-secondary py-4 rounded-xl hover:bg-secondary-container transition duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(128,85,51,0.2)] font-bold text-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        {added ? "Added to Basket!" : selectedVariant?.stock > 0 ? "Add to Basket" : "Out of Stock"}
      </button>
      
      <div className="mt-8 p-6 bg-surface-container-low rounded-2xl flex items-start gap-4">
        <span className="text-2xl mt-1">🌿</span>
        <div>
          <p className="text-sm font-bold text-on-surface uppercase tracking-widest">Direct from Farms</p>
          <p className="text-xs text-on-surface-variant mt-1.5 font-medium leading-relaxed">Your purchase supports fair trade and natural farming practices.</p>
        </div>
      </div>
    </div>
  );
}
