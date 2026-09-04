# OurEarth

A place to anonymously share how climate change has affected your life —
built with Next.js (App Router), Tailwind CSS, and Supabase.

## What changed from the single-page demo

- The hero illustration now leans green (moss/forest tones) instead of gold.
- There's one call to action ("Share your story") instead of two competing
  buttons — the old "Share anonymously" button is gone; anonymity is now
  explained as supporting copy instead of a second CTA.
- Fixed the low-contrast button (dark text on a dark background).
- Fonts are unchanged: Fraunces for display type, Public Sans for body text —
  now loaded through `next/font` instead of a CDN link.
- The story wall and submission form are wired to Supabase, with a graceful
  fallback to sample stories if Supabase isn't configured yet.

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project values
npm run dev
```

The site runs at `http://localhost:3000` even without Supabase configured —
it falls back to sample stories and simulates a successful submission so you
can see the full flow.

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the contents of `supabase/schema.sql`. This creates
   a `stories` table with row-level security: anyone can submit a story, but
   only stories marked `approved` are publicly readable.
3. In your Supabase project settings, copy the **Project URL** and **anon
   public key** into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. New submissions land with `status = 'pending_review'`. Review and approve
   them (e.g. from the Supabase table editor, or a future admin tool using a
   service-role key) before they appear on the public story wall — the anon
   key intentionally cannot self-approve, so a real person stays in the loop
   before anything is published or emailed out.

The actual "send to authorities" email step (matching a story to a
recipient directory and sending it) isn't included yet — that needs its own
review step and is worth building as a server-side function (e.g. a Supabase
Edge Function or a Vercel serverless function) rather than something the
public anon key can trigger directly, so a bad submission can't auto-email a
real person or agency without a human checking it first.

## Deploying

**GitHub → Vercel**
1. Push this project to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in the Vercel
   project settings.
4. Deploy — Vercel detects Next.js automatically.

## Project structure

```
app/
  layout.js          root layout, fonts, metadata
  page.js            assembles the page from components
  globals.css        base styles + ticker animation
  components/        Nav, Hero, Ticker, StoryWall, HowItWorks,
                      ShareSection, ShareForm, Trust, Footer
lib/
  supabaseClient.js  Supabase client (null-safe if unconfigured)
  seedStories.js     fallback stories + category label/color maps
supabase/
  schema.sql         table definition + row-level security policies
```
