import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true }
  });
  if (!product) notFound();

  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto bg-surface-container rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_rgba(28,28,25,0.05)]">
        {/* left image */}
        <div className="md:w-1/2 relative bg-surface-container-highest flex items-center justify-center p-10">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-[1.5rem] shadow-lg" />
          ) : (
             <div className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">No image</div>
          )}
        </div>
        {/* right info */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
           <span className="text-xs font-bold tracking-widest text-secondary mb-3 uppercase">{product.category}</span>
           <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-tertiary leading-tight">{product.name}</h1>
           <p className="text-on-surface-variant mt-6 leading-relaxed font-medium text-lg">{product.description}</p>
           
           <div className="mt-10">
             <AddToCartButton product={product} variants={product.variants} />
           </div>
        </div>
      </div>
    </div>
  );
}
