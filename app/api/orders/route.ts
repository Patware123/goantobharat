import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { role?: string; email?: string };

  if (sessionUser.role === "ADMIN") {
    try {
      const data = await (prisma.order as any).findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true, items: { include: { variant: { include: { product: true } } } } },
      });
      return NextResponse.json(data);
    } catch (error: any) {
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
  }

  try {
    let user = await prisma.user.findUnique({ where: { email: sessionUser.email! } });
    if (!user) {
      user = await (prisma.user as any).create({
        data: {
          email: sessionUser.email!,
          name: sessionUser.email!.split("@")[0],
          password: await bcrypt.hash(randomBytes(16).toString("hex"), 10),
          role: "CUSTOMER",
        },
      });
    }

    const data = await (prisma.order as any).findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      include: { items: { include: { variant: { include: { product: true } } } } },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string; name?: string };
  let user = await prisma.user.findUnique({ where: { email: sessionUser.email! } });

  if (!user) {
    user = await (prisma.user as any).create({
      data: {
        email: sessionUser.email!,
        name: sessionUser.name || sessionUser.email!.split("@")[0],
        password: await bcrypt.hash(randomBytes(16).toString("hex"), 10),
        role: "CUSTOMER",
      },
    });
  }

  const { items, shipping } = await req.json();
  if (!items?.length) return NextResponse.json({ error: "No items" }, { status: 400 });

  // Validate quantities are positive integers
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return NextResponse.json({ error: "Invalid item quantity" }, { status: 400 });
    }
  }

  try {
    const variantIds = items.map((i: any) => i.variantId);
    let validVariants = await (prisma.productVariant as any).findMany({
      where: { id: { in: variantIds } },
    });

    const missingItems = items.filter((i: any) => !validVariants.some((v: any) => v.id === i.variantId));
    if (missingItems.length > 0) {
      for (const item of missingItems) {
        const product = await (prisma.product as any).findUnique({ where: { id: item.variantId } });
        if (product) {
          const newVariant = await (prisma.productVariant as any).create({
            data: {
              productId: product.id,
              weight: "1kg",
              price: product.basePrice,
              stock: 9999
            }
          });
          item.variantId = newVariant.id;
          validVariants.push(newVariant);
        }
      }
    }

    // Calculate total server-side with fallback to client-sent price if variant missing
    const serverTotal = items.reduce((sum: number, item: any) => {
      const dbVariant = validVariants.find((v: any) => v.id === item.variantId);
      const price = dbVariant ? dbVariant.price : item.price;
      return sum + price * (item.quantity ?? 0);
    }, 0);

    const order = await (prisma.order as any).create({
      data: {
        userId: user!.id,
        shippingName: shipping.name,
        shippingPhone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        pincode: shipping.pincode,
        totalAmount: serverTotal,
        status: "PENDING",
        paymentMethod: "MANUAL",
        items: {
          create: items.map((i: any) => ({
            productVariantId: i.variantId,
            quantity: i.quantity,
            priceAtPurchase: validVariants.find((v: any) => v.id === i.variantId)?.price ?? i.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to place order. Please try again." }, { status: 500 });
  }
}
