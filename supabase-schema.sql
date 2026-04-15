-- FORGE Supabase schema
-- Run this in Supabase SQL editor

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  prompt text not null,
  code text not null,
  template text,
  created_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on projects(user_id);

create table if not exists subscriptions (
  user_id text primary key,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive',
  plan text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists generations (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  prompt text not null,
  template text,
  tokens_in int,
  tokens_out int,
  created_at timestamptz not null default now()
);

create index if not exists generations_user_id_idx on generations(user_id);

-- Row-level security (service role bypasses these)
alter table projects enable row level security;
alter table subscriptions enable row level security;
alter table generations enable row level security;
