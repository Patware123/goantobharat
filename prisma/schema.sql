-- Run this in Supabase Dashboard > SQL Editor

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
