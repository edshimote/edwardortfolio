-- Run only in the dedicated commercial Supabase project.
create table if not exists public.commercial_leads (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null check (length(name) between 1 and 120),
 email text not null check (length(email) between 3 and 160),
 company text, phone text, service text, budget text,
 message text not null check (length(message) between 1 and 4000),
 status text not null default 'new' check (status in ('new','contacted','proposal','accepted','in_progress','delivered','lost')),
 quoted_cents integer not null default 0 check (quoted_cents >= 0),
 received_cents integer not null default 0 check (received_cents >= 0),
 expenses_cents integer not null default 0 check (expenses_cents >= 0),
 due_date date, notes text, notified boolean not null default false
);
alter table public.commercial_leads enable row level security;
revoke all on public.commercial_leads from anon, authenticated;
grant select, insert, update on public.commercial_leads to service_role;
create index if not exists commercial_leads_created_at_idx on public.commercial_leads(created_at desc);
-- No public RLS policy: all access is through server-side routes.
