export default function Footer({ resolvedTheme = 'dark' }) {
  const logo =
    resolvedTheme === 'light'
      ? '/assets/unleash-logo-light.svg'
      : '/assets/unleash-logo-dark.svg'

  return (
    <footer className="site-footer border-t border-[var(--border)] px-5 sm:px-8 py-14 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <img src={logo} alt="UNLEASH" className="h-8 w-auto" />
            <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Workout tracking for people who train. Waitlist open for launch and Pro.
            </p>
            <div className="mt-6">
              <a href="#hero-waitlist" className="btn-primary text-sm">
                Join waitlist
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-start-1 lg:col-start-8">
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
          <p className="text-xs text-[var(--text-muted)]">unleash.fitness</p>
        </div>
      </div>
    </footer>
  )
}
