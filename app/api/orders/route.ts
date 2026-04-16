import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { role?: string; email?: string };

  if (sessionUser.role === "ADMIN") {
    try {
      // @ts-ignore TS Prisma typings broken locally
      const data = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true, items: { include: { variant: { include: { product: true } } } } }
      } as any);
      return NextResponse.json(data);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  try {
    let user = await prisma.user.findUnique({ where: { email: sessionUser.email! } });
    if (!user) {
      // Sync user from Supabase to local SQLite to satisfy foreign key required for Orders
      // @ts-ignore
      user = await prisma.user.create({
        data: {
          email: sessionUser.email!,
          name: sessionUser.email!.split("@")[0],
          password: "synced_from_supabase",
          role: "CUSTOMER"
        } as any
      });
    }

    // @ts-ignore TS Prisma typings broken locally
    const data = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { items: { include: { variant: { include: { product: true } } } } }
    } as any);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string; name?: string };
  let user = await prisma.user.findUnique({ where: { email: sessionUser.email! } });
  
  if (!user) {
    // @ts-ignore
    user = await prisma.user.create({
      data: {
        email: sessionUser.email!,
        name: sessionUser.name || sessionUser.email!.split("@")[0],
        password: "synced_from_supabase",
        role: "CUSTOMER"
      } as any
    });
  }

  const { items, shipping, total } = await req.json();
  if (!items?.length) return NextResponse.json({ error: "No items" }, { status: 400 });

  try {
    // SECURITY/VALIDATION: Verify that all variants actually exist locally. 
    // Old localstorage carts might hold deleted variant IDs.
    const variantIds = items.map((i: any) => i.variantId);
    
    // @ts-ignore
    const validVariants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } }
    } as any);

    if (validVariants.length !== variantIds.length) {
       return NextResponse.json({ 
         error: "Some items in your cart are no longer available. Please clear your cart and try again." 
       }, { status: 400 });
    }

    // @ts-ignore TS Prisma typings broken locally
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        shippingName: shipping.name,
        shippingPhone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        pincode: shipping.pincode,
        totalAmount: total,
        status: "PENDING",
        paymentMethod: "MANUAL",
        items: {
          create: items.map((i: any) => ({
            productVariantId: i.variantId,
            quantity: i.quantity,
            priceAtPurchase: i.price
          }))
        }
      } as any,
      include: { items: true }
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
