-- aCaP' Copeaux - premium access schema
-- Base initiale pour authentification, produits, achats et droits d'accès

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key,
  email text unique not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type text not null check (type in ('service','training','resource')),
  active boolean not null default true,
  stripe_price_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  stripe_session_id text unique,
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  amount_cents integer,
  currency text default 'eur',
  created_at timestamptz not null default now()
);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  access_status text not null default 'active' check (access_status in ('active','revoked','expired')),
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  unique(profile_id, product_id)
);

create table if not exists public.module_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  last_section text,
  updated_at timestamptz not null default now(),
  unique(profile_id, product_id)
);

create index if not exists idx_orders_profile_id on public.orders(profile_id);
create index if not exists idx_orders_product_id on public.orders(product_id);
create index if not exists idx_entitlements_profile_id on public.entitlements(profile_id);
create index if not exists idx_entitlements_product_id on public.entitlements(product_id);
create index if not exists idx_module_progress_profile_id on public.module_progress(profile_id);

-- RLS à ajuster lors du branchement réel de l'auth
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;
alter table public.module_progress enable row level security;

-- Policies minimales de lecture par propriétaire
create policy if not exists "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy if not exists "orders_select_own" on public.orders
for select using (auth.uid() = profile_id);

create policy if not exists "entitlements_select_own" on public.entitlements
for select using (auth.uid() = profile_id);

create policy if not exists "module_progress_select_own" on public.module_progress
for select using (auth.uid() = profile_id);
