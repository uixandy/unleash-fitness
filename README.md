# UNLEASH Marketing Site

Marketing site for [UNLEASH Workout Tracker](https://app.unleash.fitness).

- **Live app:** https://app.unleash.fitness  
- **This site:** waitlist + product story (no Stripe checkout yet)

## Local

```bash
npm install
npm run dev
```

Open in Cursor browser → Design Mode (`Ctrl+Shift+D`) to iterate visually.

## Screenshots

See [public/screenshots/README.md](public/screenshots/README.md).

## Waitlist API

`POST /api/waitlist` with `{ "email": "…", "first_name": "…", "source": "marketing" }`.

Requires Vercel env:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM` — e.g. `UNLEASH <hello@unleash.fitness>`
- `RESEND_NOTIFY_TO` — signup pings (`andy@unleash.fitness`)
- `RESEND_WAITLIST_SEGMENT_ID`
- `RESEND_PRODUCT_TOPIC_ID`

On success: Supabase row + Resend contact on **Waitlist** + `waitlist.joined` event (nurture automation).

Full email setup: [docs/RESEND.md](docs/RESEND.md). Re-seed Resend: `node scripts/setup-resend.mjs`.

## Deploy

Connected to Vercel from this GitHub repo. Domain: `unleash.fitness`.
