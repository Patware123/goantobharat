import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description, price, image, stock, weight } = await req.json();
  if (!name || price == null)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  try {
    const data = await prisma.product.create({
      data: {
        name,
        description,
        basePrice: Number(price),
        image,
        category: "uncategorized",
        variants: {
          create: [{
            weight: weight || "1kg",
            price: Number(price),
            stock: Number(stock) || 0,
          }]
        }
      } as any
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
