"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=/profile");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setForm({ name: data.name || "", email: data.email, phone: data.phone || "" });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone }),
    });

    setSaving(false);
    if (res.ok) {
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      const data = await res.json();
      setErrorMsg(data.error || "Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="bg-surface min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary">My Profile</h1>
          <div className="h-64 bg-surface-container rounded-[2rem] animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
           <h1 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary">My Profile</h1>
           <button onClick={() => signOut()} className="text-sm font-bold text-error bg-error-container/30 px-6 py-2.5 rounded-xl hover:bg-error-container hover:text-on-error-container transition duration-300">
             Sign Out
           </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Stats Panel */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-surface-container p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
               <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                 {form.name ? form.name.charAt(0).toUpperCase() : "🌾"}
               </div>
               <h2 className="text-xl font-bold text-on-surface mb-1">{form.name || "Customer"}</h2>
               <p className="text-sm text-on-surface-variant font-medium break-all">{form.email}</p>
            </div>

            <Link href="/orders" className="block w-full bg-surface-container p-6 rounded-[1.5rem] shadow-[0_10px_30px_rgba(28,28,25,0.02)] hover:bg-surface-container-low transition border border-transparent hover:border-primary/20 group">
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface text-lg">My Orders</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-sm text-on-surface-variant mt-2">Track, return, or buy items again</p>
            </Link>
          </div>

          {/* Edit Profile Form */}
          <div className="md:col-span-2">
             <div className="bg-surface-container p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(28,28,25,0.02)]">
                <h3 className="text-2xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-8">Personal Information</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Full Name</label>
                     <input 
                       type="text" 
                       value={form.name} 
                       onChange={(e) => setForm({...form, name: e.target.value})} 
                       className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition font-medium" 
                       placeholder="e.g. Ramesh Patel"
                     />
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Email Address</label>
                     <input 
                       type="email" 
                       value={form.email} 
                       disabled
                       className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3.5 text-on-surface-variant/70 focus:outline-none opacity-70 font-medium cursor-not-allowed" 
                     />
                     <p className="text-xs text-on-surface-variant mt-2 font-medium">Your email address is secured and cannot be changed.</p>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Phone Number</label>
                     <input 
                       type="tel" 
                       value={form.phone} 
                       onChange={(e) => setForm({...form, phone: e.target.value})} 
                       className="w-full bg-surface-container-highest border-transparent rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition font-medium" 
                       placeholder="e.g. +91 9876543210"
                     />
                   </div>

                   <hr className="border-surface-container-highest my-8" />

                   <div className="flex items-center gap-4">
                     <button type="submit" disabled={saving} className="bg-primary text-on-primary px-10 py-3.5 rounded-xl font-bold hover:bg-primary-container transition duration-300 disabled:opacity-50 shadow-md">
                       {saving ? "Saving..." : "Save Changes"}
                     </button>
                     
                     {successMsg && <p className="text-sm font-bold text-primary animate-fade-in">{successMsg}</p>}
                     {errorMsg && <p className="text-sm font-bold text-error">{errorMsg}</p>}
                   </div>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
