import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bucketName = "products";
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // Upload to Supabase Storage
    let { data, error } = await supabaseServer.storage
      .from(bucketName)
      .upload(filename, file, { upsert: true, contentType: file.type });

    // If bucket doesn't exist, create it and retry
    if (error && error.message.includes("Bucket not found")) {
      await supabaseServer.storage.createBucket(bucketName, { public: true });
      const retryResult = await supabaseServer.storage
        .from(bucketName)
        .upload(filename, file, { upsert: true, contentType: file.type });
      
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabaseServer.storage
      .from(bucketName)
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
