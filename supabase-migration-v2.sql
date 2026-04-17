-- FORGE v2 migration: Agency features + cost tracking + webhook hardening

-- Extend generations table with cost tracking and status
ALTER TABLE generations ADD COLUMN IF NOT EXISTS model text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS input_tokens int;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS output_tokens int;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS total_cost_cents int DEFAULT 0;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS status text DEFAULT 'completed' CHECK (status IN ('pending','streaming','completed','failed'));
ALTER TABLE generations ADD COLUMN IF NOT EXISTS code_output text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS completed_at timestamptz;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS template_id text;

-- Rename old columns if they exist (tokens_in → input_tokens already handled by ADD IF NOT EXISTS)

-- Users table for plan tracking + white-label + API key
CREATE TABLE IF NOT EXISTS users (
  clerk_id text PRIMARY KEY,
  email text,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free','pro','agency')),
  stripe_customer_id text,
  white_label_logo_url text,
  white_label_brand_name text,
  white_label_primary_color text,
  api_key text UNIQUE,
  api_key_created_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Agency clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_user_id text NOT NULL REFERENCES users(clerk_id),
  name text NOT NULL,
  email text,
  company text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS clients_agency_user_id_idx ON clients(agency_user_id);

-- Agency client projects
CREATE TABLE IF NOT EXISTS client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  prompt text,
  code_output text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS client_projects_client_id_idx ON client_projects(client_id);

-- Scheduled builds
CREATE TABLE IF NOT EXISTS scheduled_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES users(clerk_id),
  name text NOT NULL,
  prompt text NOT NULL,
  cron_expression text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  last_run_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS scheduled_builds_user_id_idx ON scheduled_builds(user_id);

-- Stripe event idempotency
CREATE TABLE IF NOT EXISTS stripe_events (
  id text PRIMARY KEY,
  event_type text NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);

-- Newsletter subscribers (double opt-in)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  confirmed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS newsletter_email_idx ON newsletter_subscribers(email);

-- Referral codes (Agency only)
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES users(clerk_id),
  code text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS referrals_user_id_idx ON referrals(user_id);

-- RLS on new tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
