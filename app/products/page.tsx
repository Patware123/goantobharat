"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store";
import QuickAddToCart from "@/components/QuickAddToCart";

export default function ProductsPage() {
  const { items: products, status } = useAppSelector((state) => state.products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && status === "loading" && products.length === 0) {
    return (
      <div className="bg-surface min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-on-surface-variant font-medium animate-pulse">Gathering Harvest...</p>
      </div>
    );
  }


  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary text-center">Direct from Farms</h1>
        {products.length === 0 && (
          <p className="text-on-surface-variant font-medium bg-surface-container p-12 rounded-3xl text-center">No products available yet. Check back soon!</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p: any) => (
            <div
              key={p.id}
              className="bg-surface-container rounded-3xl shadow-[0_10px_30px_rgba(28,28,25,0.02)] hover:-translate-y-1 hover:shadow-lg transition duration-500 overflow-hidden group flex flex-col"
            >
              <Link href={`/products/${p.id}`} className="relative h-64 w-full overflow-hidden bg-surface-container-highest block">
                {p.image ? (
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-sm font-bold uppercase tracking-widest">No image</div>
                )}
                <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-tertiary uppercase tracking-widest rounded-xl shadow-sm z-10">
                  {p.category}
                </div>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <Link href={`/products/${p.id}`}>
                  <h2 className="font-[family-name:var(--font-display)] font-bold text-on-surface text-2xl leading-tight hover:text-primary transition-colors">{p.name}</h2>
                </Link>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <p className="text-primary font-bold text-2xl">₹{p.basePrice}<span className="text-sm text-on-surface-variant font-semibold uppercase tracking-widest ml-1">/kg</span></p>
                  <QuickAddToCart product={p} variant={p.variants && p.variants.length > 0 ? p.variants[0] : { id: p.id, weight: "1kg", price: p.basePrice, productId: p.id }} />

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


