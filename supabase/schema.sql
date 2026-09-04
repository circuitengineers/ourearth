-- Run this in the Supabase SQL editor to set up OurEarth's data.
-- Safe to run on a fresh project. If you already ran an earlier version
-- of this file, see the migration notes at the bottom instead.

create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  story_code text unique not null,
  quote text not null,
  region text not null,
  category text not null check (category in (
    'drought', 'flood', 'heat', 'fire', 'storm',
    'sea_level', 'water_contamination', 'crop_failure',
    'displacement', 'other'
  )),
  custom_category text,
  organization text,
  context text,
  status text not null default 'pending_review'
    check (status in ('pending_review', 'approved', 'routed', 'rejected')),
  routed_to text[],
  created_at timestamptz not null default now()
);

alter table stories enable row level security;

create policy "Anyone can submit a story"
  on stories for insert
  to anon
  with check (true);

create policy "Public can read approved stories"
  on stories for select
  to anon
  using (status in ('approved', 'routed'));

-- Recipients directory used for routing stories to the right office.
-- No RLS policies are defined here on purpose: with RLS enabled and no
-- policies, the anon key can't read or write this table at all — only
-- the service-role key (used server-side in the admin API routes) can.
create table if not exists recipients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  region text,
  categories text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table recipients enable row level security;

-- Example recipients — replace these with real contacts before sending
-- anything for real. Delete or edit these rows in the table editor.
insert into recipients (name, email, region, categories) values
  ('Example Environmental Agency', 'routing-test@example.gov', 'Oregon', array['fire', 'water_contamination']),
  ('Example Coastal Council', 'routing-test@example.gov', 'Pacific', array['sea_level', 'storm']),
  ('Example Agricultural Board', 'routing-test@example.gov', null, array['drought', 'crop_failure']);

-- Migration notes, if you ran the original version of this file already:
--   alter table stories add column if not exists custom_category text;
--   alter table stories drop constraint if exists stories_category_check;
--   alter table stories add constraint stories_category_check check (category in (
--     'drought', 'flood', 'heat', 'fire', 'storm',
--     'sea_level', 'water_contamination', 'crop_failure', 'displacement', 'other'
--   ));
--   drop policy if exists "Public can read approved stories" on stories;
--   create policy "Public can read approved stories" on stories for select to anon
--     using (status in ('approved', 'routed'));
--   -- then run the "create table if not exists recipients..." block above.
