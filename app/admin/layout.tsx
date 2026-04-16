"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4 py-8">
      <aside className="w-56 shrink-0">
        <nav className="bg-surface-container rounded-3xl p-6 space-y-3 text-sm sticky top-24 shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Admin Panel</p>
          {links.map(({ href, label }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-3 rounded-xl font-semibold transition duration-300 ${
                  active
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface hover:bg-primary-container hover:text-on-primary-container"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
