import PhoneFrame, { SHOTS } from './PhoneFrame'
import useReveal from '../hooks/useReveal'

export default function ProductProof() {
  const { ref, className } = useReveal()

  return (
    <section id="product" className={`product-stage section-pad ${className}`} ref={ref}>
      <div className="product-watermark" aria-hidden="true">
        PRODUCT
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="reveal-up product-intro">
          <p className="section-label">The product</p>
          <h2 className="display-title">
            Built for the floor.
            <br />
            <span className="text-orange">Not the feed.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Production screens from UNLEASH — dark, spare, and serious about logging.
            No vanity dashboards.
          </p>
        </div>

        <div className="phone-constellation mt-16 sm:mt-20">
          {SHOTS.map((shot, i) => (
            <figure
              key={shot.key}
              className={`constellation-item constellation-item--${i + 1} reveal-up`}
              style={{ transitionDelay: `${120 + i * 100}ms` }}
            >
              <PhoneFrame shot={shot} size={i === 1 ? 'lg' : 'md'} />
              <figcaption>
                <span className="constellation-index">0{i + 1}</span>
                <p className="font-display text-lg">{shot.label}</p>
                <p>{shot.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
