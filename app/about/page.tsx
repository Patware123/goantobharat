import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-surface min-h-screen">

      {/* Hero */}
      <section className="py-24 px-4 bg-surface-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-6xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-6 leading-tight">
            From the Gaon,<br />For Bharat.
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            We started GaonToBharat because we were tired of eating food that had forgotten where it came from. Food that was polished, processed, and packaged beyond recognition. We wanted to bring back the real thing.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
              alt="Indian farmland at sunrise"
              className="rounded-tl-[60px] rounded-br-[60px] w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-[family-name:var(--font-display)] font-semibold text-tertiary">The Problem We Saw</h2>
            <p className="text-on-surface-variant leading-relaxed">
              India has some of the most fertile land and the most skilled farmers in the world. Yet the food that reaches urban kitchens is often chemically treated, over-polished, and stripped of its natural nutrition — all in the name of shelf life and appearance.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Meanwhile, the farmers who grow this food earn a fraction of what it's worth, because of a long chain of middlemen who add cost but no value.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              We decided to fix both problems at once.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-surface-container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl font-[family-name:var(--font-display)] font-semibold text-tertiary">What We Do Differently</h2>
            <p className="text-on-surface-variant leading-relaxed">
              GaonToBharat works directly with small-scale farmers across Maharashtra and beyond. We source unpolished dals, heritage rice, stone-ground spices, cold-pressed oils, and artisanal jaggery — straight from the farm to your doorstep.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              No middlemen. No chemicals. No compromise.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Every product carries a QR code that tells you the name of the farmer, the village it came from, and the date it was harvested. Because your food deserves a story, not just a label.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Farmer Ramrao from Sangli"
              className="rounded-tl-[60px] rounded-br-[60px] w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-4">What We Stand For</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Every decision we make is guided by three non-negotiables.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🌾", title: "Farmer First", desc: "We pay farmers directly and fairly. No middlemen, no exploitation. When farmers thrive, India thrives." },
              { icon: "🌿", title: "Pure Always", desc: "Zero chemicals, zero artificial preservatives, zero compromise. What you see is what you get — straight from the soil." },
              { icon: "🤝", title: "Radical Transparency", desc: "Every product is traceable. You know who grew it, where, and when. Food should have a face, not just a barcode." },
            ].map((v) => (
              <div key={v.title} className="bg-surface-container p-8 rounded-3xl text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-on-surface mb-3">{v.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "50+", label: "Farmer Partners" },
            { num: "10,000+", label: "Happy Families" },
            { num: "15+", label: "Villages Sourced" },
            { num: "0", label: "Chemicals Used" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-[family-name:var(--font-display)] font-bold text-white mb-2">{s.num}</p>
              <p className="text-sm text-white/70 font-semibold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-tertiary mb-6">Ready to Eat Real Food?</h2>
          <p className="text-on-surface-variant mb-10 leading-relaxed">Join thousands of Indian families who have made the switch to honest, farm-fresh food. Your body will thank you. So will the farmer.</p>
          <Link href="/products" className="inline-block bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:bg-primary-container transition shadow-md text-lg">
            Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
}
