export default function TermsPage() {
  return (
    <div className="bg-surface min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-4">Terms & Conditions</h1>
        <p className="text-on-surface-variant mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-10 text-on-surface leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">1. Acceptance of Terms</h2>
            <p className="text-on-surface-variant">By accessing or using the GaonToBharat Foods website and placing an order, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">2. About GaonToBharat</h2>
            <p className="text-on-surface-variant">GaonToBharat Foods is a direct-farm-to-home food brand that sources unprocessed, chemical-free staples — including dals, rice, pulses, oils, and spices — directly from small-scale Indian farmers. We operate on a Cash on Delivery (COD) model. No online payment is required at the time of ordering.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">3. Orders & Confirmation</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>All orders are subject to availability and confirmation by our team via phone call.</li>
              <li>We reserve the right to cancel any order if the product is out of stock or if we are unable to reach you for confirmation.</li>
              <li>Placing an order does not guarantee delivery until confirmed by our team.</li>
              <li>You must provide accurate shipping details. GaonToBharat is not responsible for failed deliveries due to incorrect addresses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">4. Pricing</h2>
            <p className="text-on-surface-variant">All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. Prices may change without prior notice. The price at the time of order placement is the price you will be charged.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">5. Payment</h2>
            <p className="text-on-surface-variant">GaonToBharat currently operates on a <strong>Cash on Delivery (COD)</strong> basis only. Payment is collected at the time of delivery by our delivery partner. Please keep the exact amount ready to ensure a smooth handover.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">6. Product Quality</h2>
            <p className="text-on-surface-variant">We take great pride in the quality of our products. All items are sourced directly from verified farmers and are free from artificial preservatives, chemicals, and adulterants. Natural variations in colour, texture, and size are expected and are a sign of authenticity — not a defect.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">7. Intellectual Property</h2>
            <p className="text-on-surface-variant">All content on this website — including text, images, logos, and design — is the property of GaonToBharat Foods and is protected under applicable intellectual property laws. You may not reproduce, distribute, or use any content without our written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">8. Limitation of Liability</h2>
            <p className="text-on-surface-variant">GaonToBharat Foods shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our maximum liability is limited to the value of the order placed.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">9. Governing Law</h2>
            <p className="text-on-surface-variant">These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Maharashtra, India.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">10. Contact</h2>
            <p className="text-on-surface-variant">For any questions regarding these terms, contact us at <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
