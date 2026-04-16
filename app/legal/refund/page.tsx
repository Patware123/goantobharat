export default function RefundPolicyPage() {
  return (
    <div className="bg-surface min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-4">Refund Policy</h1>
        <p className="text-on-surface-variant mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-10 text-on-surface leading-relaxed">

          <section className="bg-surface-container p-6 rounded-2xl border-l-4 border-secondary">
            <p className="font-semibold text-on-surface">At GaonToBharat, your satisfaction is our priority. We stand behind every product we deliver. If something is not right, we will make it right — no questions asked.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">1. Eligibility for Refund or Replacement</h2>
            <p className="mb-3 text-on-surface-variant">You are eligible for a full refund or free replacement if:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>You received a damaged, spoiled, or incorrect product.</li>
              <li>The product quality does not match what was described on our website.</li>
              <li>Your order was not delivered within the promised timeframe and was not rescheduled.</li>
              <li>You received a short quantity compared to what was ordered.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">2. How to Raise a Refund Request</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Contact us within <strong className="text-on-surface">48 hours</strong> of receiving your order.</li>
              <li>Email us at <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a> with your Order ID and a brief description of the issue.</li>
              <li>Attach a clear photo or video of the product showing the issue.</li>
              <li>Our team will review your request within 1–2 business days and respond with a resolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">3. Refund Process</h2>
            <p className="text-on-surface-variant">Since we operate on Cash on Delivery, refunds are processed as follows:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-3">
              <li><strong className="text-on-surface">Bank Transfer:</strong> Refund will be credited to your provided bank account or UPI ID within 5–7 business days after approval.</li>
              <li><strong className="text-on-surface">Replacement:</strong> A fresh replacement order will be dispatched within 2–3 business days at no extra cost.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">4. Non-Refundable Cases</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Refund requests raised after 48 hours of delivery.</li>
              <li>Products that have been partially consumed (beyond a reasonable quality check).</li>
              <li>Change of mind after the order has been dispatched.</li>
              <li>Natural variations in colour, texture, or size of farm produce — these are signs of authenticity, not defects.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">5. Order Cancellation</h2>
            <p className="text-on-surface-variant">You may cancel your order before it is dispatched by calling us at <strong>+91 86021 77475</strong> or emailing us. Once dispatched, cancellations are not accepted. If you refuse delivery at the door, the order will be treated as a return and no refund will be issued.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">6. Contact for Refunds</h2>
            <p className="text-on-surface-variant">Email: <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a><br />Phone: <strong>+91 86021 77475</strong><br />Response time: Within 24 hours on business days.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
