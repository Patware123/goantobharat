import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const sessionUser = session.user as { role?: string; email?: string };

  try {
    const data = await (prisma.order as any).findUnique({
      where: { id },
      include: { user: true, items: { include: { variant: { include: { product: true } } } } },
    });
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Non-admins can only view their own orders
    if (sessionUser.role !== "ADMIN" && data.user?.email !== sessionUser.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const VALID_STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

  try {
    const { status } = await req.json();
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const data = await prisma.order.update({ where: { id }, data: { status } });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
