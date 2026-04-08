import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/db";
import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function GET() {
  const { data, error } = await supabaseServer.from("products").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description, price, image, stock } = await req.json();
  if (!name || price == null)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const id = randomBytes(12).toString("hex");
  const { data, error } = await supabaseServer.from("products").insert({ id, name, description, price: Number(price), image, stock: Number(stock) || 0 }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}
