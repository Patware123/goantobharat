"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 bg-surface-container rounded-xl p-10">
      <h1 className="text-3xl font-[family-name:var(--font-display)] font-semibold mb-8 text-tertiary">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
          <input name="email" type="email" required className="w-full bg-surface-container-highest border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">Password</label>
          <input name="password" type="password" required className="w-full bg-surface-container-highest border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface" placeholder="********" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={pending} className="w-full bg-primary text-on-primary py-3 rounded-lg hover:bg-primary-container transition duration-300 disabled:opacity-50 font-semibold shadow-[0_10px_30px_rgba(1,45,29,0.15)]">
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="mt-8 text-sm text-on-surface-variant text-center">
        No account?{" "}
        <Link href="/register" className="text-secondary hover:text-secondary-container transition font-bold">Register</Link>
      </p>
    </div>
  );
}
