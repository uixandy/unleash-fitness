import WaitlistForm from './WaitlistForm'
import useReveal from '../hooks/useReveal'

export default function ClosingBand() {
  const { ref, className } = useReveal()

  return (
    <section className={`closing-cinematic ${className}`} ref={ref}>
      <div className="closing-stage" aria-hidden="true">
        <img src="/images/stock-gym.jpg" alt="" className="closing-stage-img" />
        <div className="closing-stage-shade" />
        <div className="hero-grain" />
      </div>

      <div className="closing-inner reveal-up">
        <p className="section-label hero-label">Next step</p>
        <h2 className="closing-title">
          Get on the list.
        </h2>
        <p className="closing-lede">
          We’re opening UNLEASH properly soon. Launch news and Pro — no checkout, no spam.
        </p>
        <div className="closing-panel">
          <WaitlistForm id="closing-waitlist" />
        </div>
      </div>
    </section>
  )
}
