# Resend — UNLEASH waitlist

## What’s live in Resend

| Piece | Name / ID |
|---|---|
| Segment | **Waitlist** `e3e1cd44-a27c-4980-a50a-cd49974884ef` |
| Topic | **Product updates** `f84dc026-b7d0-4c6f-aa18-1d85b7e27ddd` |
| Event | `waitlist.joined` |
| Automation | **Waitlist nurture** (enabled) |

### Nurture sequence

Triggered when someone joins the waitlist (`waitlist.joined`):

1. **Immediate** — Welcome / you’re on the list  
2. **+3 days** — What UNLEASH is (Train. Eat. Progress.)  
3. **+4 days** — Free vs Pro  
4. **+7 days** — Check-in / you’re early  

Edit copy anytime in Resend → **Templates** (aliases `waitlist-welcome`, `waitlist-nurture-product`, `waitlist-nurture-pro`, `waitlist-nurture-checkin`). Re-publish after edits.

Re-run setup (idempotent):

```bash
node scripts/setup-resend.mjs
```

## Occasional feature / status emails

Use **Broadcasts** (not the nurture automation):

1. Resend → **Broadcasts** → New  
2. Segment: **Waitlist**  
3. Topic: **Product updates** (respects unsubscribes)  
4. From: `UNLEASH <hello@unleash.fitness>`  
5. Write the update → Send (or schedule)

Optional shell template alias: `broadcast-update-shell` (variables `UPDATE_TITLE`, `UPDATE_BODY_HTML`, `CTA_LABEL`, `CTA_HREF`).

## Vercel env (required for production)

```
RESEND_API_KEY=re_…
RESEND_FROM=UNLEASH <hello@unleash.fitness>
RESEND_NOTIFY_TO=you@example.com
RESEND_WAITLIST_SEGMENT_ID=e3e1cd44-a27c-4980-a50a-cd49974884ef
RESEND_PRODUCT_TOPIC_ID=f84dc026-b7d0-4c6f-aa18-1d85b7e27ddd
```

After signup the API: saves to Supabase → creates/updates Resend contact on Waitlist → fires `waitlist.joined` → nurture runs.
