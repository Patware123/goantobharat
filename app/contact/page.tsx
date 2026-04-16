"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSending(false);
    if (res.ok) {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setError("Something went wrong. Please email us directly at sanskar.patware@gmail.com");
    }
  };

  return (
    <div className="bg-surface min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-4">We'd Love to Hear From You</h1>
          <p className="text-on-surface-variant max-w-xl mx-auto">Whether it's a question about your order, a product query, or just a hello — we're here and we respond fast.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: "📧", title: "Email Us", value: "sanskar.patware@gmail.com", href: "mailto:sanskar.patware@gmail.com" },
              { icon: "📞", title: "Call Us", value: "+91 86021 77475", href: "tel:+919876543210" },
              { icon: "📍", title: "Our Address", value: "GaonToBharat Foods, Agri Hub, Rural Tech Park, India", href: null },
            ].map((item) => (
              <div key={item.title} className="bg-surface-container p-6 rounded-2xl flex gap-4 items-start">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-on-surface font-semibold hover:text-secondary transition text-sm">{item.value}</a>
                  ) : (
                    <p className="text-on-surface font-semibold text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-surface-container p-6 rounded-2xl">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Business Hours</p>
              <p className="text-sm text-on-surface-variant">Monday – Saturday<br /><span className="font-semibold text-on-surface">9:00 AM – 6:00 PM IST</span></p>
              <p className="text-sm text-on-surface-variant mt-2">Sunday: Closed</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="bg-surface-container rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="text-2xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-3">Message Sent!</h2>
                <p className="text-on-surface-variant">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-sm font-bold text-secondary hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface-container rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Your Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ramesh Patel"
                      className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Subject</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  >
                    <option value="">Select a topic</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Refund Request">Refund Request</option>
                    <option value="Product Query">Product Query</option>
                    <option value="Bulk / Wholesale Enquiry">Bulk / Wholesale Enquiry</option>
                    <option value="Farmer Partnership">Farmer Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                  />
                </div>

                {error && <p className="text-sm text-error font-semibold">{error}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:bg-primary-container transition disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <><div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div> Sending...</>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
