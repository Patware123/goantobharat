import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const cuid = () => randomBytes(12).toString("hex");

async function main() {
  // Admin user
  const { data: existing } = await supabase.from("users").select("id").eq("email", "admin@shop.com").single();
  if (!existing) {
    const password = await bcrypt.hash("admin123", 10);
    await supabase.from("users").insert({ id: cuid(), name: "Admin", email: "admin@shop.com", password, role: "ADMIN" });
    console.log("✓ Admin created: admin@shop.com / admin123");
  } else {
    console.log("✓ Admin already exists");
  }

  // Sample products
  const products = [
    { name: "Wireless Headphones", description: "High quality sound with noise cancellation.", price: 79.99, stock: 20 },
    { name: "Mechanical Keyboard", description: "Tactile switches, RGB backlight.", price: 49.99, stock: 15 },
    { name: "USB-C Hub", description: "7-in-1 hub with HDMI, USB 3.0, SD card.", price: 29.99, stock: 30 },
  ];

  for (const p of products) {
    const { data: exists } = await supabase.from("products").select("id").eq("name", p.name).single();
    if (!exists) {
      await supabase.from("products").insert({ id: cuid(), ...p });
      console.log(`✓ Product: ${p.name}`);
    }
  }

  console.log("Seed complete.");
}

main().catch(console.error);
