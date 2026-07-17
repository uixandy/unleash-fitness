import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'

const HERO_PHONE = {
  key: 'workout',
  label: 'Workout',
  src: '/screenshots/workout.png',
}

export default function Hero() {
  return (
    <section className="hero cinematic-hero theme-locked-dark">
      <div className="hero-stage" aria-hidden="true">
        <img src="/images/hero-gym.jpg" alt="" className="hero-stage-img" />
        <div className="hero-stage-shade" />
        <div className="hero-stage-glow" />
        <div className="hero-grain" />
      </div>

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
