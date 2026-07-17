import SiteNav from './components/SiteNav'
import Hero from './components/Hero'
import ProductProof from './components/ProductProof'
import Features from './components/Features'
import ProTeaser from './components/ProTeaser'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (path === '/privacy') {
    return (
      <>
        <SiteNav resolvedTheme={resolvedTheme} onSetTheme={setTheme} />
        <main className="max-w-2xl mx-auto px-5 py-16">
          <a href="/" className="btn-ghost text-sm mb-8 inline-flex">
            ← Back
          </a>
          <h1 className="text-3xl">Privacy</h1>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            If you join the waitlist, we store your email solely to notify you about UNLEASH
            launch and Pro updates. We don’t sell your email. You can ask to be removed anytime
            by contacting us through the app or the address used for waitlist replies.
          </p>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            The workout app at app.unleash.fitness has its own account and data policies via
            Supabase Auth. This marketing site only collects waitlist emails you submit.
          </p>
        </main>
        <Footer resolvedTheme={resolvedTheme} />
      </>
    )
  }

  return (
    <>
      <SiteNav resolvedTheme={resolvedTheme} onSetTheme={setTheme} />
      <Hero />
      <ProductProof />
      <Features />
      <ProTeaser />
      <Footer resolvedTheme={resolvedTheme} />
    </>
  )
}
