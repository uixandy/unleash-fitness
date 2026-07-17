import { useEffect, useRef, useState } from 'react'
import PhoneFrame from './PhoneFrame'
import useReveal from '../hooks/useReveal'

const STEPS = [
  {
    key: 'workout',
    eyebrow: '01 — Logging',
    title: 'Every set. Every rep. No friction.',
    body: 'Plans, free log, supersets, rest timers, drafts that survive tab switches. Advanced programming stays free — because the floor doesn’t wait for a paywall.',
    shot: { key: 'workout', label: 'Workout', src: '/screenshots/workout.png' },
  },
  {
    key: 'recipes',
    eyebrow: '02 — Recipes',
    title: 'Your kitchen, logged like a session.',
    body: 'Save recipes with ingredients, steps, and macros. Build a library you actually cook from — not a graveyard of screenshots. Manual entry at launch; AI import from URL or photo lands with Pro.',
    shot: { key: 'recipes', label: 'Recipes', src: '/screenshots/nutrition-recipes.png' },
  },
  {
    key: 'planner',
    eyebrow: '03 — Meal planner',
    title: 'Plan the week. Hit the macros.',
    body: 'Drop recipes into a meal planner so training days and kitchen days stay in sync. See protein, carbs, and fat against your goals before you shop — not after you guess.',
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

function useStickyFeatureIndex(stepCount) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean)
    if (!nodes.length) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const ratios = new Array(stepCount).fill(0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-step-index'))
          if (Number.isNaN(index)) return
          ratios[index] = entry.isIntersecting ? entry.intersectionRatio : 0
        })
        let best = 0
        let bestRatio = -1
        ratios.forEach((ratio, i) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = i
          }
        })
        setActive(best)
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: '-20% 0px -35% 0px',
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [stepCount])

  const setStepRef = (index) => (el) => {
    stepRefs.current[index] = el
  }

  const scrollToStep = (index) => {
    setActive(index)
    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return { active, setStepRef, scrollToStep }
}

export default function Features() {
  const { ref, className } = useReveal()
  const { active, setStepRef, scrollToStep } = useStickyFeatureIndex(STEPS.length)
  const activeStep = STEPS[active]

  return (
    <section id="features" className={`features-cinematic section-pad ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="reveal-up features-head mb-12 sm:mb-16">
          <p className="section-label">Features</p>
          <h2 className="display-title max-w-3xl">
            Floor to kitchen.
            <span className="text-orange"> One tracker.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Scroll the story — the screen keeps pace. Logging, recipes, meal planner, and
            programming in one pass.
          </p>
        </div>

        <div className="features-scroll">
          <div className="features-scroll-phone">
            <div className="features-phone-stage" aria-hidden="true">
              <div className="feature-band-orbit" />
              {STEPS.map((step, i) => (
                <div
                  key={step.key}
                  className={`features-phone-layer ${i === active ? 'is-active' : ''}`}
                >
                  <PhoneFrame shot={step.shot} size="lg" />
                </div>
              ))}
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

          <div className="features-scroll-copy">
            <p className="sr-only" aria-live="polite">
              {activeStep.eyebrow}: {activeStep.title}
            </p>

            {STEPS.map((step, i) => (
              <article
                key={step.key}
                ref={setStepRef(i)}
                data-step-index={i}
                className={`features-step ${i === active ? 'is-active' : ''}`}
              >
                <div className="features-step-mobile-phone">
                  <PhoneFrame shot={step.shot} size="md" />
                </div>
                <p className="section-label">{step.eyebrow}</p>
                <h3 className="feature-band-title">{step.title}</h3>
                <p className="feature-band-body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>

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
