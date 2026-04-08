import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/db";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const { data: existing } = await supabaseServer.from("users").select("id").eq("email", email).single();
  if (existing)
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const id = randomBytes(12).toString("hex");

  const { data, error } = await supabaseServer.from("users").insert({ id, name, email, password: hashed, role: "CUSTOMER" }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: data.id, email: data.email }, { status: 201 });
}
