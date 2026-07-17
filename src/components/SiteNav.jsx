import ThemeToggle from './ThemeToggle'

export default function SiteNav({ theme, resolvedTheme = 'dark', onSetTheme }) {
  const logo =
    resolvedTheme === 'light'
      ? '/assets/unleash-workout-tracker-logo-light.svg'
      : '/assets/unleash-workout-tracker-logo-dark.svg'

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="shrink-0" aria-label="UNLEASH home">
          <img
            src={logo}
            alt="UNLEASH Workout Tracker"
            className="h-8 sm:h-10 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-1" aria-label="Page sections">
          <a href="/#product" className="btn-ghost text-sm">
            Product
          </a>
          <a href="/#features" className="btn-ghost text-sm">
            Features
          </a>
          <a href="/#pro" className="btn-ghost text-sm">
            Pro
          </a>
        </nav>
        <div className="site-nav-actions">
          {theme && onSetTheme ? (
            <ThemeToggle
              theme={theme}
              resolvedTheme={resolvedTheme}
              onSetTheme={onSetTheme}
              className="theme-toggle--compact"
            />
          ) : null}
          <a href="/#hero-waitlist" className="btn-outline text-sm shrink-0">
            Join waitlist
          </a>
        </div>
      </div>
    </header>
  )
}
