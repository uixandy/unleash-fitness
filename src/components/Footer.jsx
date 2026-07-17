const APP_URL = 'https://app.unleash.fitness'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-8 sm:items-center sm:justify-between">
        <div>
          <img
            src="/assets/unleash-logo-dark.svg"
            alt="UNLEASH"
            className="h-7 w-auto"
          />
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xs">
            Workout tracking for people who train. Early access live. Pro waitlist open.
          </p>
        </div>
        <nav className="flex flex-wrap gap-2 sm:gap-4 items-center">
          <a href={APP_URL} className="btn-outline text-sm">
            Open app
          </a>
          <a href="#hero-waitlist" className="btn-ghost text-sm">
            Waitlist
          </a>
          <a href="/privacy" className="btn-ghost text-sm">
            Privacy
          </a>
        </nav>
      </div>
      <p className="max-w-6xl mx-auto mt-10 text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} UNLEASH. All rights reserved.
      </p>
    </footer>
  )
}
