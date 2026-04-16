"use client";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/cartSlice";
import { useState } from "react";

type Variant = { id: string; weight: string; price: number; stock?: number; productId: string };
type Product = { id: string; name: string; image?: string | null };

export default function QuickAddToCart({ product, variant }: { product: Product, variant?: Variant }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Fallback if variant isn't provided (using base product details)
    const itemId = variant?.id || product.id;
    const itemName = variant ? `${product.name} (${variant.weight})` : product.name;
    const itemPrice = variant?.price || 0; // The products page will actually pass the variant if it exists

    dispatch(addItem({ 
      id: itemId, 
      name: itemName, 
      price: itemPrice, 
      image: product.image || undefined,
      quantity: 1
    }));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`text-xs px-4 py-2 rounded-xl font-bold tracking-widest uppercase shadow-sm transition duration-300 ${
        added 
          ? "bg-primary text-on-primary" 
          : "bg-secondary hover:bg-secondary-container text-on-secondary"
      } disabled:opacity-50`}
    >
      {added ? "✓ Added" : "Add +"}
    </button>
  );
}

