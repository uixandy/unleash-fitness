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
- `RESEND_API_KEY` — Resend API key
- `RESEND_FROM` — e.g. `UNLEASH <hello@unleash.fitness>` (domain must be verified in Resend)
- `RESEND_NOTIFY_TO` — optional inbox for signup pings

On success: row in `marketing_waitlist`, welcome email to the joiner, optional notify to you.
Resend failures do not fail the signup.

## Deploy

Connected to Vercel from this GitHub repo. Domain: `unleash.fitness`.
