import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/db";
import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { role?: string; email?: string };

  if (sessionUser.role === "ADMIN") {
    const { data, error } = await supabaseServer
      .from("orders")
      .select("*, users(name, email), order_items(*, products(*))")
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data: user } = await supabaseServer.from("users").select("id").eq("email", sessionUser.email!).single();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { data, error } = await supabaseServer
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string };
  const { data: user } = await supabaseServer.from("users").select("id").eq("email", sessionUser.email!).single();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { items } = await req.json() as { items: { productId: string; quantity: number }[] };
  if (!items?.length) return NextResponse.json({ error: "No items" }, { status: 400 });

  const orderId = randomBytes(12).toString("hex");
  const { error: orderError } = await supabaseServer.from("orders").insert({ id: orderId, user_id: user.id, status: "NEW", payment: "PENDING" });
  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 });

  const productIds = items.map((i) => i.productId);
  const { data: products } = await supabaseServer.from("products").select("id, price").in("id", productIds);

  const orderItems = items.map((i) => {
    const product = products?.find((p) => p.id === i.productId);
    return { id: randomBytes(12).toString("hex"), order_id: orderId, product_id: i.productId, quantity: i.quantity, price: product?.price ?? 0 };
  });

  const { error: itemsError } = await supabaseServer.from("order_items").insert(orderItems);
  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 });

  const { data: order } = await supabaseServer.from("orders").select("*, order_items(*)").eq("id", orderId).single();
  return NextResponse.json(order, { status: 201 });
}
