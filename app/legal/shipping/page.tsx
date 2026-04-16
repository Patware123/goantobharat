export default function ShippingPolicyPage() {
  return (
    <div className="bg-surface min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-4">Shipping Policy</h1>
        <p className="text-on-surface-variant mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-10 text-on-surface leading-relaxed">

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📦", title: "Order Processing", desc: "1–2 business days after confirmation call" },
              { icon: "🚚", title: "Delivery Time", desc: "3–5 business days across India" },
              { icon: "💰", title: "Shipping Charges", desc: "Free on orders above ₹499" },
            ].map((item) => (
              <div key={item.title} className="bg-surface-container p-6 rounded-2xl text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-on-surface mb-1">{item.title}</p>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">1. Order Confirmation</h2>
            <p className="text-on-surface-variant">Every order placed on GaonToBharat is followed by a confirmation call from our team. This ensures your order details, address, and delivery window are accurate before we dispatch. Orders are processed only after confirmation. If we are unable to reach you within 24 hours, the order may be cancelled and you will be notified.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">2. Processing Time</h2>
            <p className="text-on-surface-variant">Once confirmed, your order is carefully packed at our fulfilment centre within <strong>1–2 business days</strong>. Business days are Monday to Saturday, excluding public holidays. Orders placed on Sundays or public holidays are processed the next business day.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">3. Delivery Timeframe</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li><strong className="text-on-surface">Metro Cities</strong> (Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai): 2–3 business days after dispatch.</li>
              <li><strong className="text-on-surface">Tier 2 & Tier 3 Cities:</strong> 3–5 business days after dispatch.</li>
              <li><strong className="text-on-surface">Remote Areas:</strong> 5–7 business days after dispatch.</li>
            </ul>
            <p className="mt-3 text-on-surface-variant text-sm">Delivery timelines are estimates and may vary due to weather, logistics delays, or public holidays.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">4. Shipping Charges</h2>
            <div className="bg-surface-container rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-highest text-on-surface-variant text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Order Value</th>
                    <th className="px-6 py-4 text-left font-bold">Shipping Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface">
                  <tr><td className="px-6 py-4 text-on-surface-variant">Below ₹499</td><td className="px-6 py-4 font-semibold text-on-surface">₹49</td></tr>
                  <tr><td className="px-6 py-4 text-on-surface-variant">₹499 and above</td><td className="px-6 py-4 font-bold text-secondary">FREE</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">5. Packaging</h2>
            <p className="text-on-surface-variant">All products are packed in food-grade, moisture-resistant packaging to preserve freshness during transit. We use minimal, eco-conscious packaging materials wherever possible — because we care about the planet as much as we care about your food.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">6. Tracking Your Order</h2>
            <p className="text-on-surface-variant">Once your order is dispatched, you will receive a tracking link via SMS or WhatsApp on your registered phone number. You can also view your order status by logging into your account and visiting the <strong>My Orders</strong> section.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">7. Failed Delivery</h2>
            <p className="text-on-surface-variant">If a delivery attempt fails due to an incorrect address or unavailability, our delivery partner will attempt re-delivery once. If the second attempt also fails, the order will be returned to us. In such cases, re-shipping charges will apply for a fresh delivery attempt.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">8. Contact</h2>
            <p className="text-on-surface-variant">For shipping-related queries, reach us at <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a> or call <strong>+91 86021 77475</strong>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
