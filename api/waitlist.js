/**
 * POST /api/waitlist
 * Body: { email: string, first_name: string, source?: string }
 *
 * Env (Vercel):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)
 *   RESEND_API_KEY
 *   RESEND_FROM          e.g. "UNLEASH <hello@unleash.fitness>"
 *   RESEND_NOTIFY_TO     optional — your inbox for signup pings
 */

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320
}

function normalizeFirstName(value) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, ' ').slice(0, 80)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function sendResendEmail({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM || 'UNLEASH <onboarding@resend.dev>'
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping email')
    return { skipped: true }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('Resend send failed', res.status, errText)
    return { ok: false, status: res.status, error: errText }
  }

  const data = await res.json().catch(() => ({}))
  return { ok: true, id: data.id }
}

function welcomeEmail(firstName) {
  const name = escapeHtml(firstName)
  const subject = "You're on the UNLEASH waitlist"
  const text = `Hey ${firstName},

You're on the UNLEASH waitlist. We'll email you when launch and Pro open up.

No spam — just the real updates.

— UNLEASH
https://unleash.fitness`

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#080E0C;color:#F0F0EE;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#080E0C;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:520px;background:#0D1612;border:1px solid #243830;border-radius:12px;padding:32px 28px;">
          <tr>
            <td style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#00A896;padding-bottom:16px;">
              UNLEASH
            </td>
          </tr>
          <tr>
            <td style="font-size:28px;font-weight:700;line-height:1.15;color:#F0F0EE;padding-bottom:12px;">
              You're on the list, ${name}.
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;line-height:1.6;color:#7AA09A;padding-bottom:24px;">
              We'll email you when launch and Pro open up. No spam — just the real updates.
            </td>
          </tr>
          <tr>
            <td style="font-size:14px;line-height:1.5;color:#4E7870;">
              — UNLEASH<br />
              <a href="https://unleash.fitness" style="color:#FF5A1F;text-decoration:none;">unleash.fitness</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html, text }
}

function notifyEmail({ firstName, email, source }) {
  const subject = `Waitlist: ${firstName} <${email}>`
  const text = `New waitlist signup

Name: ${firstName}
Email: ${email}
Source: ${source}
`

  const html = `<p><strong>New waitlist signup</strong></p>
<ul>
  <li><strong>Name:</strong> ${escapeHtml(firstName)}</li>
  <li><strong>Email:</strong> ${escapeHtml(email)}</li>
  <li><strong>Source:</strong> ${escapeHtml(source)}</li>
</ul>`

  return { subject, html, text }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' })
  }

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / SUPABASE_ANON_KEY')
    return json(res, 500, { error: 'Server not configured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return json(res, 400, { error: 'Invalid JSON' })
    }
  }

  const email = String(body?.email || '').trim().toLowerCase()
  const first_name = normalizeFirstName(body?.first_name)
  const source = String(body?.source || 'marketing').slice(0, 64)

  if (!first_name) {
    return json(res, 400, { error: 'First name required' })
  }

  if (!isValidEmail(email)) {
    return json(res, 400, { error: 'Invalid email' })
  }

  const insertRes = await fetch(`${url}/rest/v1/marketing_waitlist`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ email, first_name, source }),
  })

  if (insertRes.status === 409 || insertRes.status === 23505) {
    return json(res, 409, { code: 'duplicate', error: 'Already on waitlist' })
  }

  if (!insertRes.ok) {
    const errText = await insertRes.text()
    if (errText.includes('duplicate') || errText.includes('unique') || insertRes.status === 409) {
      return json(res, 409, { code: 'duplicate', error: 'Already on waitlist' })
    }
    console.error('Waitlist insert failed', insertRes.status, errText)
    return json(res, 500, { error: 'Could not join waitlist' })
  }

  // Emails are best-effort — signup already succeeded
  try {
    const welcome = welcomeEmail(first_name)
    await sendResendEmail({
      to: email,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
    })

    const notifyTo = process.env.RESEND_NOTIFY_TO
    if (notifyTo) {
      const notify = notifyEmail({ firstName: first_name, email, source })
      await sendResendEmail({
        to: notifyTo,
        subject: notify.subject,
        html: notify.html,
        text: notify.text,
      })
    }
  } catch (err) {
    console.error('Waitlist email error', err)
  }

  return json(res, 201, { ok: true })
}
