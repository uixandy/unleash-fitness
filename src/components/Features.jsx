const FEATURES = [
  {
    title: 'Serious gym logging',
    body: 'Plans, free log, sets, reps, kg/lbs, session timer, drafts that don’t disappear when you leave.',
  },
  {
    title: 'Advanced programming, free',
    body: 'Supersets, prefill from last workout, and progressive overload hints — not locked behind Pro.',
  },
  {
    title: 'Progress you can trust',
    body: 'Body weight and per-exercise strength charts. Your full workout history stays yours.',
  },
  {
    title: 'Nutrition in the same app',
    body: 'Macro goals, recipes, and meal planning without juggling three tools.',
  },
  {
    title: 'Built as a PWA',
    body: 'Install on your phone. Share recipes into the app. Works where you train.',
  },
  {
    title: 'Spare by design',
    body: 'Space Grotesk. IBM Plex. Orange when it matters. No clutter competing with the work.',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-5 sm:px-8 py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
          <div>
            <p className="section-label">Features</p>
            <h2 className="text-3xl sm:text-4xl max-w-xl leading-tight">
              Built for the floor, not the feed
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-md leading-relaxed">
              Everything below ships today in early access. No invented metrics — just the tools you need between sets.
            </p>
          </div>
          <div className="rounded-[10px] overflow-hidden border border-[var(--border)] aspect-[4/3] max-h-72 lg:max-h-none">
            <img
              src="https://raw.githubusercontent.com/uixandy/unleash-fitness/main/public/images/stock-gym.jpg"
              alt="Gym equipment"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] p-5"
            >
              <h3 className="text-lg text-[var(--text-primary)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
