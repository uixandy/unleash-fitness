/**
 * One-shot Resend setup for UNLEASH waitlist nurture + broadcasts.
 * Usage: node scripts/setup-resend.mjs
 * Requires: RESEND_API_KEY in env (or .env)
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnv() {
  const path = resolve(process.cwd(), '.env')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    const val = m[2].trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv()

const API = 'https://api.resend.com'
const KEY = process.env.RESEND_API_KEY
const FROM = process.env.RESEND_FROM || 'UNLEASH <hello@unleash.fitness>'

if (!KEY) {
  console.error('Missing RESEND_API_KEY')
  process.exit(1)
}

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }
  if (!res.ok) {
    const err = new Error(`${method} ${path} → ${res.status}: ${text}`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

function shell({ title, bodyHtml, ctaLabel, ctaHref }) {
  return `<!DOCTYPE html>
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
            <td style="font-size:26px;font-weight:700;line-height:1.15;color:#F0F0EE;padding-bottom:14px;">
              ${title}
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;line-height:1.65;color:#7AA09A;padding-bottom:24px;">
              ${bodyHtml}
            </td>
          </tr>
          ${
            ctaLabel
              ? `<tr>
            <td style="padding-bottom:28px;">
              <a href="${ctaHref}" style="display:inline-block;background:#FF5A1F;color:#080E0C;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:8px;">
                ${ctaLabel}
              </a>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="font-size:13px;line-height:1.5;color:#4E7870;border-top:1px solid #243830;padding-top:18px;">
              — UNLEASH<br />
              <a href="https://unleash.fitness" style="color:#FF5A1F;text-decoration:none;">unleash.fitness</a>
              &nbsp;·&nbsp;
              <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#4E7870;text-decoration:underline;">Unsubscribe</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

const TEMPLATES = [
  {
    alias: 'waitlist-welcome',
    name: 'Waitlist — Welcome',
    subject: "You're on the UNLEASH waitlist",
    html: shell({
      title: "You're on the list, {{{USER_FIRST_NAME}}}.",
      bodyHtml: `We'll email you when launch and Pro open up. No spam — just the real updates.<br /><br />Train. Eat. Progress. One place.`,
      ctaLabel: 'See the product',
      ctaHref: 'https://unleash.fitness/#product',
    }),
  },
  {
    alias: 'waitlist-nurture-product',
    name: 'Waitlist — What UNLEASH is',
    subject: 'Train. Eat. Progress. One tracker.',
    html: shell({
      title: 'Built for people who actually lift.',
      bodyHtml: `Hey {{{USER_FIRST_NAME}}} — UNLEASH tracks sessions, recipes, meal planning, and charts in one spare app.<br /><br />No fluff. No vanity dashboards. Just the work.`,
      ctaLabel: 'Scroll the story',
      ctaHref: 'https://unleash.fitness/#features',
    }),
  },
  {
    alias: 'waitlist-nurture-pro',
    name: 'Waitlist — Free vs Pro',
    subject: 'Free feels complete. Unleash Pro.',
    html: shell({
      title: 'Free feels complete.',
      bodyHtml: `Advanced programming stays free — including manual recipes and meal planning.<br /><br />Pro unlocks library breadth, longer analytics, and AI recipe import. Price isn’t set yet — you’re already on the list.`,
      ctaLabel: 'See Free vs Pro',
      ctaHref: 'https://unleash.fitness/#pro',
    }),
  },
  {
    alias: 'waitlist-nurture-checkin',
    name: 'Waitlist — Check-in',
    subject: 'Still building. You’re early.',
    html: shell({
      title: 'Still building. You’re early.',
      bodyHtml: `Hey {{{USER_FIRST_NAME}}} — we’re shipping in public. When something big lands (launch, Pro, new features), you’ll hear it here first.<br /><br />Reply to this email anytime. We read it.`,
      ctaLabel: 'Back to UNLEASH',
      ctaHref: 'https://unleash.fitness',
    }),
  },
  {
    alias: 'broadcast-update-shell',
    name: 'Broadcast — Feature / status update',
    subject: 'UNLEASH update',
    html: shell({
      title: '{{{UPDATE_TITLE}}}',
      bodyHtml: `{{{UPDATE_BODY_HTML}}}`,
      ctaLabel: '{{{CTA_LABEL}}}',
      ctaHref: '{{{CTA_HREF}}}',
    }),
  },
]

async function ensureSegment(name) {
  const list = await api('GET', '/segments')
  const found = (list.data || []).find((s) => s.name === name)
  if (found) {
    console.log(`Segment exists: ${name} (${found.id})`)
    return found.id
  }
  const created = await api('POST', '/segments', { name })
  console.log(`Segment created: ${name} (${created.id})`)
  return created.id
}

async function ensureTopic() {
  const list = await api('GET', '/topics')
  const found = (list.data || []).find((t) => t.name === 'Product updates')
  if (found) {
    console.log(`Topic exists: Product updates (${found.id})`)
    return found.id
  }
  const created = await api('POST', '/topics', {
    name: 'Product updates',
    description: 'Launch, Pro, and feature status emails from UNLEASH',
    default_subscription: 'opt_in',
    visibility: 'public',
  })
  console.log(`Topic created: Product updates (${created.id})`)
  return created.id
}

async function ensureEvent() {
  const name = 'waitlist.joined'
  try {
    const existing = await api('GET', `/events/${encodeURIComponent(name)}`)
    console.log(`Event exists: ${name} (${existing.id || name})`)
    return name
  } catch (e) {
    if (e.status !== 404) throw e
  }
  const created = await api('POST', '/events', {
    name,
    schema: {
      first_name: 'string',
      source: 'string',
    },
  })
  console.log(`Event created: ${name} (${created.id || name})`)
  return name
}

async function ensureTemplate(def) {
  const list = await api('GET', '/templates')
  const found = (list.data || []).find((t) => t.alias === def.alias || t.name === def.name)
  const variables = [
    { key: 'USER_FIRST_NAME', type: 'string', fallbackValue: 'there' },
  ]
  if (def.alias === 'broadcast-update-shell') {
    variables.push(
      { key: 'UPDATE_TITLE', type: 'string', fallbackValue: 'UNLEASH update' },
      { key: 'UPDATE_BODY_HTML', type: 'string', fallbackValue: 'More soon.' },
      { key: 'CTA_LABEL', type: 'string', fallbackValue: 'Open UNLEASH' },
      { key: 'CTA_HREF', type: 'string', fallbackValue: 'https://unleash.fitness' },
    )
  }

  const payload = {
    name: def.name,
    alias: def.alias,
    from: FROM,
    subject: def.subject,
    html: def.html,
    variables,
  }

  let id
  if (found) {
    id = found.id
    await api('PATCH', `/templates/${id}`, payload)
    console.log(`Template updated: ${def.alias} (${id})`)
  } else {
    const created = await api('POST', '/templates', payload)
    id = created.id
    console.log(`Template created: ${def.alias} (${id})`)
  }

  await api('POST', `/templates/${id}/publish`)
  console.log(`Template published: ${def.alias}`)
  return id
}

async function ensureAutomation(templateIds) {
  const name = 'Waitlist nurture'
  const list = await api('GET', '/automations')
  const existing = (list.data || []).find((a) => a.name === name)
  if (existing) {
    // Replace graph so sequence stays current
    await api('PATCH', `/automations/${existing.id}`, {
      status: 'enabled',
      steps: nurtureSteps(templateIds),
      connections: nurtureConnections(),
    })
    console.log(`Automation updated + enabled: ${name} (${existing.id})`)
    return existing.id
  }

  const created = await api('POST', '/automations', {
    name,
    status: 'enabled',
    steps: nurtureSteps(templateIds),
    connections: nurtureConnections(),
  })
  console.log(`Automation created + enabled: ${name} (${created.id})`)
  return created.id
}

function nurtureSteps(ids) {
  return [
    {
      key: 'start',
      type: 'trigger',
      config: { event_name: 'waitlist.joined' },
    },
    {
      key: 'welcome',
      type: 'send_email',
      config: {
        from: FROM,
        subject: "You're on the UNLEASH waitlist",
        template: {
          id: ids.welcome,
          variables: { USER_FIRST_NAME: '{{event.first_name}}' },
        },
      },
    },
    { key: 'wait_3d', type: 'delay', config: { duration: '3 days' } },
    {
      key: 'product',
      type: 'send_email',
      config: {
        from: FROM,
        subject: 'Train. Eat. Progress. One tracker.',
        template: {
          id: ids.product,
          variables: { USER_FIRST_NAME: '{{event.first_name}}' },
        },
      },
    },
    { key: 'wait_7d', type: 'delay', config: { duration: '4 days' } },
    {
      key: 'pro',
      type: 'send_email',
      config: {
        from: FROM,
        subject: 'Free feels complete. Unleash Pro.',
        template: {
          id: ids.pro,
          variables: { USER_FIRST_NAME: '{{event.first_name}}' },
        },
      },
    },
    { key: 'wait_14d', type: 'delay', config: { duration: '7 days' } },
    {
      key: 'checkin',
      type: 'send_email',
      config: {
        from: FROM,
        subject: 'Still building. You’re early.',
        template: {
          id: ids.checkin,
          variables: { USER_FIRST_NAME: '{{event.first_name}}' },
        },
      },
    },
  ]
}

function nurtureConnections() {
  return [
    { from: 'start', to: 'welcome' },
    { from: 'welcome', to: 'wait_3d' },
    { from: 'wait_3d', to: 'product' },
    { from: 'product', to: 'wait_7d' },
    { from: 'wait_7d', to: 'pro' },
    { from: 'pro', to: 'wait_14d' },
    { from: 'wait_14d', to: 'checkin' },
  ]
}

async function main() {
  console.log('Setting up Resend for UNLEASH…')
  console.log(`From: ${FROM}`)

  const segmentId = await ensureSegment('Waitlist')
  const topicId = await ensureTopic()
  await ensureEvent()

  const welcome = await ensureTemplate(TEMPLATES[0])
  const product = await ensureTemplate(TEMPLATES[1])
  const pro = await ensureTemplate(TEMPLATES[2])
  const checkin = await ensureTemplate(TEMPLATES[3])
  const broadcast = await ensureTemplate(TEMPLATES[4])

  const automationId = await ensureAutomation({ welcome, product, pro, checkin })

  const summary = {
    from: FROM,
    segmentId,
    topicId,
    automationId,
    event: 'waitlist.joined',
    templates: {
      welcome,
      product,
      pro,
      checkin,
      broadcast,
    },
  }

  console.log('\nDone.\n')
  console.log(JSON.stringify(summary, null, 2))
  console.log(`
Next:
1. Waitlist API fires event waitlist.joined after signup
2. Nurture runs: welcome → +3d product → +4d pro → +7d check-in
3. Occasional updates: Resend → Broadcasts → segment Waitlist + topic Product updates
`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
