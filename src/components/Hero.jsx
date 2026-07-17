import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'

const HERO_PHONE = {
  key: 'workout',
  label: 'Workout',
  src: '/screenshots/workout.png',
}

export default function Hero() {
  return (
    <section className="hero relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 anim-fade-in">
        <img
          src="/images/hero-gym.jpg"
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(8,14,12,0.72) 0%, rgba(8,14,12,0.45) 42%, rgba(8,14,12,0.35) 70%, rgba(8,14,12,0.75) 100%), linear-gradient(180deg, rgba(8,14,12,0.25) 0%, rgba(8,14,12,0.55) 70%, var(--bg-primary) 100%)',
          }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-5 max-w-6xl w-full mx-auto">
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
        <a href="#hero-waitlist" className="btn-outline text-sm shrink-0">
          Join waitlist
        </a>
      </header>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pb-16 pt-6 max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(220px,280px)] gap-12 lg:gap-16 items-center">
          <div>
            <p className="section-label hero-label anim-fade-up">Coming soon</p>
            <h1 className="anim-fade-up-delay-1 text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] max-w-xl tracking-tight">
              Train. Eat. Progress.
              <br />
              <span style={{ color: 'var(--accent-orange)' }}>One place.</span>
            </h1>
            <p className="hero-lede anim-fade-up-delay-2 mt-5 text-base sm:text-lg max-w-lg leading-relaxed">
              A workout tracker for people who actually lift — sessions, nutrition, and
              charts without the fluff. Join the waitlist for launch updates and Pro.
            </p>

            <div className="anim-fade-up-delay-2 mt-8 relative">
              <WaitlistForm id="hero-waitlist" />
              <p className="hero-helper mt-3 text-sm">
                No spam. Launch and Pro updates only.
              </p>
            </div>
          </div>

          <div className="hidden lg:block anim-fade-up-delay-2 hero-phone">
            <PhoneFrame shot={HERO_PHONE} size="lg" />
            <p className="mt-4 text-center text-xs tracking-wide uppercase text-[var(--text-secondary)]">
              In the product
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
