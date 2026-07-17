import PhoneFrame, { SHOTS } from './PhoneFrame'

export default function ProductProof() {
  return (
    <section id="product" className="section-pad border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="section-label">The product</p>
          <h2 className="text-3xl sm:text-4xl leading-tight">What you get today</h2>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            Dark, spare, and built around real gym logging — not a feed of vanity metrics.
            These are production screens from the product we’re opening soon.
          </p>
        </div>

        <div className="mt-16 proof-rail">
          {SHOTS.map((shot, i) => (
            <figure
              key={shot.key}
              className="proof-item"
              style={{ animationDelay: `${0.08 + i * 0.08}s` }}
            >
              <PhoneFrame shot={shot} />
              <figcaption className="mt-5 text-center max-w-[240px] mx-auto px-1">
                <p className="font-display text-base text-[var(--text-primary)]">{shot.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {shot.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
