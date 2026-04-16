export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-4">Privacy Policy</h1>
        <p className="text-on-surface-variant mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-10 text-on-surface leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">1. Who We Are</h2>
            <p>GaonToBharat Foods ("we", "our", "us") is a direct-to-consumer food brand connecting Indian households with farm-fresh, chemical-free produce sourced directly from small-scale farmers across India. Our registered address is GaonToBharat Foods, Agri Hub, Rural Tech Park, India. You can reach us at <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">2. Information We Collect</h2>
            <p className="mb-3">When you use our website or place an order, we collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li><strong className="text-on-surface">Personal Identification:</strong> Name, email address, and phone number provided during registration or checkout.</li>
              <li><strong className="text-on-surface">Delivery Information:</strong> Shipping address, city, and pincode required to fulfil your order.</li>
              <li><strong className="text-on-surface">Order Data:</strong> Products purchased, quantities, prices, and order history.</li>
              <li><strong className="text-on-surface">Device & Usage Data:</strong> Browser type, IP address, pages visited, and time spent — collected automatically via cookies and analytics tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>To process and deliver your orders.</li>
              <li>To confirm your order via phone call before dispatch.</li>
              <li>To send order updates and delivery notifications.</li>
              <li>To respond to your queries and support requests.</li>
              <li>To improve our website, products, and services.</li>
              <li>To send seasonal harvest alerts and newsletters — only if you have subscribed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">4. Sharing of Information</h2>
            <p className="text-on-surface-variant">We do not sell, trade, or rent your personal information to third parties. We may share your delivery details with our trusted logistics partners solely for the purpose of delivering your order. All partners are bound by confidentiality obligations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">5. Data Security</h2>
            <p className="text-on-surface-variant">We implement industry-standard security measures including encrypted connections (HTTPS), hashed passwords, and access-controlled databases to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">6. Cookies</h2>
            <p className="text-on-surface-variant">We use essential cookies to keep you logged in and maintain your cart session. We may also use analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings, though some features may not function correctly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">7. Your Rights</h2>
            <p className="mb-3 text-on-surface-variant">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Unsubscribe from marketing communications at any time.</li>
            </ul>
            <p className="mt-3 text-on-surface-variant">To exercise any of these rights, email us at <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">8. Changes to This Policy</h2>
            <p className="text-on-surface-variant">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tertiary mb-3">9. Contact Us</h2>
            <p className="text-on-surface-variant">For any privacy-related concerns, please contact us at <a href="mailto:sanskar.patware@gmail.com" className="text-secondary font-semibold hover:underline">sanskar.patware@gmail.com</a> or call us at <strong>+91 86021 77475</strong>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
