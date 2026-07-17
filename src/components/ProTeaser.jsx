import WaitlistForm from './WaitlistForm'
import useReveal from '../hooks/useReveal'

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
  const { ref, className } = useReveal()

  return (
    <section id="pro" className={`pro-cinematic section-pad ${className}`} ref={ref}>
      <div className="pro-stage" aria-hidden="true">
        <img src="/images/lifestyle-barbell.jpg" alt="" className="pro-stage-img" />
        <div className="pro-stage-shade" />
      </div>
      <div className="pro-watermark" aria-hidden="true">
        PRO
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 z-10">
        <div className="reveal-up max-w-2xl">
          <p className="section-label hero-label">Coming soon</p>
          <h2 className="display-title">
            Free feels complete.
            <br />
            <span className="text-orange">Pro goes further.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)] max-w-xl">
            Advanced programming stays free. Pro unlocks library breadth, longer analytics,
            and AI. Pricing isn’t set — join the waitlist to hear first.
          </p>
        </div>

        <div className="tier-compare mt-14">
          <div className="tier-panel reveal-up" style={{ transitionDelay: '100ms' }}>
            <div className="tier-head">
              <p className="label" style={{ marginBottom: 0 }}>
                Free
              </p>
              <p className="font-display text-2xl mt-2">Included</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                At launch — no paywall on the basics
              </p>
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

          <div
            className="tier-panel tier-panel--pro reveal-up"
            style={{ transitionDelay: '180ms' }}
          >
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

        <div className="waitlist-block reveal-up mt-14" style={{ transitionDelay: '220ms' }}>
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
