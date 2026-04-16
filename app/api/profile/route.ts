import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string; name?: string };
  try {
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

    return NextResponse.json({
      name: user!.name,
      email: user!.email,
      phone: user!.phone || "",
      address: (user as any).address || "",
      city: (user as any).city || "",
      pincode: (user as any).pincode || "",
    });
  } catch {
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string };
  const { name, phone, address, city, pincode } = await req.json();

  try {
    const updatedUser = await (prisma.user as any).update({
      where: { email: sessionUser.email! },
      data: { name, phone, address, city, pincode },
    });

    return NextResponse.json({
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone || "",
      address: updatedUser.address || "",
      city: updatedUser.city || "",
      pincode: updatedUser.pincode || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile. Phone number might already be in use." },
      { status: 500 }
    );
  }
}
