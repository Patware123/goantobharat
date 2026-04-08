"use client";
import { newsletterData } from "@/lib/homeData";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(""); }
  };

  return (
    <section className="py-14 px-4">
      <div className="max-w-2xl mx-auto bg-green-800 rounded-3xl px-8 py-12 text-center text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">{newsletterData.heading}</h2>
        <p className="text-green-200 text-sm mb-8">{newsletterData.sub}</p>
        {done ? (
          <p className="text-amber-300 font-semibold">🎉 You're subscribed! Welcome to the movement.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletterData.placeholder}
              required
              className="flex-1 px-4 py-2.5 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition whitespace-nowrap">
              {newsletterData.cta}
            </button>
          </form>
        )}
        <p className="text-green-300 text-[11px] mt-4">{newsletterData.disclaimer}</p>
      </div>
    </section>
  );
}
