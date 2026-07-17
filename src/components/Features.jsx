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
    key: 'recipes',
    eyebrow: '02 — Recipes',
    title: 'Your kitchen, logged like a session.',
    body: 'Save recipes with ingredients, steps, and macros. Build a library you actually cook from — not a graveyard of screenshots. Manual entry at launch; AI import from URL or photo lands with Pro.',
    shot: { key: 'recipes', label: 'Recipes', src: '/screenshots/nutrition-recipes.png' },
    align: 'right',
  },
  {
    key: 'planner',
    eyebrow: '03 — Meal planner',
    title: 'Plan the week. Hit the macros.',
    body: 'Drop recipes into a meal planner so training days and kitchen days stay in sync. See protein, carbs, and fat against your goals before you shop — not after you guess.',
    shot: { key: 'planner', label: 'Meal planner', src: '/screenshots/nutrition-planner.png' },
    align: 'left',
  },
  {
    key: 'plans',
    eyebrow: '04 — Programming',
    title: 'Save the plan. Run it again.',
    body: 'Build once, start fast, edit on the fly. Prefill from last session. Progressive overload hints when you’re ready to move weight.',
    shot: { key: 'plans', label: 'Plans', src: '/screenshots/plans.png' },
    align: 'right',
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
            Floor to kitchen.
            <span className="text-orange"> One tracker.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Logging is only half the job. Recipes and a meal planner live next to your
            sessions — so “Eat” in Train · Eat · Progress isn’t an afterthought.
          </p>
        </div>

        <div className="feature-bands">
          {BANDS.map((band, i) => (
            <FeatureBand key={band.key} band={band} index={i} />
          ))}
        </div>

        <div className="feature-aside reveal-up mt-20 sm:mt-28">
          <div className="feature-aside-phones">
            <PhoneFrame
              shot={{ key: 'nutrition', label: 'Nutrition goals', src: '/screenshots/nutrition.png' }}
              size="sm"
            />
            <PhoneFrame
              shot={{ key: 'library', label: 'Library', src: '/screenshots/library.png' }}
              size="sm"
            />
          </div>
          <div>
            <p className="section-label">Also in the build</p>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight">
              Macro goals. Exercise library. PWA.
            </h3>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed max-w-md">
              Set calorie and macro targets, browse a machine-first library, install to
              home screen. Spare design — orange when it matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
