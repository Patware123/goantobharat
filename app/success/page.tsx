"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="bg-surface min-h-screen py-24 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-surface-container p-14 rounded-[3rem] text-center shadow-[0_30px_60px_rgba(28,28,25,0.05)]">
        <div className="w-28 h-28 bg-surface-container-highest text-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-6">Payment Confirmed</h1>
        
        {orderId && (
          <div className="mb-8 inline-block bg-surface-container-highest px-6 py-3 rounded-2xl">
             <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold mr-2">Order ID</span>
             <span className="font-mono text-tertiary font-bold tracking-wider">{orderId.slice(-8).toUpperCase()}</span>
          </div>
        )}

        <p className="text-on-surface-variant mb-12 leading-relaxed text-lg font-medium">
          Thank you for choosing GaonToBharat. Your order has been securely placed. We will contact you shortly to confirm delivery schedules and specifics!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-primary-container shadow-[0_10px_30px_rgba(1,45,29,0.15)] transition duration-300">
            Track Order Status
          </Link>
          <Link href="/products" className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-container-low transition duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="bg-surface min-h-screen"></div>}>
       <SuccessContent />
    </Suspense>
  )
}
