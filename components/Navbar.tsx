"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAppSelector } from "@/store";
import { selectCartCount } from "@/store/cartSlice";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Farmers", href: "#" },
  { label: "About", href: "#" },
  { label: "Food Order", href: "#" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string })?.role;
  const cartCount = useAppSelector(selectCartCount);

  return (
    <nav className="border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="font-bold text-lg text-gray-900 whitespace-nowrap">
          GaonTo<span className="text-green-700">Bharat</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-green-700 transition font-medium">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2 text-sm text-gray-400 w-44">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span>Search heritage goods...</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 text-sm">
          {/* Cart */}
          <Link href="/cart" className="relative p-1.5 hover:text-green-700 transition">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {role === "ADMIN" && (
            <Link href="/admin" className="text-xs font-semibold text-indigo-600 hover:underline">Admin</Link>
          )}

          {session ? (
            <button onClick={() => signOut()} className="text-xs text-gray-500 hover:text-red-500 transition">Sign out</button>
          ) : (
            <Link href="/login" className="bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-800 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
