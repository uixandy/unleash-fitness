import PhoneFrame from './PhoneFrame'
import useReveal from '../hooks/useReveal'

const BANDS = [
  {
    key: 'workout',
    eyebrow: '01 — Logging',
    title: 'Every set. Every rep. No friction.',
    body: 'Plans, free log, supersets, rest timers, drafts that survive tab switches. Advanced programming stays free — because the floor doesn’t wait for a paywall.',
    shot: { key: 'workout', label: 'Workout', src: '/screenshots/workout.png' },
    align: 'left',
  },
  {
    key: 'nutrition',
    eyebrow: '02 — Nutrition',
    title: 'Macros where the training lives.',
    body: 'Goals, recipes, meal planner — one app between the rack and the kitchen. AI import lands with Pro; manual tracking ships at launch.',
    shot: { key: 'nutrition', label: 'Nutrition', src: '/screenshots/nutrition.png' },
    align: 'right',
  },
  {
    key: 'plans',
    eyebrow: '03 — Programming',
    title: 'Save the plan. Run it again.',
    body: 'Build once, start fast, edit on the fly. Prefill from last session. Progressive overload hints when you’re ready to move weight.',
    shot: { key: 'plans', label: 'Plans', src: '/screenshots/plans.png' },
    align: 'left',
  },
]

function FeatureBand({ band, index }) {
  const { ref, className } = useReveal()
  const reverse = band.align === 'right'

  return (
    <article
      ref={ref}
      className={`feature-band ${reverse ? 'feature-band--reverse' : ''} ${className}`}
    >
      <div
        className="feature-band-copy reveal-up"
        style={{ transitionDelay: '80ms' }}
      >
        <p className="section-label">{band.eyebrow}</p>
        <h3 className="feature-band-title">{band.title}</h3>
        <p className="feature-band-body">{band.body}</p>
      </div>
      <div
        className="feature-band-visual reveal-scale"
        style={{ transitionDelay: `${140 + index * 40}ms` }}
      >
        <div className="feature-band-orbit" aria-hidden="true" />
        <PhoneFrame shot={band.shot} size="lg" />
      </div>
    </article>
  )
}

export default function Features() {
  const { ref, className } = useReveal()

  return (
    <section id="features" className={`features-cinematic section-pad ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="reveal-up features-head mb-16 sm:mb-24">
          <p className="section-label">Features</p>
          <h2 className="display-title max-w-3xl">
            Everything that matters
            <span className="text-orange"> between sets.</span>
          </h2>
        </div>

        <div className="feature-bands">
          {BANDS.map((band, i) => (
            <FeatureBand key={band.key} band={band} index={i} />
          ))}
        </div>

        <div className="feature-aside reveal-up mt-20 sm:mt-28">
          <div className="feature-aside-phones">
            <PhoneFrame
              shot={{ key: 'library', label: 'Library', src: '/screenshots/library.png' }}
              size="sm"
            />
            <PhoneFrame
              shot={{
                key: 'planner',
                label: 'Planner',
                src: '/screenshots/nutrition-planner.png',
              }}
              size="sm"
            />
          </div>
          <div>
            <p className="section-label">Also in the build</p>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight">
              Library. Planner. PWA.
            </h3>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed max-w-md">
              Machine-first exercise library, meal planner, install-to-home-screen.
              Spare design — orange when it matters, nothing competing with the work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
