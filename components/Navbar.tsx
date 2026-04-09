"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAppSelector } from "@/store";
import { selectCartCount } from "@/store/cartSlice";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "My Orders", href: "/orders" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string })?.role;
  const cartCount = useAppSelector(selectCartCount);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
    <nav className="bg-surface/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="font-[family-name:var(--font-display)] font-bold text-2xl text-tertiary whitespace-nowrap">
          GaonTo<span className="text-secondary">Bharat</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-on-surface-variant">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-primary transition font-semibold">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6 text-sm">
          {/* Cart */}
          <button onClick={() => setIsCartOpen(true)} className="relative p-1 hover:text-primary transition">
            <svg className="w-6 h-6 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {role === "ADMIN" && (
            <Link href="/admin" className="text-xs font-bold text-tertiary-container hover:text-tertiary border-b border-transparent hover:border-tertiary transition">Admin</Link>
          )}

          {session ? (
             <div className="flex items-center gap-4">
              <Link href="/profile" className="hidden sm:inline text-xs font-semibold text-on-surface-variant hover:text-primary">Profile</Link>
              <button onClick={() => signOut()} className="text-xs text-on-surface-variant hover:text-red-600 transition font-medium">Sign out</button>
             </div>
          ) : (
            <Link href="/login" className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition shadow-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
