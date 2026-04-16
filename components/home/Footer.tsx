import { footerData } from "@/lib/homeData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-background py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Contact */}
        <div className="col-span-1 md:col-span-2">
          <p className="text-white font-bold text-2xl mb-3">{footerData.brand}</p>
          <p className="text-sm opacity-90 max-w-sm leading-relaxed mb-6">{footerData.tagline}</p>
          
          <div className="space-y-2 text-sm opacity-90">
            <p><strong>Email:</strong> {footerData.contact.email}</p>
            <p><strong>Phone:</strong> {footerData.contact.phone}</p>
            <p><strong>Address:</strong> {footerData.contact.address}</p>
          </div>

          <div className="flex gap-4 mt-6">
            {footerData.socials.map((s, i) => (
              <button key={i} className="w-10 h-10 rounded-full bg-secondary hover:bg-opacity-80 flex items-center justify-center text-lg transition">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerData.columns.map((col) => (
          <div key={col.heading}>
            <p className="text-white text-sm font-bold tracking-widest mb-6">{col.heading}</p>
            <ul className="space-y-4">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 hover:text-white transition">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/20 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {footerData.brand}. All rights reserved.
      </div>
    </footer>
  );
}
