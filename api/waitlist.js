/**
 * POST /api/waitlist
 * Body: { email: string, first_name?: string, source?: string }
 *
 * Env (Vercel): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
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
  // Prefer service role; anon works too (RLS allows INSERT only)
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

  // PostgREST unique violation often returns 409 with JSON body
  if (!insertRes.ok) {
    const errText = await insertRes.text()
    if (errText.includes('duplicate') || errText.includes('unique') || insertRes.status === 409) {
      return json(res, 409, { code: 'duplicate', error: 'Already on waitlist' })
    }
    console.error('Waitlist insert failed', insertRes.status, errText)
    return json(res, 500, { error: 'Could not join waitlist' })
  }

  return json(res, 201, { ok: true })
}
