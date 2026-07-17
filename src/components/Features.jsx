import { useEffect, useRef, useState } from 'react'
import PhoneFrame from './PhoneFrame'
import SectionWatermark from './SectionWatermark'
import useReveal from '../hooks/useReveal'

const STEPS = [
  {
    key: 'workout',
    eyebrow: '01 — Logging',
    title: 'Every set. Every rep. No friction.',
    body: 'Plans, free log, supersets, rest timers, drafts that survive tab switches. Advanced programming stays free — your session shouldn’t wait on a paywall.',
    shot: { key: 'workout', label: 'Workout', src: '/screenshots/workout.png' },
  },
  {
    key: 'recipes',
    eyebrow: '02 — Recipes',
    title: 'Recipes with the same discipline.',
    body: 'Ingredients, steps, macros — saved so you cook from them, not screenshot them. Manual entry at launch; AI import from URL or photo lands with Pro.',
    shot: { key: 'recipes', label: 'Recipes', src: '/screenshots/nutrition-recipes.png' },
  },
  {
    key: 'planner',
    eyebrow: '03 — Meal planner',
    title: 'Plan the week. Hit the macros.',
    body: 'Drop recipes into the planner so lifting and eating stay in sync. Protein, carbs, and fat against your goals — before you shop, not after you guess.',
    shot: { key: 'planner', label: 'Meal planner', src: '/screenshots/nutrition-planner.png' },
  },
  {
    key: 'plans',
    eyebrow: '04 — Programming',
    title: 'Save the plan. Run it again.',
    body: 'Build once, start fast, edit on the fly. Prefill from last session. Progressive overload hints when you’re ready to move weight.',
    shot: { key: 'plans', label: 'Plans', src: '/screenshots/plans.png' },
  },
]

function useDesktopSticky() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(min-width: 900px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    const mqWide = window.matchMedia('(min-width: 900px)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setEnabled(mqWide.matches && !mqMotion.matches)
    sync()

    mqWide.addEventListener('change', sync)
    mqMotion.addEventListener('change', sync)
    return () => {
      mqWide.removeEventListener('change', sync)
      mqMotion.removeEventListener('change', sync)
    }
  }, [])

  return enabled
}

function useActiveStep(enabled, count) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    if (!enabled) return undefined

    const nodes = stepRefs.current.filter(Boolean)
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const index = Number(visible[0].target.getAttribute('data-step-index'))
          if (!Number.isNaN(index)) setActive(index)
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-25% 0px -35% 0px',
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [enabled, count])

  const setStepRef = (index) => (el) => {
    stepRefs.current[index] = el
  }

  const scrollToStep = (index) => {
    setActive(index)
    const el = stepRefs.current[index]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.28
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return { active, setStepRef, scrollToStep }
}

export default function Features() {
  const { ref, className } = useReveal()
  const sticky = useDesktopSticky()
  const { active, setStepRef, scrollToStep } = useActiveStep(sticky, STEPS.length)
  const progress = ((active + 1) / STEPS.length) * 100

  return (
    <section id="features" className={`features-cinematic ${className}`} ref={ref}>
      <div className="features-intro section-stage section-stage--clip">
        <SectionWatermark>FEATURES</SectionWatermark>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 features-intro-inner">
          <div className="reveal-up features-head">
            <p className="section-label">Features</p>
            <h2 className="display-title max-w-3xl">
              Train and eat.
              <span className="text-orange"> One tracker.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
              {sticky
                ? 'Scroll the story — the screen keeps pace. Logging, recipes, meal planner, and programming in one pass.'
                : 'Logging, recipes, meal planner, and programming — training and nutrition in one place.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 features-body">
        {sticky ? (
          <div className="features-scroll" style={{ '--features-progress': `${progress}%` }}>
            <div className="features-scroll-phone">
              <div className="features-scroll-phone-sticky">
                <div className="features-phone-stage">
                  <div className="features-phone-glow" aria-hidden="true" />
                  <div className="features-phone-layers">
                    {STEPS.map((step, i) => (
                      <div
                        key={step.key}
                        className={`features-phone-layer ${i === active ? 'is-active' : ''}`}
                      >
                        <PhoneFrame shot={step.shot} size="lg" />
                      </div>
                    ))}
                  </div>
                  <div className="features-phone-meta">
                    <span className="features-phone-count">
                      {String(active + 1).padStart(2, '0')}
                      <span> / {String(STEPS.length).padStart(2, '0')}</span>
                    </span>
                    <div className="features-phone-progress" aria-hidden="true">
                      <i style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="features-scroll-dots" role="tablist" aria-label="Feature steps">
                  {STEPS.map((step, i) => (
                    <button
                      key={step.key}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      className={`features-scroll-dot ${i === active ? 'is-active' : ''}`}
                      onClick={() => scrollToStep(i)}
                      title={step.shot.label}
                    >
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="features-scroll-copy">
              <div className="features-scroll-rail" aria-hidden="true">
                <div className="features-scroll-rail-fill" />
              </div>
              <p className="sr-only" aria-live="polite">
                {STEPS[active].eyebrow}: {STEPS[active].title}
              </p>
              {STEPS.map((step, i) => (
                <article
                  key={step.key}
                  ref={setStepRef(i)}
                  data-step-index={i}
                  className={`features-step ${i === active ? 'is-active' : ''}`}
                >
                  <div className="features-step-card">
                    <p className="section-label">{step.eyebrow}</p>
                    <h3 className="feature-band-title">{step.title}</h3>
                    <p className="feature-band-body">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="features-stack">
            {STEPS.map((step) => (
              <article key={step.key} className="features-stack-item">
                <div className="features-stack-phone">
                  <PhoneFrame shot={step.shot} size="md" />
                </div>
                <div>
                  <p className="section-label">{step.eyebrow}</p>
                  <h3 className="feature-band-title">{step.title}</h3>
                  <p className="feature-band-body">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="feature-aside reveal-up mt-16 sm:mt-24">
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
