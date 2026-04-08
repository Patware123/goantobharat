process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import * as dotenv from "dotenv";
dotenv.config();

// Extract project ref from URL
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const projectRef = url.replace("https://", "").replace(".supabase.co", "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const sql = `
create table if not exists users (
  id text primary key,
  name text,
  email text unique not null,
  password text not null,
  role text not null default 'CUSTOMER',
  created_at timestamptz default now()
);

create table if not exists products (
  id text primary key,
  name text not null,
  description text,
  price float not null,
  image text,
  stock int not null default 0,
  created_at timestamptz default now()
);

create table if not exists orders (
  id text primary key,
  user_id text not null references users(id),
  status text not null default 'NEW',
  payment text not null default 'PENDING',
  created_at timestamptz default now()
);

create table if not exists order_items (
  id text primary key,
  order_id text not null references orders(id),
  product_id text not null references products(id),
  quantity int not null,
  price float not null
);
`;

async function run() {
  console.log("Project ref:", projectRef);
  console.log("Running SQL via Supabase Management API...\n");

  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}

run().catch(console.error);
