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
      className="relative px-5 sm:px-8 py-20 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="https://raw.githubusercontent.com/uixandy/unleash-fitness/main/public/images/lifestyle-barbell.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg-primary) 0%, rgba(8,14,12,0.92) 45%, rgba(8,14,12,0.75) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <p className="section-label">Coming soon</p>
        <h2 className="text-3xl sm:text-4xl max-w-xl leading-tight">
          Free feels complete. Pro goes further.
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-xl leading-relaxed">
          Pricing isn’t set yet. We’re opening a waitlist so you hear first when Pro launches —
          no checkout, no pressure.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)]/90 p-6 backdrop-blur-sm">
            <p className="label">Free</p>
            <p className="font-display text-2xl mt-1">Early access</p>
            <ul className="mt-5 space-y-3">
              {FREE.map((item) => (
                <li key={item} className="text-sm text-[var(--text-secondary)] flex gap-2">
                  <span className="text-[var(--accent-teal)] shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-[10px] border p-6 bg-[var(--bg-card)]/90 backdrop-blur-sm"
            style={{ borderColor: 'rgba(255, 90, 31, 0.45)' }}
          >
            <p className="label" style={{ color: 'var(--accent-orange)' }}>Pro</p>
            <p className="font-display text-2xl mt-1">
              Price TBD
            </p>
            <ul className="mt-5 space-y-3">
              {PRO.map((item) => (
                <li key={item} className="text-sm text-[var(--text-secondary)] flex gap-2">
                  <span className="text-[var(--accent-orange)] shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 max-w-md relative">
          <p className="label">Get notified</p>
          <WaitlistForm id="pro-waitlist" />
        </div>
      </div>
    </section>
  )
}
