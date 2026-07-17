import PhoneFrame, { SHOTS } from './PhoneFrame'
import SectionWatermark from './SectionWatermark'
import useReveal from '../hooks/useReveal'

export default function ProductProof() {
  const { ref, className } = useReveal()

  return (
    <section id="product" className={`product-stage section-stage section-stage--clip section-pad ${className}`} ref={ref}>
      <SectionWatermark>PRODUCT</SectionWatermark>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="reveal-up product-intro">
          <p className="section-label">The product</p>
          <h2 className="display-title">
            Train. Eat. Track.
            <br />
            <span className="text-orange">No fluff.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Real screens from UNLEASH — workouts, recipes, meal planner, and plans.
            Dark, spare, built to use between sets.
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
