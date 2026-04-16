"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-surface">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12 items-center">
        {/* Visual Side: Asymmetric Image Presentation */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative z-10 rounded-tl-[80px] rounded-br-[80px] overflow-hidden bg-surface-container">
            <img 
              className="w-full aspect-[4/5] object-cover mix-blend-multiply opacity-90" 
              alt="overhead shot of fresh organic vegetables and artisanal grains in woven baskets on a rustic stone floor with soft natural light" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZxlRO49C_fPKh7aMe4fqkIjhPN8X36B1Bkijmi-7iPyaX_dOf6Guu6yX07C_aTKkf9D-Xrk0L1KQcaJjgLINAP4sjJszOK1AIhlP5A_Nd6910ve9PTP8M6L05Q_uJFm4608o_u1lTOoM0iqvmjydD3dAy2pEFzbVN5HSG3HXxBl_zkYvFE-n-idHoeR2pk5cnKH7_arGqwzdlnysTnA-wG59G761mr5kNYcipdVrnNG-MtD0L1ZkPReoL24f7zQK_nb6gGZ6l9gHA"
            />
          </div>
        </div>

        {/* Content Side: Order Success Information */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="space-y-4">
            
            {orderId && (
              <div className="inline-block bg-surface-container-highest px-4 py-2 rounded-xl mb-2">
                 <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold mr-2">Order ID</span>
                 <span className="font-mono text-tertiary font-bold tracking-wider">{orderId.slice(-8).toUpperCase()}</span>
              </div>
            )}
            <h1 className="font-headline text-5xl md:text-6xl text-primary leading-tight">Order Placed Successfully!</h1>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-lg">Thank you for your order with <span className="font-headline italic text-primary">GaonToBharat Foods</span>.</p>
              
              <div className="bg-surface-container-low p-6 rounded-xl space-y-3">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>phone_in_talk</span>
                  <p className="text-sm">Our team will call you shortly to confirm your order details and delivery window.</p>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                  <p className="text-sm">Once confirmed, your order will be carefully packed and delivered to your address.</p>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  <p className="text-sm font-semibold">No online payment is required at this stage.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/orders" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-md font-label font-bold transition-all duration-300 hover:bg-primary-container hover:shadow-lg active:scale-95 group">
              View My Orders
              <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
            <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-secondary-container text-on-secondary-container rounded-md font-label font-bold transition-all duration-300 hover:bg-surface-container-highest active:scale-95">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="bg-surface min-h-screen"></div>}>
       <SuccessContent />
    </Suspense>
  )
}
