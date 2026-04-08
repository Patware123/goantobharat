import { footerData } from "@/lib/homeData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2">
          <p className="text-white font-bold text-xl mb-2">{footerData.brand}</p>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">{footerData.tagline}</p>
          <div className="flex gap-3 mt-4">
            {footerData.socials.map((s, i) => (
              <button key={i} className="w-8 h-8 rounded-full bg-gray-700 hover:bg-green-700 flex items-center justify-center text-sm transition">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerData.columns.map((col) => (
          <div key={col.heading}>
            <p className="text-white text-xs font-bold tracking-widest mb-4">{col.heading}</p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-white transition">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} {footerData.brand}. All rights reserved.
      </div>
    </footer>
  );
}
