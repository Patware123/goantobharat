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
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-4xl mx-auto bg-primary rounded-[2.5rem] px-8 py-16 text-center text-on-primary shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-4">{newsletterData.heading}</h2>
          <p className="text-primary-container font-medium text-base mb-10 max-w-md mx-auto">{newsletterData.sub}</p>
          {done ? (
            <div className="bg-surface/20 py-4 px-6 rounded-2xl inline-block">
              <p className="text-secondary-container font-bold text-lg">🎉 You're subscribed! Welcome to the movement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterData.placeholder}
                required
                className="flex-1 px-6 py-4 rounded-xl bg-surface/10 text-on-primary placeholder:text-primary-container/70 border border-surface/20 focus:outline-none focus:border-secondary-container focus:bg-surface/20 transition backdrop-blur-sm"
              />
              <button type="submit" className="bg-secondary hover:bg-secondary-container text-on-secondary px-8 py-4 rounded-xl font-bold transition whitespace-nowrap shadow-lg">
                {newsletterData.cta}
              </button>
            </form>
          )}
          <p className="text-primary-container text-[11px] mt-6 tracking-wide font-medium uppercase">{newsletterData.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
