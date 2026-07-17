const APP_URL = 'https://app.unleash.fitness'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 sm:px-8 py-14 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <img src="/assets/unleash-logo-dark.svg" alt="UNLEASH" className="h-8 w-auto" />
            <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Workout tracking for people who train. Early access live. Pro waitlist open.
              No fake social proof — just the product.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={APP_URL} className="btn-outline text-sm">
                Try the app
              </a>
              <a href="#hero-waitlist" className="btn-ghost text-sm">
                Join waitlist
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-start-1 lg:col-start-7">
            <p className="label">On this site</p>
            <ul className="footer-links">
              <li>
                <a href="#product">Product</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pro">Free vs Pro</a>
              </li>
              <li>
                <a href="#hero-waitlist">Waitlist</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label">The app</p>
            <ul className="footer-links">
              <li>
                <a href={APP_URL} rel="noopener noreferrer">
                  Open app
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label">Legal</p>
            <ul className="footer-links">
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} UNLEASH. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            app.unleash.fitness · unleash.fitness
          </p>
        </div>
      </div>
    </footer>
  )
}
