# OurEarth

A place to anonymously share how climate change has affected your life —
built with Next.js (App Router), Tailwind CSS, Supabase, and Brevo.

## What's new

- **Open-ended impact categories.** The old form only offered 5 fixed
  buttons. It now offers 9 presets plus "Other," which reveals a free-text
  field — so the option set isn't capped at whatever we thought to list.
- **A real review queue at `/admin`.** Submissions land as `pending_review`
  and are invisible to the public until a person approves them. Nothing is
  ever auto-published or auto-emailed straight from the public form.
- **Actual email routing, via Brevo.** From `/admin`, clicking "Send to
  matched recipient" matches a story against a `recipients` directory
  (by named organization, or by category + region) and sends it as a
  transactional email through Brevo — server-side only, gated behind an
  admin secret.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in whatever you have set up so far
npm run dev
```

The site runs at `http://localhost:3000` even with nothing configured — it
falls back to sample stories and simulates a successful submission.

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. This creates:
   - `stories` — public submissions, with row-level security so the anon
     key can insert but can only read stories marked `approved` or `routed`.
   - `recipients` — the routing directory. RLS is enabled with **no**
     policies, so the anon key can't read or write it at all — only the
     service-role key (used server-side) can touch it.
   - A few example rows in `recipients` with fake `@example.gov` addresses.
     **Replace these with real contacts before sending anything for real.**
3. From Project Settings → API, copy into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (used
     by the public site)
   - `SUPABASE_SERVICE_ROLE_KEY` (used only by the admin API routes —
     **never** put this behind `NEXT_PUBLIC_`, and never expose it to the
     browser)

If you already deployed the earlier version of this schema, run the
migration block at the bottom of `supabase/schema.sql` instead of the
whole file.

## Setting up Brevo

1. Create a free account at [brevo.com](https://www.brevo.com).
2. Verify a sender email/domain (Brevo requires this before it'll send).
3. Get an API key from Settings → SMTP & API → API Keys.
4. Add to `.env.local`:
   ```
   BREVO_API_KEY=...
   BREVO_SENDER_EMAIL=you@yourdomain.org
   BREVO_SENDER_NAME=OurEarth
   ```

## Setting up the admin review queue

Set `ADMIN_API_SECRET` in `.env.local` to a long random string — this is a
password, not a real login system. Anyone with it can approve, reject, and
send stories, so treat it like a credential (don't commit it, don't share
it in chat).

Visit `/admin`, enter the secret, and you'll see everything pending
review:
- **Approve** — makes the story visible on the public story wall. Doesn't
  send any email.
- **Send to matched recipient** — looks the story up against
  `recipients`, sends it via Brevo to whoever matches, and marks the
  story `routed`. If nothing matches, it tells you instead of silently
  failing.
- **Reject** — removes it from the queue without publishing or sending.

This is intentionally a manual step for every story. Auto-sending straight
from the public form would mean a false, exaggerated, or malicious
submission could email a real agency or company with no one in the loop —
that's a real liability and trust risk, not just a nice-to-have safeguard.

### How matching works right now

`lib/matchRecipients.js` is rule-based, not a model call:
1. If the submitter named an organization, look for a name match first.
2. Otherwise, match on category + region substring overlap.
3. Otherwise, fall back to recipients with that category and no fixed
   region (e.g. a national body).

This is deliberately simple and auditable. If you want AI involved, the
better place for it is *upstream* — using it to clean up or classify the
free-text story into a clearer category/region before matching — rather
than having a model pick the recipient itself, which would make "why did
this get sent here" much harder to answer.

## Deploying

**GitHub → Vercel**
1. Push this project to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all the environment variables from `.env.example` in the Vercel
   project settings (Production, and Preview if you want the queue to
   work on preview deployments too).
4. Deploy.

You can deploy with only the `NEXT_PUBLIC_SUPABASE_*` vars set (or even
none at all) — the public site still works in fallback/demo mode. The
`/admin` routing features need `SUPABASE_SERVICE_ROLE_KEY`,
`BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, and `ADMIN_API_SECRET` to work.

## Project structure

```
app/
  layout.js, page.js, globals.css
  components/        Nav, Hero, Ticker, StoryWall, HowItWorks,
                      ShareSection, ShareForm, Trust, Footer
  admin/page.js       review queue UI
  api/admin/
    stories/route.js         list pending/approved stories
    update-status/route.js   approve/reject a story
    route-story/route.js     match + send via Brevo, mark as routed
lib/
  supabaseClient.js   public anon client (safe in the browser)
  supabaseAdmin.js    service-role client (server-only)
  matchRecipients.js  rule-based recipient matching
  sendBrevoEmail.js   Brevo API call + email template
  adminAuth.js        shared admin-secret check
  seedStories.js      fallback stories + category labels/colors
supabase/
  schema.sql          stories + recipients tables, RLS policies
```
