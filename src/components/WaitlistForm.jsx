import { useState } from 'react'

export default function WaitlistForm({ id = 'waitlist', compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error | duplicate
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@')) {
      setStatus('error')
      setMessage('Enter a valid email.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'marketing' }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.status === 409 || data.code === 'duplicate') {
        setStatus('duplicate')
        setMessage("You're already on the list.")
        return
      }

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
        return
      }

      setStatus('success')
      setMessage("You're on the list. We'll be in touch.")
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network error. Try again.')
    }
  }

  return (
    <div className="w-full max-w-md">
      <form
        id={id}
        onSubmit={handleSubmit}
        className={compact ? 'flex flex-col gap-3' : 'flex flex-col sm:flex-row gap-3'}
        noValidate
      >
        <label className="sr-only" htmlFor={`${id}-email`}>
          Email
        </label>
        <input
          id={`${id}-email`}
          className="input flex-1"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== 'idle' && status !== 'loading') setStatus('idle')
          }}
          disabled={status === 'loading' || status === 'success'}
          required
        />
        <button
          type="submit"
          className="btn-primary whitespace-nowrap sm:min-w-[140px]"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Joining…' : status === 'success' ? 'Joined' : 'Join waitlist'}
        </button>
      </form>
      {(status === 'success' || status === 'duplicate' || status === 'error') && (
        <p
          className={`mt-2 text-sm ${
            status === 'error' ? 'text-[var(--accent-orange)]' : 'text-[var(--accent-teal)]'
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  )
}
