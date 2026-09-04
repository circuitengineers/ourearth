-- Run this in the Supabase SQL editor to set up OurEarth's data.

create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  story_code text unique not null,
  quote text not null,
  region text not null,
  category text not null check (category in ('drought', 'flood', 'heat', 'fire', 'storm')),
  organization text,
  context text,
  status text not null default 'pending_review'
    check (status in ('pending_review', 'approved', 'routed', 'rejected')),
  routed_to text[],
  created_at timestamptz not null default now()
);

alter table stories enable row level security;

-- Anyone (including anonymous visitors) can submit a story.
create policy "Anyone can submit a story"
  on stories for insert
  to anon
  with check (true);

-- Only approved stories are readable by the public site.
create policy "Public can read approved stories"
  on stories for select
  to anon
  using (status = 'approved');

-- Reviewing, routing, and rejecting stories should happen from a
-- trusted context (e.g. a Supabase service-role key in an admin
-- tool or a server-side route), not from the anon key used here.
