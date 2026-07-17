import WaitlistForm from './WaitlistForm'

const FREE = [
  'Workout logging with supersets & rest timers',
  '2 saved plans · 15 custom exercises',
  '30-day progress analytics',
  'Machine + basic bodyweight library',
  'Manual recipes & meal planning',
]

const PRO = [
  'Full exercise library',
  'Unlimited plans & custom exercises',
  '90-day / all-time analytics',
  'AI recipe import (URL + photo)',
  'AI Coach (when ready)',
  'Health app export',
]

export default function ProTeaser() {
  return (
    <section
      id="pro"
      className="relative section-pad border-t border-[var(--border)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-55">
        <img
          src="/images/lifestyle-barbell.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(8,14,12,0.88) 0%, rgba(8,14,12,0.55) 45%, rgba(8,14,12,0.4) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <p className="section-label">Coming soon</p>
        <h2 className="text-3xl sm:text-4xl max-w-xl leading-tight">
          Free feels complete. Pro goes further.
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-xl leading-relaxed">
          From our GTM plan: advanced programming stays free. Pro unlocks library breadth,
          longer analytics, and AI. Pricing isn’t set — join the waitlist to hear first.
        </p>

        <div className="mt-12 max-w-3xl tier-compare">
          <div className="tier-panel">
            <div className="tier-head">
              <p className="label" style={{ marginBottom: 0 }}>
                Free
              </p>
              <p className="font-display text-2xl mt-2">Included</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">At launch — no paywall on the basics</p>
            </div>
            <ul className="tier-list">
              {FREE.map((item) => (
                <li key={item}>
                  <span className="tier-mark tier-mark--teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="tier-panel tier-panel--pro">
            <div className="tier-head">
              <p className="label" style={{ marginBottom: 0, color: 'var(--accent-orange)' }}>
                Pro
              </p>
              <p className="font-display text-2xl mt-2">Price TBD</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Honest placeholder — no fake checkout
              </p>
            </div>
            <ul className="tier-list">
              {PRO.map((item) => (
                <li key={item}>
                  <span className="tier-mark tier-mark--orange" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-md waitlist-block">
          <p className="label">Waitlist</p>
          <p className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            One email for launch and Pro. No spam, no sales drip.
          </p>
          <WaitlistForm id="pro-waitlist" />
        </div>
      </div>
    </section>
  )
}
