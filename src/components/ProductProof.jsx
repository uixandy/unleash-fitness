import PhoneFrame, { SHOTS } from './PhoneFrame'

export default function ProductProof() {
  return (
    <section id="product" className="px-5 sm:px-8 py-20 max-w-6xl mx-auto">
      <p className="section-label">The product</p>
      <h2 className="text-3xl sm:text-4xl max-w-xl leading-tight">
        What you get today
      </h2>
      <p className="mt-4 text-[var(--text-secondary)] max-w-xl leading-relaxed">
        Live at app.unleash.fitness. Dark, spare, and built around real gym logging —
        not a dashboard of vanity metrics.
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 items-end">
        {SHOTS.map((shot, i) => (
          <div
            key={shot.key}
            className={`anim-fade-up ${i === 1 ? 'sm:-translate-y-6' : ''}`}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <PhoneFrame shot={shot} />
            <p className="mt-4 text-center label" style={{ marginBottom: 0 }}>
              {shot.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
