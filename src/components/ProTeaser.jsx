import WaitlistForm from './WaitlistForm'
import SectionWatermark from './SectionWatermark'
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
  'AI Coach',
  'Health app export',
]

export default function ProTeaser() {
  const { ref, className } = useReveal()

  return (
    <section id="pro" className={`pro-epic theme-locked-dark ${className}`} ref={ref}>
      <div className="pro-epic-stage" aria-hidden="true">
        <img src="/images/lifestyle-barbell.jpg" alt="" className="pro-epic-img" />
        <div className="pro-epic-shade" />
        <div className="pro-epic-beam" />
        <div className="hero-grain" />
      </div>
      <SectionWatermark position="right">PRO</SectionWatermark>

      <div className="pro-epic-inner">
        <header className="pro-epic-head reveal-up">
          <p className="section-label hero-label">Coming soon</p>
          <h2 className="pro-epic-title">
            Free feels complete.
            <span className="pro-epic-title-accent">Pro goes further.</span>
          </h2>
          <p className="pro-epic-lede">
            Advanced programming stays free — including manual recipes and meal planning.
            Pro unlocks library breadth, longer analytics, and AI recipe import. Price isn’t
            set — get on the list first.
          </p>
        </header>

        <div className="pro-arena">
          <article className="pro-card pro-card--free reveal-up" style={{ transitionDelay: '80ms' }}>
            <div className="pro-card-top">
              <span className="pro-pill pro-pill--teal">Free</span>
              <h3>Included</h3>
              <p>At launch — no paywall on the basics</p>
            </div>
            <ul className="pro-card-list">
              {FREE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="pro-card pro-card--pro reveal-scale" style={{ transitionDelay: '140ms' }}>
            <div className="pro-card-glow" aria-hidden="true" />
            <div className="pro-card-top">
              <div className="pro-card-top-row">
                <span className="pro-pill pro-pill--orange">Pro</span>
                <span className="pro-badge">Waitlist</span>
              </div>
              <h3>Price TBD</h3>
              <p>Honest placeholder — no fake checkout</p>
            </div>
            <ul className="pro-card-list">
              {PRO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="pro-card-cta">
              <p className="pro-card-cta-copy">
                One email for launch and Pro. No spam.
              </p>
              <WaitlistForm id="pro-waitlist" />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
