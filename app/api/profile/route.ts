import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string; name?: string };
  try {
    let user = await prisma.user.findUnique({ where: { email: sessionUser.email! } });
    if (!user) {
      // Sync from Supabase session if they registered there but are querying local db for the first time
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

    return NextResponse.json({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionUser = session.user as { email?: string };
  const { name, phone } = await req.json();

  try {
    // Only update name and phone. Email is constrained by auth flow.
    // @ts-ignore
    const updatedUser = await prisma.user.update({
      where: { email: sessionUser.email! },
      data: {
        name,
        phone,
      } as any
    });

    return NextResponse.json({
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone || "",
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update profile. Phone number might be already in use." }, { status: 500 });
  }
}
