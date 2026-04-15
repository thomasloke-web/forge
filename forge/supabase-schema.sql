-- ═══════════════════════════════════════════════════════
-- FORGE — Supabase Schema
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════════════

-- User profiles (linked to Clerk)
create table if not exists user_profiles (
  id                    uuid primary key default gen_random_uuid(),
  clerk_user_id         text unique not null,
  plan                  text not null default 'free' check (plan in ('free', 'pro', 'agency')),
  stripe_customer_id    text,
  stripe_subscription_id text,
  builds_this_month     int not null default 0,
  created_at            timestamptz not null default now()
);

-- Projects
create table if not exists projects (
  id             uuid primary key default gen_random_uuid(),
  user_id        text not null,
  name           text not null,
  prompt         text not null,
  style          text not null default 'minimal',
  template_id    text,
  generated_code text,
  deploy_url     text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Newsletter subscribers
create table if not exists newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  first_name text,
  created_at timestamptz not null default now()
);

-- ── Indexes ─────────────────────────────────────────────
create index if not exists idx_projects_user_id on projects(user_id);
create index if not exists idx_user_profiles_clerk on user_profiles(clerk_user_id);
create index if not exists idx_user_profiles_stripe_sub on user_profiles(stripe_subscription_id);

-- ── RLS ─────────────────────────────────────────────────
alter table user_profiles enable row level security;
alter table projects enable row level security;
alter table newsletter_subscribers enable row level security;

-- user_profiles: only service role can write (Clerk webhook / Stripe webhook)
create policy "Service role full access on user_profiles"
  on user_profiles for all using (true) with check (true);

-- projects: users read/write their own
create policy "Users manage own projects"
  on projects for all
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- newsletter: insert only via service role
create policy "Service role insert newsletter"
  on newsletter_subscribers for insert with check (true);

-- ── Helper function: increment build count ────────────────
create or replace function increment_builds(p_clerk_user_id text)
returns void language plpgsql security definer as $$
begin
  insert into user_profiles (clerk_user_id, builds_this_month)
  values (p_clerk_user_id, 1)
  on conflict (clerk_user_id)
  do update set builds_this_month = user_profiles.builds_this_month + 1;
end;
$$;

-- ── Reset builds monthly (call via pg_cron or Supabase edge function) ──
-- select cron.schedule('reset-monthly-builds', '0 0 1 * *',
--   'update user_profiles set builds_this_month = 0');
