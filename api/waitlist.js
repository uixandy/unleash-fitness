/**
 * POST /api/waitlist
 * Body: { email: string, first_name: string, source?: string }
 *
 * Env (Vercel):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)
 *   RESEND_API_KEY
 *   RESEND_FROM                 e.g. UNLEASH <hello@unleash.fitness>
 *   RESEND_NOTIFY_TO            optional inbox for signup pings
 *   RESEND_WAITLIST_SEGMENT_ID  Waitlist segment
 *   RESEND_PRODUCT_TOPIC_ID     Product updates topic
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

async function resend(path, { method = 'GET', body } = {}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { skipped: true }

  const res = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }

  return { ok: res.ok, status: res.status, data }
}

async function upsertWaitlistContact({ email, firstName }) {
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID
  const topicId = process.env.RESEND_PRODUCT_TOPIC_ID

  const createBody = {
    email,
    first_name: firstName,
    unsubscribed: false,
  }
  if (segmentId) createBody.segments = [{ id: segmentId }]
  if (topicId) createBody.topics = [{ id: topicId, subscription: 'opt_in' }]

  const created = await resend('/contacts', { method: 'POST', body: createBody })
  if (created.skipped) return created
  if (created.ok) return { ok: true, id: created.data?.id }

  // Already exists — refresh name + ensure segment/topic
  const existing = await resend(`/contacts/${encodeURIComponent(email)}`)
  const contactId = existing.data?.id
  if (!contactId) {
    console.error('Resend contact upsert failed', created.status, created.data)
    return { ok: false }
  }

  await resend(`/contacts/${contactId}`, {
    method: 'PATCH',
    body: { first_name: firstName },
  })

  if (segmentId) {
    await resend(`/contacts/${contactId}/segments/${segmentId}`, { method: 'POST' })
  }
  if (topicId) {
    await resend(`/contacts/${contactId}/topics`, {
      method: 'PATCH',
      body: [{ id: topicId, subscription: 'opt_in' }],
    })
  }

  return { ok: true, id: contactId }
}

async function fireWaitlistJoined({ email, firstName, source }) {
  return resend('/events/send', {
    method: 'POST',
    body: {
      event: 'waitlist.joined',
      email,
      payload: {
        first_name: firstName,
        source,
      },
    },
  })
}

async function notifyAndy({ firstName, email, source }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM || 'UNLEASH <hello@unleash.fitness>'
  const to = process.env.RESEND_NOTIFY_TO
  if (!apiKey || !to) return { skipped: true }

  return resend('/emails', {
    method: 'POST',
    body: {
      from,
      to: [to],
      subject: `Waitlist: ${firstName} <${email}>`,
      text: `New waitlist signup\n\nName: ${firstName}\nEmail: ${email}\nSource: ${source}\n`,
      html: `<p><strong>New waitlist signup</strong></p>
<ul>
  <li><strong>Name:</strong> ${escapeHtml(firstName)}</li>
  <li><strong>Email:</strong> ${escapeHtml(email)}</li>
  <li><strong>Source:</strong> ${escapeHtml(source)}</li>
</ul>`,
    },
  })
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

  // Resend: contact → Waitlist segment → fire nurture event (welcome + drip)
  try {
    await upsertWaitlistContact({ email, firstName: first_name })
    const eventResult = await fireWaitlistJoined({
      email,
      firstName: first_name,
      source,
    })
    if (eventResult && !eventResult.skipped && !eventResult.ok) {
      console.error('waitlist.joined event failed', eventResult.status, eventResult.data)
    }
    await notifyAndy({ firstName: first_name, email, source })
  } catch (err) {
    console.error('Waitlist Resend error', err)
  }

  return json(res, 201, { ok: true })
}
