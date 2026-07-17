import WaitlistForm from './WaitlistForm'

const APP_URL = 'https://app.unleash.fitness'

export default function ClosingBand() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)] section-pad px-5 sm:px-8">
      <div className="max-w-6xl mx-auto closing-layout">
        <div className="max-w-lg">
          <p className="section-label">Next step</p>
          <h2 className="text-3xl sm:text-4xl leading-tight">
            Start logging. Or get on the list.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            Early access is live. The Pro waitlist is open. Pick whichever fits — both are free
            today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={APP_URL} className="btn-primary">
              Open the app
            </a>
            <a href="#pro" className="btn-outline">
              Free vs Pro
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
