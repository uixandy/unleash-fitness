import WaitlistForm from './WaitlistForm'

const APP_URL = 'https://app.unleash.fitness'

const HERO_IMG =
  'https://raw.githubusercontent.com/uixandy/unleash-fitness/main/public/images/hero-gym.jpg'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 anim-fade-in">
        <img
          src={HERO_IMG}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,14,12,0.55) 0%, rgba(8,14,12,0.85) 55%, var(--bg-primary) 100%)',
          }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5 max-w-6xl w-full mx-auto">
        <img
          src="https://raw.githubusercontent.com/uixandy/unleash-fitness/main/public/assets/unleash-workout-tracker-logo-dark.svg"
          alt="UNLEASH Workout Tracker"
          className="h-8 sm:h-10 w-auto"
        />
        <a href={APP_URL} className="btn-ghost text-sm">
          Try the app
        </a>
      </header>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pb-16 pt-8 max-w-6xl w-full mx-auto">
        <p className="section-label anim-fade-up">Early access</p>
        <h1 className="anim-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl leading-[1.08] max-w-2xl tracking-tight">
          Train. Eat. Progress.
          <br />
          <span style={{ color: 'var(--accent-orange)' }}>One place.</span>
        </h1>
        <p className="anim-fade-up-delay-2 mt-5 text-base sm:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
          UNLEASH is a workout tracker built for people who actually lift —
          sessions, nutrition, and charts without the fluff. Pro is coming; join the waitlist.
        </p>

        <div className="anim-fade-up-delay-2 mt-8 relative">
          <WaitlistForm id="hero-waitlist" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            No spam. Launch updates only.{' '}
            <a href={APP_URL} className="text-[var(--text-secondary)] underline-offset-2 hover:underline">
              Or try early access now
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
