import { useState } from 'react'

const FORM_ENDPOINT = 'https://formspree.io/f/mwvggwvz'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function EarlyAccessForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      setError('Bitte gib eine gültige E-Mail-Adresse ein.')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setError('Etwas ist schiefgelaufen. Bitte versuch es später noch einmal.')
      }
    } catch {
      setStatus('error')
      setError('Keine Verbindung möglich. Bitte versuch es später noch einmal.')
    }
  }

  if (status === 'success') {
    return (
      <div className="early-access-form early-access-form--success">
        <p className="early-access-form__success">Danke! Du bist auf der Liste 🎉</p>
      </div>
    )
  }

  return (
    <form className="early-access-form" onSubmit={handleSubmit} noValidate>
      <div className="early-access-form__row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail-Adresse"
          aria-invalid={status === 'error'}
          disabled={status === 'loading'}
        />
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'loading'}>
          {status === 'loading' ? 'Wird gesendet…' : 'EARLY ACCESS SICHERN'}
          {status !== 'loading' && <ArrowIcon />}
        </button>
      </div>
      {status === 'error' && <p className="early-access-form__error">{error}</p>}
    </form>
  )
}
