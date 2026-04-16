import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@gaontobharat.com" },
    update: {},
    create: {
      email: "admin@gaontobharat.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN"
    }
  });
  console.log("✓ Admin — admin@gaontobharat.com / admin123");

  const customerPassword = await bcrypt.hash("customer123", 10);
  await prisma.user.upsert({
    where: { email: "customer@gaontobharat.com" },
    update: {},
    create: {
      email: "customer@gaontobharat.com",
      name: "Test Customer",
      password: customerPassword,
      role: "CUSTOMER"
    }
  });
  console.log("✓ Customer — customer@gaontobharat.com / customer123");

  // clear existing to avoid dupes via random IDs
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: "Unpolished Tur Dal",
      description: "Direct from Sangli. Zero chemicals, stone-ground.",
      basePrice: 185,
      category: "Dal",
      image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&q=80",
      variants: [
        { weight: "1kg", price: 185, stock: 50 },
        { weight: "5kg", price: 900, stock: 20 },
      ]
    },
    {
      name: "Sona Masoori Rice (Aged)",
      description: "Pesticide-free heritage rice.",
      basePrice: 145,
      category: "Rice",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
      variants: [
        { weight: "1kg", price: 145, stock: 100 },
        { weight: "10kg", price: 1350, stock: 15 },
      ]
    },
    {
      name: "Desi Chana",
      description: "Protein-rich, earth-grown desi chana.",
      basePrice: 120,
      category: "Pulses",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
      variants: [
        { weight: "1kg", price: 120, stock: 80 },
        { weight: "5kg", price: 550, stock: 40 },
      ]
    }
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        basePrice: p.basePrice,
        category: p.category,
        image: p.image,
        variants: {
          create: p.variants
        }
      }
    });
    console.log(`✓ Seeded ${p.name}`);
  }

  console.log("Seed complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
