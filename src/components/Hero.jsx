import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'
import ThemeToggle from './ThemeToggle'

const HERO_PHONE = {
  key: 'workout',
  label: 'Workout',
  src: '/screenshots/workout.png',
}

export default function Hero({ theme, onSetTheme }) {
  return (
    <section className="hero cinematic-hero theme-locked-dark">
      <div className="hero-stage" aria-hidden="true">
        <img src="/images/hero-gym.jpg" alt="" className="hero-stage-img" />
        <div className="hero-stage-shade" />
        <div className="hero-stage-glow" />
        <div className="hero-grain" />
      </div>

      <header className="hero-top">
        <a href="/" className="shrink-0" aria-label="UNLEASH home">
          <img
            src="/assets/unleash-workout-tracker-logo-dark.svg"
            alt="UNLEASH Workout Tracker"
            className="h-9 sm:h-11 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-1" aria-label="Page sections">
          <a href="#product" className="btn-ghost text-sm">
            Product
          </a>
          <a href="#features" className="btn-ghost text-sm">
            Features
          </a>
          <a href="#pro" className="btn-ghost text-sm">
            Pro
          </a>
        </nav>
        <div className="hero-top-actions">
          <ThemeToggle theme={theme} onSetTheme={onSetTheme} className="theme-toggle--compact" />
          <a href="#hero-waitlist" className="btn-outline text-sm shrink-0">
            Join waitlist
          </a>
        </div>
      </header>

      <div className="hero-body">
        <div className="hero-copy">
          <p className="section-label hero-label anim-fade-up">Coming soon</p>
          <h1 className="hero-title anim-fade-up-delay-1">
            <span className="hero-title-line">Train.</span>
            <span className="hero-title-line">Eat.</span>
            <span className="hero-title-line">Progress.</span>
            <span className="hero-title-accent">One place.</span>
          </h1>
          <div className="hero-rule anim-fade-up-delay-1" aria-hidden="true" />
          <p className="hero-lede anim-fade-up-delay-2">
            A workout tracker for people who actually lift — sessions, recipes, meal
            planning, and charts without the fluff. Join the waitlist for launch and Pro.
          </p>

          <div className="hero-cta-panel anim-fade-up-delay-2">
            <WaitlistForm id="hero-waitlist" />
            <p className="hero-helper mt-3 text-sm">No spam. Launch and Pro updates only.</p>
          </div>
        </div>

        <div className="hero-device anim-float-in">
          <div className="hero-device-glow" aria-hidden="true" />
          <PhoneFrame shot={HERO_PHONE} size="lg" className="hero-device-frame" />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
