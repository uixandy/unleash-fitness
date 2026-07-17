# UNLEASH Marketing Site — Change Log

Most recent at the top.

---

## 2026-07-17

### Resend waitlist (production)

- **Nurture automation** — Segment Waitlist, topic Product updates, event `waitlist.joined`, 4-step sequence (welcome → +3d product → +4d Pro → +7d check-in). Setup script: `scripts/setup-resend.mjs`.
- **API** — `api/waitlist.js` upserts Resend contact, adds to Waitlist segment, fires `waitlist.joined`, optional notify email. Signup still succeeds if Resend fails.
- **Vercel env (Unleash Fitness team)** — Production + Preview:
  - `RESEND_*` (API key, from `hello@unleash.fitness`, segment/topic IDs)
  - `RESEND_NOTIFY_TO=andy@unleash.fitness` (not wowdesign — separate inbox)
  - `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- **Verified** — `POST /api/waitlist` returns 201 on www.unleash.fitness after redeploy.
- Docs: `docs/RESEND.md` (broadcasts + env).

### Landing polish (earlier same arc)

- Cinematic landing: Hero, Product, sticky Features, Pro, Footer; dark/light theme.
- Official claw SVG lockups; waitlist form first name + email; UNLEASH voice copy (Train / Eat / Progress).
