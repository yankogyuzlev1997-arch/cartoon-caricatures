# Cartoon Caricatures

Production-oriented Bulgarian ecommerce starter for personalized caricatures, built with Next.js App Router, TypeScript, Tailwind CSS, Zod and Supabase.

## Local setup

1. Install Node.js 22+ and pnpm.
2. Copy `.env.example` to `.env.local` and add your Supabase values.
3. Run `pnpm install`, then `pnpm dev`.
4. Open `http://localhost:3000`.

## Supabase

1. Create a new Supabase project in an EU region.
2. Run `supabase/migrations/001_initial.sql` in the SQL editor.
3. Run `supabase/seed.sql`.
4. Create an administrator in Authentication, then insert its user UUID into `admin_profiles`.
5. The migration creates the private `customer-photos` bucket, RLS policies, 10 MB file limit and accepted MIME types. Upload paths should be randomized and begin with the authenticated owner UUID. Generate short-lived signed URLs only in server code.
6. Configure a scheduled deletion job using `business_settings.file_retention_days` (default 90). Soft-mark database file rows before deleting storage objects and audit failures.

Order creation must use a server action or API route with the service-role key. The included `/api/orders` route validates and recalculates prices; extend its success branch with a Supabase transaction/RPC before launch. Add durable rate limiting (Vercel Firewall or Redis) to order, upload, consultation and status endpoints.

## Vercel

Import the repository, choose Next.js, add every variable from `.env.example`, set `NEXT_PUBLIC_SITE_URL` to the production domain and deploy. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Configure CSP, upload rate limits, payment webhooks and transactional email before accepting orders.

## Verification

- `pnpm test` — pricing matrix and bundle discounts
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

The application compiles and passes TypeScript/lint/tests. In the Codex sandbox, Next 16's final prerender worker reports its internal `Expected workStore to be initialized` invariant for the global error route; Turbopack also cannot bind its internal CSS worker port. This is an environment/runtime issue, not a TypeScript or compilation error. Re-run the build in Vercel or a normal local Node 22 environment.

## Launch checklist

- Replace legal placeholders with counsel-approved Bulgarian terms and privacy text.
- Add legal entity, contact, courier and bank details.
- Connect transactional email and payment provider.
- Replace/expand seeded portfolio content with approved client work.
- Complete Supabase persistence in `/api/orders` and signed upload endpoints.
- Test RLS and retention deletion with a staging project.
