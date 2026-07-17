import PhoneFrame from './PhoneFrame'

const FEATURES = [
  {
    title: 'Serious gym logging',
    body: 'Plans, free log, sets, reps, kg/lbs, session timer. Drafts that don’t vanish when you leave.',
  },
  {
    title: 'Programming that ships free',
    body: 'Supersets, prefill from last workout, progressive overload hints — not locked behind Pro.',
  },
  {
    title: 'Progress you can trust',
    body: 'Body weight and per-exercise strength charts. Full history stays yours.',
  },
  {
    title: 'Nutrition in the same app',
    body: 'Macro goals, recipes, meal planning — one tool between the rack and the kitchen.',
  },
  {
    title: 'Install as a PWA',
    body: 'Add to your phone. Share recipes in. Works where you train.',
  },
  {
    title: 'Spare by design',
    body: 'Space Grotesk. IBM Plex. Orange when it matters. Nothing competing with the work.',
  },
]

const FEATURE_PHONES = [
  {
    key: 'library',
    label: 'Library',
    src: '/screenshots/library.png',
  },
  {
    key: 'planner',
    label: 'Planner',
    src: '/screenshots/nutrition-planner.png',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-pad border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <div>
            <p className="section-label">Features</p>
            <h2 className="text-3xl sm:text-4xl max-w-xl leading-tight">
              Built for the floor, not the feed
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-md leading-relaxed">
              Everything below is in the product we’re opening. No invented metrics —
              just the tools you need between sets.
            </p>
          </div>
          <div className="relative flex justify-center lg:justify-end gap-4 sm:gap-6">
            <div className="w-[42%] max-w-[200px] translate-y-4 anim-fade-up">
              <PhoneFrame shot={FEATURE_PHONES[0]} size="sm" />
            </div>
            <div
              className="w-[42%] max-w-[200px] -translate-y-2 anim-fade-up"
              style={{ animationDelay: '0.12s' }}
            >
              <PhoneFrame shot={FEATURE_PHONES[1]} size="sm" />
            </div>
          </div>
        </div>

        <ol className="feature-list">
          {FEATURES.map((f, i) => (
            <li key={f.title} className="feature-row">
              <span className="feature-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg text-[var(--text-primary)]">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {f.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
