import WaitlistForm from './WaitlistForm'

export default function ClosingBand() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)] section-pad px-5 sm:px-8">
      <div className="max-w-6xl mx-auto closing-layout">
        <div className="max-w-lg">
          <p className="section-label">Next step</p>
          <h2 className="text-3xl sm:text-4xl leading-tight">
            Get on the list.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            We’re opening UNLEASH properly soon. Join the waitlist for launch news and
            Pro — no checkout, no spam.
          </p>
          <div className="mt-8">
            <a href="#pro" className="btn-outline">
              See Free vs Pro
            </a>
          </div>
        </div>

        <div className="closing-waitlist-panel">
          <p className="label">Waitlist</p>
          <p className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            Launch and Pro updates only.
          </p>
          <WaitlistForm id="closing-waitlist" compact />
        </div>
      </div>
    </section>
  )
}
